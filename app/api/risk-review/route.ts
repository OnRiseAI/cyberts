import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { brand } from "@/lib/brand";

type RiskReviewBody = {
  name?: string;
  company?: string;
  sector?: string;
  email?: string;
  phone?: string;
  note?: string;
};

const TO = ["support@cyberts.co.uk"];
const FROM = "CyberTS <support@cyberts.co.uk>";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[risk-review] RESEND_API_KEY not set");
    return NextResponse.json({ ok: false, error: "server-misconfig" }, { status: 500 });
  }

  try {
    const body = (await req.json()) as RiskReviewBody;
    const host = req.headers.get("host") ?? "cyberts.co.uk";
    const submittedAt = new Date().toISOString();
    const userAgent = req.headers.get("user-agent") ?? null;

    const name = (body.name ?? "").trim();
    const company = (body.company ?? "").trim();
    const sector = (body.sector ?? "").trim();
    const email = (body.email ?? "").trim();
    const phone = (body.phone ?? "").trim();
    const note = (body.note ?? "").trim();

    if (!name || !company || !email) {
      return NextResponse.json({ ok: false, error: "invalid-input" }, { status: 400 });
    }

    const subject = `Cyber Risk Review — ${company}${sector ? ` · ${sector}` : ""}`;

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject,
      html: renderHtml({ name, company, sector, email, phone, note, submittedAt, host, userAgent }),
      text: renderText({ name, company, sector, email, phone, note, submittedAt, host, userAgent }),
    });

    if (error) {
      console.error("[risk-review] resend error", error);
      return NextResponse.json({ ok: false, error: "upstream", status: 502 }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error("[risk-review]", err);
    return NextResponse.json({ ok: false, error: "exception" }, { status: 500 });
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function nl2br(s: string) {
  return escapeHtml(s).replace(/\n/g, "<br>");
}

type RenderArgs = {
  name: string;
  company: string;
  sector: string;
  email: string;
  phone: string;
  note: string;
  submittedAt: string;
  host: string;
  userAgent: string | null;
};

function renderHtml(a: RenderArgs) {
  const gold = brand.colors.gold;
  const goldHi = brand.colors.goldHi;
  const navy = brand.colors.navy;
  const carbon = brand.colors.carbon;
  const soft = brand.colors.soft;

  const row = (label: string, value: string, opts: { link?: string } = {}) => {
    if (!value) return "";
    const display = opts.link
      ? `<a href="${escapeHtml(opts.link)}" style="color:${goldHi};text-decoration:none;">${escapeHtml(value)}</a>`
      : escapeHtml(value);
    return `
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid rgba(191,137,0,0.18);vertical-align:top;width:140px;">
          <div style="font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${gold};font-family:'Helvetica Neue',Arial,sans-serif;">${escapeHtml(label)}</div>
        </td>
        <td style="padding:14px 0;border-bottom:1px solid rgba(191,137,0,0.18);vertical-align:top;">
          <div style="font-size:15px;color:${soft};font-family:'Helvetica Neue',Arial,sans-serif;line-height:1.5;">${display}</div>
        </td>
      </tr>`;
  };

  const noteBlock = a.note
    ? `<div style="margin-top:28px;padding:18px 20px;background:rgba(191,137,0,0.06);border-left:2px solid ${gold};">
        <div style="font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${gold};margin-bottom:8px;font-family:'Helvetica Neue',Arial,sans-serif;">Brief</div>
        <div style="font-size:14px;line-height:1.65;color:${soft};font-family:'Helvetica Neue',Arial,sans-serif;">${nl2br(a.note)}</div>
      </div>`
    : "";

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:${navy};font-family:'Helvetica Neue',Arial,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${navy};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:${carbon};border:1px solid rgba(191,137,0,0.25);">
            <tr>
              <td style="padding:28px 36px 18px;border-bottom:1px solid rgba(191,137,0,0.2);">
                <div style="font-size:10px;letter-spacing:0.32em;text-transform:uppercase;color:${gold};margin-bottom:10px;">Confidential Enquiry</div>
                <div style="font-size:22px;color:${soft};letter-spacing:0.02em;">
                  New Cyber Risk Review<span style="color:#A4FF00;">.</span>
                </div>
                <div style="font-size:12px;color:rgba(245,245,245,0.55);margin-top:8px;">
                  ${escapeHtml(a.company)}${a.sector ? ` · ${escapeHtml(a.sector)}` : ""}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 36px 28px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  ${row("Name", a.name)}
                  ${row("Company", a.company)}
                  ${row("Sector", a.sector)}
                  ${row("Email", a.email, { link: `mailto:${a.email}` })}
                  ${row("Phone", a.phone, { link: a.phone ? `tel:${a.phone.replace(/\s+/g, "")}` : undefined })}
                </table>
                ${noteBlock}
              </td>
            </tr>
            <tr>
              <td style="padding:18px 36px 28px;border-top:1px solid rgba(191,137,0,0.2);">
                <div style="font-size:9px;letter-spacing:0.28em;text-transform:uppercase;color:rgba(191,137,0,0.55);margin-bottom:10px;">Submission Metadata</div>
                <div style="font-size:11px;color:rgba(245,245,245,0.5);line-height:1.8;">
                  Submitted: ${escapeHtml(a.submittedAt)}<br>
                  Source: ${escapeHtml(a.host)}<br>
                  ${a.userAgent ? `User Agent: ${escapeHtml(a.userAgent)}` : ""}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 36px 22px;background:rgba(0,0,0,0.25);text-align:center;">
                <div style="font-size:9px;letter-spacing:0.28em;text-transform:uppercase;color:rgba(191,137,0,0.5);">
                  ${brand.credentials.map(escapeHtml).join("  ·  ")}
                </div>
              </td>
            </tr>
          </table>
          <div style="font-size:10px;color:rgba(245,245,245,0.35);margin-top:18px;">
            Reply directly to this email to respond to ${escapeHtml(a.name)}.
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function renderText(a: RenderArgs) {
  const lines = [
    `NEW CYBER RISK REVIEW`,
    `${a.company}${a.sector ? ` · ${a.sector}` : ""}`,
    ``,
    `Name:    ${a.name}`,
    `Company: ${a.company}`,
    `Sector:  ${a.sector || "—"}`,
    `Email:   ${a.email}`,
    `Phone:   ${a.phone || "—"}`,
    ``,
  ];
  if (a.note) {
    lines.push(`Brief:`, a.note, ``);
  }
  lines.push(
    `---`,
    `Submitted: ${a.submittedAt}`,
    `Source:    ${a.host}`,
  );
  if (a.userAgent) lines.push(`UA:        ${a.userAgent}`);
  lines.push(``, `Reply to this email to respond directly to ${a.name}.`);
  return lines.join("\n");
}
