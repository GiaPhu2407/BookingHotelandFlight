import prisma from "@/prisma/client";
import { hash } from "bcryptjs";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for creating new customer
const CustomerCreateSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  firstName: z.string().min(1, "Họ không được để trống"),
  lastName: z.string().min(1, "Tên không được để trống"),
  phoneNumber: z.string().optional(),
  dateOfBirth: z.string().optional(),
  nationality: z.string().optional(),
  passportNumber: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

// GET all customers with filtering, pagination, and search
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Pagination parameters
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Filter parameters
    const search = searchParams.get("search") || "";
    const isVerified = searchParams.get("isVerified");
    const country = searchParams.get("country");
    const nationality = searchParams.get("nationality");

    // Build where clause
    const where: any = {};

    // Search by name, email, or phone
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phoneNumber: { contains: search, mode: "insensitive" } },
      ];
    }

    // Filter by verification status
    if (isVerified !== null && isVerified !== undefined) {
      where.isVerified = isVerified === "true";
    }

    // Filter by country
    if (country) {
      where.country = country;
    }

    // Filter by nationality
    if (nationality) {
      where.nationality = nationality;
    }

    // Get total count for pagination
    const total = await prisma.customer.count({ where });

    // Get customers with pagination
    const customers = await prisma.customer.findMany({
      where,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        dateOfBirth: true,
        nationality: true,
        passportNumber: true,
        address: true,
        city: true,
        country: true,
        loyaltyPoints: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    });

    return NextResponse.json({
      success: true,
      data: customers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      message: "Lấy danh sách khách hàng thành công",
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Không thể lấy danh sách khách hàng" },
      { status: 500 }
    );
  }
}

// POST route to create new customer
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = CustomerCreateSchema.parse(body);

    // Check if email already exists
    const existingCustomer = await prisma.customer.findUnique({
      where: { email: validatedData.email },
    });

    if (existingCustomer) {
      return NextResponse.json(
        { error: "Email đã được sử dụng" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(validatedData.password, 10);

    // Create customer
    const customer = await prisma.customer.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        phoneNumber: validatedData.phoneNumber,
        dateOfBirth: validatedData.dateOfBirth
          ? new Date(validatedData.dateOfBirth)
          : null,
        nationality: validatedData.nationality,
        passportNumber: validatedData.passportNumber,
        address: validatedData.address,
        city: validatedData.city,
        country: validatedData.country,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        dateOfBirth: true,
        nationality: true,
        passportNumber: true,
        address: true,
        city: true,
        country: true,
        loyaltyPoints: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: customer,
        message: "Tạo khách hàng thành công",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating customer:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Dữ liệu không hợp lệ",
        //   details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Không thể tạo khách hàng" },
      { status: 500 }
    );
  }
}

// DELETE all customers (use with caution!)
export async function DELETE(request: NextRequest) {
  try {
    const result = await prisma.customer.deleteMany();
    return NextResponse.json({
      success: true,
      count: result.count,
      message: "Xoá tất cả khách hàng thành công",
    });
  } catch (error) {
    console.error("Error deleting customers:", error);
    return NextResponse.json(
      { error: "Không thể xóa khách hàng" },
      { status: 500 }
    );
  }
}
