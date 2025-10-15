// lib/email.ts
import nodemailer from "nodemailer";

// Tạo transporter với cấu hình Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  debug: true,
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Email transporter verification failed:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Gửi mã xác thực email
export async function sendVerificationCode(
  email: string,
  firstName: string,
  lastName: string,
  code: string
) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error("Email credentials not configured");
    throw new Error("Email configuration missing");
  }

  console.log("Sending verification email to:", email);

  const mailOptions = {
    from: `"FlyStay" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Mã xác thực email - FlyStay",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f0f9ff;">
        <div style="background-color: #2563eb; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px;">✈️ FlyStay</h1>
        </div>
        
        <div style="background-color: #ffffff; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h2 style="color: #2563eb; margin-top: 0;">Xin chào ${firstName} ${lastName}!</h2>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Cảm ơn bạn đã đăng ký tài khoản FlyStay. Để hoàn tất quá trình xác thực email, vui lòng sử dụng mã bên dưới:
          </p>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 12px; text-align: center; margin: 30px 0; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);">
            <p style="color: #ffffff; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Mã xác thực của bạn</p>
            <p style="font-size: 36px; font-weight: bold; color: #ffffff; letter-spacing: 8px; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">
              ${code}
            </p>
          </div>
          
          <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 25px 0;">
            <p style="color: #92400e; margin: 0; font-size: 14px; line-height: 1.6;">
              ⏰ <strong>Lưu ý:</strong> Mã này sẽ hết hạn sau <strong>10 phút</strong>.
            </p>
          </div>
          
          <p style="color: #666; font-size: 14px; line-height: 1.6;">
            Nếu bạn không yêu cầu xác thực email này, vui lòng bỏ qua email này. Tài khoản của bạn vẫn an toàn.
          </p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
            <p style="color: #666; font-size: 13px; line-height: 1.6; margin: 0;">
              Bạn gặp vấn đề? Liên hệ với chúng tôi tại <a href="mailto:support@flystay.com" style="color: #2563eb; text-decoration: none;">support@flystay.com</a>
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
          
          <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">
            © 2025 FlyStay. Hệ thống đặt vé máy bay và khách sạn trực tuyến.
          </p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw new Error(
      `Failed to send verification email: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

// Gửi mã reset password
export async function sendResetCode(email: string, resetCode: string) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error("Email credentials not configured");
    throw new Error("Email configuration missing");
  }

  console.log("Sending reset password email to:", email);

  const mailOptions = {
    from: `"FlyStay Password Reset" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Mã xác nhận đặt lại mật khẩu - FlyStay",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fef5f0;">
        <div style="background-color: #1e5a4a; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🔒 FlyStay</h1>
        </div>
        
        <div style="background-color: #ffffff; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h2 style="color: #1e5a4a; margin-top: 0;">Yêu cầu đặt lại mật khẩu</h2>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản FlyStay của bạn.
          </p>
          
          <div style="background: linear-gradient(135deg, #1e5a4a 0%, #2d7a5f 100%); padding: 25px; border-radius: 12px; text-align: center; margin: 30px 0; box-shadow: 0 4px 12px rgba(30, 90, 74, 0.3);">
            <p style="color: #ffffff; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Mã xác nhận của bạn</p>
            <p style="font-size: 36px; font-weight: bold; color: #ffffff; letter-spacing: 8px; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">
              ${resetCode}
            </p>
          </div>
          
          <div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 15px; border-radius: 6px; margin: 25px 0;">
            <p style="color: #991b1b; margin: 0; font-size: 14px; line-height: 1.6;">
              ⏰ <strong>Quan trọng:</strong> Mã này sẽ hết hạn sau <strong>15 phút</strong>.
            </p>
          </div>
          
          <p style="color: #666; font-size: 14px; line-height: 1.6;">
            Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này. Tài khoản của bạn vẫn an toàn và không có thay đổi nào được thực hiện.
          </p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 25px 0;">
            <p style="color: #374151; margin: 0; font-size: 13px; line-height: 1.6;">
              💡 <strong>Mẹo bảo mật:</strong> Không bao giờ chia sẻ mã này với bất kỳ ai, kể cả nhân viên FlyStay.
            </p>
          </div>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
            <p style="color: #666; font-size: 13px; line-height: 1.6; margin: 0;">
              Cần trợ giúp? Liên hệ <a href="mailto:support@flystay.com" style="color: #1e5a4a; text-decoration: none;">support@flystay.com</a>
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
          
          <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">
            © 2025 FlyStay. Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi.
          </p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Reset password email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Failed to send reset password email:", error);
    throw new Error(
      `Failed to send reset password email: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

// Gửi email xác nhận đặt chỗ thành công
export async function sendBookingConfirmation(
  email: string,
  bookingDetails: {
    customerName: string;
    bookingId: string;
    flightNumber?: string;
    hotelName?: string;
    date: string;
    totalAmount: number;
  }
) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error("Email configuration missing");
  }

  const mailOptions = {
    from: `"FlyStay Booking" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Xác nhận đặt chỗ #${bookingDetails.bookingId} - FlyStay`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f0fdf4;">
        <div style="background-color: #10b981; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px;">✅ Đặt chỗ thành công!</h1>
        </div>
        
        <div style="background-color: #ffffff; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h2 style="color: #10b981; margin-top: 0;">Xin chào ${
            bookingDetails.customerName
          }!</h2>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Cảm ơn bạn đã đặt chỗ với FlyStay. Đơn đặt chỗ của bạn đã được xác nhận thành công.
          </p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #374151; margin-top: 0;">Chi tiết đặt chỗ</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Mã đặt chỗ:</td>
                <td style="padding: 8px 0; color: #111827; font-weight: bold; border-bottom: 1px solid #e5e7eb; text-align: right;">#${
                  bookingDetails.bookingId
                }</td>
              </tr>
              ${
                bookingDetails.flightNumber
                  ? `
              <tr>
                <td style="padding: 8px 0; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Số hiệu chuyến bay:</td>
                <td style="padding: 8px 0; color: #111827; border-bottom: 1px solid #e5e7eb; text-align: right;">${bookingDetails.flightNumber}</td>
              </tr>
              `
                  : ""
              }
              ${
                bookingDetails.hotelName
                  ? `
              <tr>
                <td style="padding: 8px 0; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Khách sạn:</td>
                <td style="padding: 8px 0; color: #111827; border-bottom: 1px solid #e5e7eb; text-align: right;">${bookingDetails.hotelName}</td>
              </tr>
              `
                  : ""
              }
              <tr>
                <td style="padding: 8px 0; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Ngày:</td>
                <td style="padding: 8px 0; color: #111827; border-bottom: 1px solid #e5e7eb; text-align: right;">${
                  bookingDetails.date
                }</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #6b7280; font-weight: bold;">Tổng tiền:</td>
                <td style="padding: 12px 0; color: #10b981; font-weight: bold; font-size: 20px; text-align: right;">${bookingDetails.totalAmount.toLocaleString()} VND</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px; border-radius: 6px; margin: 25px 0;">
            <p style="color: #1e40af; margin: 0; font-size: 14px; line-height: 1.6;">
              📧 Email xác nhận này là bằng chứng đặt chỗ của bạn. Vui lòng lưu giữ để sử dụng khi cần.
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
          
          <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">
            © 2025 FlyStay. Chúc bạn có chuyến đi vui vẻ!
          </p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Booking confirmation email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Failed to send booking confirmation:", error);
    throw new Error(
      `Failed to send booking confirmation: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
