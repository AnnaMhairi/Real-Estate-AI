import Twilio from "twilio";

export const twilioClient = Twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export const sendSMS = async (to: string, body: string) => {
  await twilioClient.messages.create({
    body,
    from: process.env.TWILIO_PHONE_NUMBER!,
    to,
  });
};
