import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.GEMINI_API_KEY ?? "",
      },
      body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }], role: "user" }],
      generationConfig: {
        response_mime_type: "text/html",
      },
    })
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: await response.text() },
      { status: response.status }
    );
  }

  return NextResponse.json(await response.json());
}