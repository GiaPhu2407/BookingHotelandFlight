import nodemailer from "nodemailer";

// Tạo transporter với thông tin chi tiết hơn
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  debug: true, // Enable debug logs
});

export async function sendResetCode(email: string, resetCode: string) {
  // Kiểm tra credentials
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error("Gmail credentials not configured");
    throw new Error("Email configuration missing");
  }

  console.log("Attempting to send email to:", email);
  console.log("Using Gmail account:", process.env.GMAIL_USER);

  const mailOptions = {
    from: `"FlyStay Password Reset" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Mã xác nhận đặt lại mật khẩu - FlyStay",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fef5f0;">
        <div style="background-color: #1e5a4a; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px;">FlyStay</h1>
        </div>
        <div style="background-color: #ffffff; padding: 40px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #1e5a4a; margin-top: 0;">Yêu cầu đặt lại mật khẩu</h2>
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản FlyStay của bạn.
          </p>
          <div style="background-color: #fef5f0; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
            <p style="color: #666; margin: 0 0 10px 0; font-size: 14px;">Mã xác nhận của bạn là:</p>
            <p style="font-size: 32px; font-weight: bold; color: #1e5a4a; letter-spacing: 8px; margin: 0;">
              ${resetCode}
            </p>
          </div>
          <p style="color: #666; font-size: 14px; line-height: 1.6;">
            Mã này sẽ hết hạn sau <strong>15 phút</strong>.
          </p>
          <p style="color: #666; font-size: 14px; line-height: 1.6;">
            Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này. Tài khoản của bạn vẫn an toàn.
          </p>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;" />
          <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
            © 2025 FlyStay. Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi.
          </p>
        </div>
      </div>
    `,
  };

  try {
    console.log(
      "Sending email with options:",
      JSON.stringify(mailOptions, null, 2)
    );
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
    return true;
  } catch (error) {
    console.error("Detailed email send error:", error);
    throw new Error(
      `Failed to send email: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
