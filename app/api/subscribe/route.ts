import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let email = "";
  try {
    const body = await req.json();
    email = String(body?.email || "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX || apiKey?.split("-").at(-1);

  if (!apiKey || !audienceId || !serverPrefix) {
    return NextResponse.json(
      { error: "Newsletter signup is temporarily unavailable" },
      { status: 503 }
    );
  }

  try {
    const response = await fetch(
      `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`pokernight:${apiKey}`).toString("base64")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_address: email, status: "subscribed" }),
        cache: "no-store",
      }
    );

    if (response.ok) return NextResponse.json({ ok: true });

    const result = (await response.json().catch(() => ({}))) as { title?: string };
    if (response.status === 400 && result.title === "Member Exists") {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Subscription failed" }, { status: 502 });
  } catch {
    return NextResponse.json({ error: "Subscription failed" }, { status: 502 });
  }
}
