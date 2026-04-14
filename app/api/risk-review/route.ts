import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const webhook = process.env.N8N_WEBHOOK_URL;
  if (!webhook) {
    console.error("[risk-review] N8N_WEBHOOK_URL not set");
    return NextResponse.json({ ok: false, error: "server-misconfig" }, { status: 500 });
  }

  try {
    const body = await req.json();
    const payload = {
      ...body,
      source: "cyberts.com",
      submittedAt: new Date().toISOString(),
      userAgent: req.headers.get("user-agent") ?? null,
    };

    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return NextResponse.json({ ok: false }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[risk-review]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
