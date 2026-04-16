import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const webhook = process.env.N8N_WEBHOOK_URL;
  if (!webhook) {
    console.error("[risk-review] N8N_WEBHOOK_URL not set");
    return NextResponse.json({ ok: false, error: "server-misconfig" }, { status: 500 });
  }

  try {
    const body = await req.json();
    const host = req.headers.get("host") ?? "cyberts.co.uk";
    const payload = {
      ...body,
      source: host,
      submittedAt: new Date().toISOString(),
      userAgent: req.headers.get("user-agent") ?? null,
    };

    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const upstreamBody = await res.text().catch(() => "");
      console.error("[risk-review] upstream failed", res.status, upstreamBody.slice(0, 300));
      return NextResponse.json(
        { ok: false, error: "upstream", status: res.status },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[risk-review]", err);
    return NextResponse.json({ ok: false, error: "exception" }, { status: 500 });
  }
}
