import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get total customers
    const totalCustomers = await prisma.customer.count();

    // Get verified customers
    const verifiedCustomers = await prisma.customer.count({
      where: { isVerified: true },
    });

    // Get customers by country
    const customersByCountry = await prisma.customer.groupBy({
      by: ["country"],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: "desc",
        },
      },
      take: 10,
    });

    // Get customers registered in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const newCustomers = await prisma.customer.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    });

    // Get top loyalty customers
    const topLoyaltyCustomers = await prisma.customer.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        loyaltyPoints: true,
      },
      orderBy: {
        loyaltyPoints: "desc",
      },
      take: 10,
    });

    return NextResponse.json({
      success: true,
      data: {
        totalCustomers,
        verifiedCustomers,
        unverifiedCustomers: totalCustomers - verifiedCustomers,
        newCustomersLast30Days: newCustomers,
        customersByCountry: customersByCountry.map((item) => ({
          country: item.country || "Không xác định",
          count: item._count.id,
        })),
        topLoyaltyCustomers,
      },
      message: "Lấy thống kê khách hàng thành công",
    });
  } catch (error) {
    console.error("Error fetching customer stats:", error);
    return NextResponse.json(
      { error: "Không thể lấy thống kê khách hàng" },
      { status: 500 }
    );
  }
}
