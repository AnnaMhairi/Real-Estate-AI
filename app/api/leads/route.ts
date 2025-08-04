import { NextResponse } from 'next/server';
import { sendSMS } from '../../lib/twilio';
import { db } from '../../lib/db';

export async function POST(req: Request) {
  const { name, phone, property } = await req.json();

  // Save to DB
  const lead = await db.lead.create({
    data: { name, phone, property },
  });

  // Stubbed SMS (until Twilio is ready)
  console.log(`Pretend sending SMS to ${phone}: Interested in ${property}?`);

  // Uncomment when Twilio's good to go:
  // await sendSMS(phone, `Hi ${name}, thanks for your interest in ${property}.`);

  return NextResponse.json({ success: true });
}
