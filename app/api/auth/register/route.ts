import { type NextRequest, NextResponse } from "next/server";
import { signUp } from "@/app/lib/auth";
import { createSession } from "@/app/lib/session";
import prisma from "@/prisma/client";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  firstName: z.string().min(1, "Tên là bắt buộc"),
  lastName: z.string().min(1, "Họ là bắt buộc"),
  phoneNumber: z.string().min(10, "Số điện thoại không hợp lệ").optional(),
  address: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const parsedBody = registerSchema.parse(body);
    const { email, password, firstName, lastName, phoneNumber, address } =
      parsedBody;

    const existingCustomer = await prisma.customer.findFirst({
      where: {
        email: email,
      },
    });

    if (existingCustomer) {
      return NextResponse.json({ error: "Email đã tồn tại" }, { status: 400 });
    }

    // Create customer
    const user = await signUp(
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address
    );

    // Create session
    await createSession({
      userId: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      loyaltyPoints: user.loyaltyPoints,
      isVerified: user.isVerified,
    });

    return NextResponse.json({
      success: true,
      message: "Đăng ký thành công",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        loyaltyPoints: user.loyaltyPoints,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues.map((e: { message: any; }) => e.message).join(", ") },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Đăng ký thất bại",
      },
      { status: 500 }
    );
  }
}
