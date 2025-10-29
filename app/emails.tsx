import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resendFromAddress =
  process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

if (!resendApiKey) {
  console.warn("RESEND_API_KEY is not set. Email sending will fail.");
}

const resend = new Resend(resendApiKey ?? "");

type SendEmailArgs = {
  to: string;
  subject: string;
  message: string;
  cc?: string;
  from?: string;
  html?: string;
};

const normalizeList = (value?: string) =>
  value
    ?.split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

export async function sendEmail({
  to,
  subject,
  message,
  cc,
  from,
  html,
}: SendEmailArgs) {
  const toList = normalizeList(to);
  if (!toList?.length) {
    throw new Error("Recipient email address is required.");
  }

  const ccList = normalizeList(cc);

  const normalizedHtml =
    html && html.trim().length
      ? html
      : message
          .split("\n")
          .map((line) => line.trim())
          .map((line) => (line.length ? `<p>${line}</p>` : "<br/>"))
          .join("");

  return resend.emails.send({
    from: from ?? resendFromAddress,
    to: toList,
    cc: ccList,
    subject,
    text: message,
    html: normalizedHtml,
  });
}
