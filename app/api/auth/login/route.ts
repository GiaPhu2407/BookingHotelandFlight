import { type NextRequest, NextResponse } from "next/server";
import { login } from "@/app/lib/auth";
import { createSession } from "@/app/lib/session";
import { z } from "zod";

const loginSchema = z
  .object({
    identifier: z
      .string()
      .min(1, "Email hoặc số điện thoại là bắt buộc")
      .optional(),
    email: z.string().optional(), // Temporary: accept old format
    password: z.string().min(1, "Mật khẩu là bắt buộc"),
  })
  .refine((data) => data.identifier || data.email, {
    message: "Email hoặc số điện thoại là bắt buộc",
    path: ["identifier"],
  });

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON format",
        },
        { status: 400 }
      );
    }

    // Log request for debugging
    console.log("=== LOGIN REQUEST ===");
    console.log("Body received:", JSON.stringify(body, null, 2));
    console.log("Body keys:", Object.keys(body));
    console.log("identifier:", body.identifier);
    console.log("password:", body.password ? "***" : "missing");

    // Validate request body
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      console.error("=== VALIDATION FAILED ===");
      console.error(
        "Validation errors:",
        JSON.stringify(validation.error.issues, null, 2)
      );
      return NextResponse.json(
        {
          success: false,
          error: "Dữ liệu không hợp lệ",
          details: validation.error.issues.map((e) => ({
            field: e.path.join(".") || "unknown",
            message: e.message,
            // received: e.received,
          })),
        },
        { status: 400 }
      );
    }

    console.log("=== VALIDATION PASSED ===");

    const { identifier, email, password } = validation.data;
    const actualIdentifier = identifier || email;

    if (!actualIdentifier) {
      return NextResponse.json(
        {
          success: false,
          error: "Email hoặc số điện thoại là bắt buộc",
        },
        { status: 400 }
      );
    }

    console.log("Using identifier:", actualIdentifier);

    // Authenticate user
    const user = await login(actualIdentifier, password);

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
      message: "Đăng nhập thành công",
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
    console.error("Login error:", error);

    // Handle authentication errors
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 401 }
      );
    }

    // Handle unknown errors
    return NextResponse.json(
      {
        success: false,
        error: "Đã xảy ra lỗi trong quá trình đăng nhập",
      },
      { status: 500 }
    );
  }
}
