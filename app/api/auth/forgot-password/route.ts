import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import { generateResetToken } from "@/app/lib/auth/token";
import { sendResetCode } from "@/app/lib/email";
import { sendSMS } from "@/app/lib/sms";

const ForgotPasswordSchema = z.object({
  method: z.enum(["email", "phone"]),
  contact: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = ForgotPasswordSchema.parse(body);

    console.log(
      `Processing forgot password request for ${validatedData.method}:`,
      validatedData.contact
    );

    const customer = await prisma.customer.findFirst({
      where:
        validatedData.method === "email"
          ? { email: validatedData.contact }
          : { phoneNumber: validatedData.contact },
    });

    if (!customer) {
      console.log(
        `No customer found with ${validatedData.method}:`,
        validatedData.contact
      );
      return NextResponse.json(
        { error: `No account found with this ${validatedData.method}` },
        { status: 404 }
      );
    }

    // Generate reset code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated reset code for customer:", resetCode);

    try {
      // Send verification code based on method
      if (validatedData.method === "email") {
        await sendResetCode(validatedData.contact, resetCode);
      } else {
        try {
          await sendSMS(
            validatedData.contact,
            `Mã xác nhận đặt lại mật khẩu của bạn là: ${resetCode}`
          );
        } catch (smsError) {
          console.error("SMS sending failed:", smsError);
          // Fallback to returning the code in development
          if (process.env.NODE_ENV === "development") {
            return NextResponse.json({
              message: "Development mode: SMS would have been sent",
              resetCode, // Only include this in development
            });
          }
          throw smsError;
        }
      }

      console.log(`Reset code sent successfully via ${validatedData.method}`);

      const resetToken = await generateResetToken(customer.id, resetCode);

      await prisma.customer.update({
        where: { id: customer.id },
        data: {
          resetToken: resetToken,
          resetCode: resetCode,
          resetTokenExpiry: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
        },
      });

      console.log("Customer record updated with reset token and code");

      return NextResponse.json({
        message: "Reset code sent successfully",
      });
    } catch (error) {
      console.error(
        `Error sending reset code via ${validatedData.method}:`,
        error
      );
      return NextResponse.json(
        {
          error: "Failed to send reset code",
          details: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in forgot-password route:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid input format",
          details: error.issues,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        error: "An error occurred",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
