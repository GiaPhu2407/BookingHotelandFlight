import crypto from "crypto";

export async function generateResetToken(
  userId: string,
  resetCode: string
): Promise<string> {
  // Generate a secure token combining user ID, reset code, and random bytes
  const randomBytes = crypto.randomBytes(32).toString("hex");
  const tokenData = `${userId}-${resetCode}-${randomBytes}`;

  // Hash the token for additional security
  const token = crypto.createHash("sha256").update(tokenData).digest("hex");

  return token;
}

export function verifyResetToken(token: string): boolean {
  // Basic validation - check if token is a valid hex string
  return /^[a-f0-9]{64}$/i.test(token);
}
