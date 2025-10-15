// app/api/send-verification/route.ts
import { NextResponse } from "next/server";
import { getSession } from "@/app/lib/session";
import prisma from "@/prisma/client";
import { sendVerificationCode } from "@/app/lib/email";

export async function POST() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
    }

    const customer = await prisma.customer.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        isVerified: true,
      },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Không tìm thấy người dùng" },
        { status: 404 }
      );
    }

    if (customer.isVerified) {
      return NextResponse.json(
        { error: "Email đã được xác thực" },
        { status: 400 }
      );
    }

    // Kiểm tra xem có mã nào được gửi trong 1 phút gần đây không (chống spam)
    const recentCode = await prisma.verificationCode.findFirst({
      where: {
        customerId: customer.id,
        createdAt: {
          gte: new Date(Date.now() - 60 * 1000), // 1 phút trước
        },
      },
    });

    if (recentCode) {
      return NextResponse.json(
        { error: "Vui lòng đợi 1 phút trước khi gửi lại mã" },
        { status: 429 }
      );
    }

    // Tạo mã xác thực 6 số
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Xóa các mã cũ của user này
    await prisma.verificationCode.deleteMany({
      where: { customerId: customer.id },
    });

    // Lưu mã mới vào database với thời hạn 10 phút
    await prisma.verificationCode.create({
      data: {
        customerId: customer.id,
        code: verificationCode,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 phút
      },
    });

    // Gửi email
    await sendVerificationCode(
      customer.email,
      customer.firstName,
      customer.lastName,
      verificationCode
    );

    return NextResponse.json({
      success: true,
      message: "Mã xác thực đã được gửi đến email của bạn",
    });
  } catch (error) {
    console.error("Error sending verification:", error);
    return NextResponse.json(
      {
        error: "Không thể gửi mã xác thực",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
