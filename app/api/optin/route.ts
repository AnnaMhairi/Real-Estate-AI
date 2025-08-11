import { NextResponse } from "next/server";
import { sendSMS } from "../../lib/twilio";

const BRAND = "Real Estate AI";
const MSG_FREQ = "4 msgs/mo";

// super basic US-ish phone sanity check (feel free to swap in libphonenumber-js later)
function toE164Like(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  if (raw.startsWith("+") && digits.length >= 8) return raw;
  throw new Error("invalid");
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const phoneRaw = String(form.get("phone") || "");
    const name = String(form.get("name") || "");
    const agree = form.get("agree");

    // validations
    if (!phoneRaw) {
      return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
    }
    if (!agree) {
      return NextResponse.json({ error: "You must agree to receive SMS." }, { status: 400 });
    }

    let phone: string;
    try {
      phone = toE164Like(phoneRaw);
    } catch {
      return NextResponse.json({ error: "Enter a valid mobile number." }, { status: 400 });
    }

    // (optional) basic abuse guard: 1 sms per number per minute via in-memory map/kv — skip for now if you don’t have storage

    // send double opt-in
    await sendSMS(
      phone,
      `${BRAND}: Reply YES to confirm SMS (${MSG_FREQ}). Reply STOP to cancel, HELP for help. Msg&data rates may apply.`
    );

    // if you want to log the attempted opt-in somewhere, do it here (DB/event)
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("optin error:", err);
    return NextResponse.json({ error: "Server borked. Try again." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, hint: "POST a form with phone, (name), agree" });
}
