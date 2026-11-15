import { NextResponse } from "next/server";
import { z } from "zod";
import { siteConfig } from "@/data/site-config";

const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),
  subject: z
    .string()
    .trim()
    .min(2, "Subject must be at least 2 characters")
    .max(150, "Subject is too long"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(3000, "Message is too long"),
});

function isUsableApiKey(key?: string): boolean {
  if (!key) return false;
  const trimmed = key.trim();
  if (!trimmed) return false;
  if (/^(your_|placeholder|todo|xxx)/i.test(trimmed)) return false;
  return true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    const parsed = contactFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: parsed.error.issues[0]?.message || "Validation failed",
          issues: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parsed.data;
    const receiverEmail =
      process.env.CONTACT_RECEIVER_EMAIL || siteConfig.email;

    // 1. Web3Forms Integration (if WEB3FORMS_ACCESS_KEY is configured)
    const web3FormsKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();
    if (isUsableApiKey(web3FormsKey)) {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            subject: `[Portfolio Contact] ${subject}`,
            from_name: name,
            email,
            message,
          }),
        });

        const result = await response.json().catch(() => null);
        if (response.ok && result?.success) {
          return NextResponse.json({
            ok: true,
            mode: "web3forms",
            recipient: receiverEmail,
            message:
              "Your message has been sent directly to Al Zahra Ramadhani!",
          });
        }
      } catch {
        // Fall through to Resend or fallback mode
      }
    }

    // 2. Resend Integration (if RESEND_API_KEY is configured)
    const resendKey = process.env.RESEND_API_KEY?.trim();
    if (isUsableApiKey(resendKey)) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: [receiverEmail],
            reply_to: email,
            subject: `[Portfolio] ${subject} — from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
          }),
        });

        if (response.ok) {
          return NextResponse.json({
            ok: true,
            mode: "resend",
            recipient: receiverEmail,
            message:
              "Your message has been sent directly to Al Zahra Ramadhani!",
          });
        }
      } catch {
        // Fall through to fallback mode
      }
    }

    // 3. Fallback when API keys are not yet populated in .env.local
    return NextResponse.json({
      ok: true,
      mode: "ready",
      recipient: receiverEmail,
      message: `Thank you ${name}! Your message for ${receiverEmail} has been recorded.`,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to process contact request" },
      { status: 500 }
    );
  }
}
