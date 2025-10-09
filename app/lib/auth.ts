import prisma from "@/prisma/client"
import { compare, hash } from "bcryptjs"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phoneNumber?: string | null
  address?: string | null
  city?: string | null
  country?: string | null
  loyaltyPoints: number
  isVerified: boolean
}

// Login function
export async function login(identifier: string, password: string): Promise<User> {
  // Find customer by email
  const customer = await prisma.customer.findFirst({
    where: {
      email: identifier,
    },
  })

  if (!customer) {
    throw new Error("Tài khoản không tồn tại")
  }

  // Verify password
  const isPasswordValid = await compare(password, customer.password)
  if (!isPasswordValid) {
    throw new Error("Mật khẩu không chính xác")
  }

  return {
    id: customer.id,
    email: customer.email,
    firstName: customer.firstName,
    lastName: customer.lastName,
    phoneNumber: customer.phoneNumber,
    address: customer.address,
    city: customer.city,
    country: customer.country,
    loyaltyPoints: customer.loyaltyPoints,
    isVerified: customer.isVerified,
  }
}

// Sign up function
export async function signUp(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phoneNumber?: string,
  address?: string,
): Promise<User> {
  // Hash password
  const hashedPassword = await hash(password, 10)

  // Create customer
  const customer = await prisma.customer.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
      address,
    },
  })

  return {
    id: customer.id,
    email: customer.email,
    firstName: customer.firstName,
    lastName: customer.lastName,
    phoneNumber: customer.phoneNumber,
    address: customer.address,
    city: customer.city,
    country: customer.country,
    loyaltyPoints: customer.loyaltyPoints,
    isVerified: customer.isVerified,
  }
}
