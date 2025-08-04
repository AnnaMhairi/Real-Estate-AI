import { db } from '../../lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, phone, property } = await req.json();

    const lead = await db.lead.create({
      data: { name, phone, property, status: 'pending' },
    });

    // TODO: Replace with real Twilio send when ready
    console.log(`Would send SMS to ${phone} about ${property}`);

    await db.lead.update({
      where: { id: lead.id },
      data: { status: 'sms_sent' },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error creating lead:', err);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
