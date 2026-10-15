import { NextResponse } from "next/server";

// This endpoint validates locally, then forwards only to a configured trusted webhook.
export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") ?? 0) > 12_000) return NextResponse.json({ error: "payload_too_large" }, { status: 413 });

  let payload: unknown;
  try { payload = await request.json(); } catch { return NextResponse.json({ error: "invalid_json" }, { status: 400 }); }
  if (!payload || typeof payload !== "object") return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  const data = payload as Record<string, unknown>;
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const type = typeof data.type === "string" ? data.type : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";
  if (name.length < 1 || name.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || message.length < 1 || message.length > 5000 || !["digital", "identity", "motion", "other"].includes(type)) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  try {
    const response = await fetch(webhook, {
      method: "POST", signal: AbortSignal.timeout(8000),
      headers: { "Content-Type": "application/json", ...(process.env.CONTACT_WEBHOOK_SECRET ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_SECRET}` } : {}) },
      body: JSON.stringify({ name, email, type, message }),
    });
    if (!response.ok) return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
}
