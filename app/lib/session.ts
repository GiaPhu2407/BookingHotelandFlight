"use server";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const secretKey = process.env.SESSION_SECRET || "your-secret-key-change-this";
const encodedKey = new TextEncoder().encode(secretKey);

export interface SessionData extends Record<string, any> {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  loyaltyPoints: number;
  isVerified: boolean;
}

export async function createSession(data: SessionData) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  const token = await new SignJWT(data as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(encodedKey);

  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, encodedKey);

    if (
      payload &&
      typeof payload.userId === "string" &&
      typeof payload.email === "string" &&
      typeof payload.firstName === "string" &&
      typeof payload.lastName === "string"
    ) {
      return payload as SessionData;
    }

    return null;
  } catch (error) {
    console.error("Session verification failed:", error);
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
