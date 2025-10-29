import { NextResponse } from "next/server";
import { sendEmail } from "../../emails";

type EmailRequestBody = {
  to?: string;
  cc?: string;
  subject?: string;
  message?: string;
  html?: string;
};

export async function POST(request: Request) {
  let payload: EmailRequestBody;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  const { to, cc, subject, message, html } = payload;

  if (!to) {
    return NextResponse.json(
      { error: "Recipient email address is required." },
      { status: 400 }
    );
  }

  const trimmedMessage = (message ?? "").trim();
  const trimmedHtml = (html ?? "").trim();

  if (!trimmedMessage && !trimmedHtml) {
    return NextResponse.json(
      { error: "Message body cannot be empty." },
      { status: 400 }
    );
  }

  try {
    const result = await sendEmail({
      to,
      cc,
      subject: subject ?? "(no subject)",
      message:
        trimmedMessage ||
        trimmedHtml.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(),
      html: trimmedHtml || undefined,
    });

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message ?? "Failed to send email." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { id: result.data?.id ?? null },
      { status: 202 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
