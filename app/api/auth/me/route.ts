import { NextResponse } from "next/server";
import { getSession } from "@/app/lib/session";
import prisma from "@/prisma/client";

export async function GET() {
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
        phoneNumber: true,
        address: true,
        city: true,
        country: true,
        loyaltyPoints: true,
        isVerified: true,
      },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Khách hàng không tồn tại" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        fullname: `${customer.firstName} ${customer.lastName}`,
        phoneNumber: customer.phoneNumber,
        address: customer.address,
        city: customer.city,
        country: customer.country,
        loyaltyPoints: customer.loyaltyPoints,
        isVerified: customer.isVerified,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Lỗi khi lấy thông tin người dùng" },
      { status: 500 }
    );
  }
}
