// app/api/verify-code/route.ts
import { NextResponse } from "next/server";
import { getSession } from "@/app/lib/session";
import prisma from "@/prisma/client";

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
    }

    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { error: "Vui lòng nhập mã xác thực" },
        { status: 400 }
      );
    }

    // Validate mã có đúng format không (6 số)
    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json(
        { error: "Mã xác thực phải là 6 số" },
        { status: 400 }
      );
    }

    // Tìm mã xác thực
    const verificationCode = await prisma.verificationCode.findFirst({
      where: {
        customerId: session.userId,
        code: code,
        expiresAt: {
          gt: new Date(), // Chưa hết hạn
        },
      },
      orderBy: {
        createdAt: "desc", // Lấy mã mới nhất
      },
    });

    if (!verificationCode) {
      // Kiểm tra xem có mã nào của user này không (để biết lỗi là gì)
      const anyCode = await prisma.verificationCode.findFirst({
        where: { customerId: session.userId },
        orderBy: { createdAt: "desc" },
      });

      if (!anyCode) {
        return NextResponse.json(
          { error: "Không tìm thấy mã xác thực. Vui lòng yêu cầu gửi mã mới." },
          { status: 400 }
        );
      }

      if (anyCode.expiresAt < new Date()) {
        return NextResponse.json(
          { error: "Mã xác thực đã hết hạn. Vui lòng yêu cầu gửi mã mới." },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: "Mã xác thực không đúng. Vui lòng kiểm tra lại." },
        { status: 400 }
      );
    }

    // Cập nhật trạng thái xác thực
    await prisma.customer.update({
      where: { id: session.userId },
      data: {
        isVerified: true,
        updatedAt: new Date(),
      },
    });

    // Xóa tất cả mã xác thực của user này
    await prisma.verificationCode.deleteMany({
      where: { customerId: session.userId },
    });

    console.log(`User ${session.userId} verified successfully`);

    return NextResponse.json({
      success: true,
      message: "Email đã được xác thực thành công",
    });
  } catch (error) {
    console.error("Error verifying code:", error);
    return NextResponse.json(
      {
        error: "Không thể xác thực mã",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
