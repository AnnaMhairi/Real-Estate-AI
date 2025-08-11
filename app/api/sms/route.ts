import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sendSMS } from "../../lib/twilio";
import { generateBotReply } from "../../lib/ai";

const prisma = new PrismaClient();

function norm(s?: string) {
  return (s || "").trim().toUpperCase();
}

export async function POST(req: Request) {
  const formData = await req.formData(); // Twilio posts x-www-form-urlencoded
  const from = String(formData.get("From") || "");
  const body = String(formData.get("Body") || "");
  const word = norm(body);

  // --- Compliance keywords ---
  if (["STOP", "STOPALL", "UNSUBSCRIBE", "CANCEL", "END", "QUIT"].includes(word)) {
    await sendSMS(from, "You have been unsubscribed. Reply HELP for help.");
    return new NextResponse("OK", { status: 200 });
  }

  if (word === "HELP") {
    await sendSMS(from, "Help: Reply STOP to cancel. Visit https://yourdomain.com/help");
    return new NextResponse("OK", { status: 200 });
  }

  // --- Double opt-in confirmation ---
  if (["YES", "Y"].includes(word)) {
    await sendSMS(from, "You’re in! Expect up to 4 msgs/mo. Reply STOP to cancel, HELP for help.");
    return new NextResponse("OK", { status: 200 });
  }

  // --- Your existing bot flow ---
  // Find or create lead
  let lead = await prisma.lead.findFirst({ where: { phone: from } });
  if (!lead) {
    lead = await prisma.lead.create({ data: { phone: from } });
  }

  // Save incoming message
  await prisma.message.create({
    data: { leadId: lead.id, sender: "lead", body },
  });

  // Generate AI reply
  const reply = await generateBotReply(body, lead.status);

  // Save bot message
  await prisma.message.create({
    data: { leadId: lead.id, sender: "bot", body: reply },
  });

  // Send SMS reply
  await sendSMS(from, reply);

  return new NextResponse("OK", { status: 200 });
}

export async function GET() {
  return new NextResponse("SMS endpoint is live", { status: 200 });
}
