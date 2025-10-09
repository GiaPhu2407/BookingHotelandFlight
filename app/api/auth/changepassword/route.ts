import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { compare, hash } from "bcryptjs";
 
import { getSession } from "@/app/lib/session";
import prisma from "@/prisma/client";
 

const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Mật khẩu hiện tại không được để trống"),
  newPassword: z.string().min(8, "Mật khẩu mới phải có ít nhất 8 ký tự"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = ChangePasswordSchema.parse(body);

    // Get current user session
    const session = await getSession();

    if (!session || !session.userId) {
      return NextResponse.json(
        { error: "Vui lòng đăng nhập để thực hiện thao tác này" },
        { status: 401 }
      );
    }

    // Find customer in database
    const customer = await prisma.customer.findUnique({
      where: { id: session.userId },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Không tìm thấy tài khoản" },
        { status: 404 }
      );
    }

    // Verify current password
    const isValidPassword = await compare(
      validatedData.currentPassword,
      customer.password
    );

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Mật khẩu hiện tại không chính xác" },
        { status: 401 }
      );
    }

    // Hash new password
    const hashedNewPassword = await hash(validatedData.newPassword, 10);

    // Update password in database
    await prisma.customer.update({
      where: { id: customer.id },
      data: { password: hashedNewPassword },
    });

    return NextResponse.json({
      success: true,
      message: "Đổi mật khẩu thành công",
    });
  } catch (error) {
    console.error("Change password error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Dữ liệu không hợp lệ",
          details: error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Có lỗi xảy ra khi đổi mật khẩu" },
      { status: 500 }
    );
  }
}
