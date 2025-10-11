import prisma from "@/prisma/client";
import { hash } from "bcryptjs";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CustomerUpdateSchema = z.object({
  email: z.string().email("Email không hợp lệ").optional(),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự").optional(),
  firstName: z.string().min(1, "Họ không được để trống").optional(),
  lastName: z.string().min(1, "Tên không được để trống").optional(),
  phoneNumber: z.string().optional(),
  dateOfBirth: z.string().optional(),
  nationality: z.string().optional(),
  passportNumber: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  loyaltyPoints: z.number().int().min(0).optional(),
  isVerified: z.boolean().optional(),
});

// GET customer by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const customer = await prisma.customer.findUnique({
      where: { id },
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

    if (!customer) {
      return NextResponse.json(
        { error: "Không tìm thấy khách hàng" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    console.error("GET customer error:", error);
    return NextResponse.json(
      { error: "Lỗi khi lấy thông tin khách hàng" },
      { status: 500 }
    );
  }
}

// PUT (update) customer by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    console.log("Update request for customer ID:", id);
    console.log("Update data:", body);

    const validatedData = CustomerUpdateSchema.parse(body);

    // Check if customer exists
    const existingCustomer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!existingCustomer) {
      return NextResponse.json(
        { error: "Không tìm thấy khách hàng" },
        { status: 404 }
      );
    }

    // Check if email is being changed and if it's already in use
    if (validatedData.email && validatedData.email !== existingCustomer.email) {
      const emailExists = await prisma.customer.findUnique({
        where: { email: validatedData.email },
      });

      if (emailExists) {
        return NextResponse.json(
          { error: "Email đã được sử dụng" },
          { status: 400 }
        );
      }
    }

    // Prepare update data
    const updateData: any = {};

    if (validatedData.email) updateData.email = validatedData.email;
    if (validatedData.firstName) updateData.firstName = validatedData.firstName;
    if (validatedData.lastName) updateData.lastName = validatedData.lastName;
    if (validatedData.phoneNumber !== undefined)
      updateData.phoneNumber = validatedData.phoneNumber;
    if (validatedData.dateOfBirth)
      updateData.dateOfBirth = new Date(validatedData.dateOfBirth);
    if (validatedData.nationality !== undefined)
      updateData.nationality = validatedData.nationality;
    if (validatedData.passportNumber !== undefined)
      updateData.passportNumber = validatedData.passportNumber;
    if (validatedData.address !== undefined)
      updateData.address = validatedData.address;
    if (validatedData.city !== undefined) updateData.city = validatedData.city;
    if (validatedData.country !== undefined)
      updateData.country = validatedData.country;
    if (validatedData.loyaltyPoints !== undefined)
      updateData.loyaltyPoints = validatedData.loyaltyPoints;
    if (validatedData.isVerified !== undefined)
      updateData.isVerified = validatedData.isVerified;

    // Hash password if provided
    if (validatedData.password) {
      updateData.password = await hash(validatedData.password, 10);
    }

    // Update customer
    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data: updateData,
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

    return NextResponse.json({
      success: true,
      message: "Cập nhật khách hàng thành công",
      data: updatedCustomer,
    });
  } catch (error: any) {
    console.error("Update customer error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Dữ liệu không hợp lệ",
          details: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Cập nhật khách hàng thất bại" },
      { status: 500 }
    );
  }
}

// DELETE customer by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if customer exists
    const existingCustomer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!existingCustomer) {
      return NextResponse.json(
        { error: "Không tìm thấy khách hàng" },
        { status: 404 }
      );
    }

    // Delete customer
    await prisma.customer.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Xóa khách hàng thành công",
    });
  } catch (error) {
    console.error("DELETE customer error:", error);
    return NextResponse.json(
      { error: "Lỗi khi xóa khách hàng" },
      { status: 500 }
    );
  }
}
