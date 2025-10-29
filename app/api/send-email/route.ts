import { NextResponse } from "next/server";
import { sendEmail } from "../../emails";

type EmailRequestBody = {
  to?: string;
  cc?: string;
  subject?: string;
  message?: string;
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

  const { to, cc, subject, message } = payload;

  if (!to) {
    return NextResponse.json(
      { error: "Recipient email address is required." },
      { status: 400 }
    );
  }

  if (!message) {
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
      message,
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
