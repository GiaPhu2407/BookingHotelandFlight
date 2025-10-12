export async function sendSMS(
  phoneNumber: string,
  message: string
): Promise<void> {
  console.log(`[v0] Sending SMS to: ${phoneNumber}`);
  console.log(`[v0] Message: ${message}`);

  // In development, just log the message
  if (process.env.NODE_ENV === "development") {
    console.log(
      `[v0] Development mode - SMS would be sent with message: ${message}`
    );
    return;
  }

  // TODO: Implement actual SMS sending with your SMS service
  // Example services: Twilio, AWS SNS, Vonage, etc.
  //
  // Example with Twilio:
  // const client = twilio(
  //   process.env.TWILIO_ACCOUNT_SID,
  //   process.env.TWILIO_AUTH_TOKEN
  // )
  // await client.messages.create({
  //   body: message,
  //   from: process.env.TWILIO_PHONE_NUMBER,
  //   to: phoneNumber
  // })

  throw new Error("SMS service not configured. Please set up an SMS provider.");
}
