import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let email = "";
  try {
    const body = await req.json();
    email = String(body?.email || "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  // If MailerLite is not configured yet, accept the signup gracefully
  // so the form works; wire MAILERLITE_API_KEY/MAILERLITE_GROUP_ID in
  // Vercel env vars to enable delivery (same pattern as BRN).
  if (!apiKey) {
    console.log("[subscribe] MailerLite not configured; received:", email);
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        ...(groupId ? { groups: [groupId] } : {}),
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("[subscribe] MailerLite error:", res.status, text);
      return NextResponse.json({ error: "Subscription failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[subscribe] error:", err);
    return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
  }
}
