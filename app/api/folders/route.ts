import { NextResponse } from "next/server";

const defaultFolders = [
  "Inbox",
  "Starred",
  "Snoozed",
  "Sent",
  "Drafts",
  "All Mail",
  "Spam",
  "Trash",
  "Archive",
];

const parseFolders = () => {
  const configured = process.env.EMAIL_FOLDERS;
  if (!configured) {
    return defaultFolders;
  }

  const parsed = configured
    .split(",")
    .map((folder) => folder.trim())
    .filter(Boolean);

  return parsed.length ? parsed : defaultFolders;
};

export async function GET() {
  return NextResponse.json({ folders: parseFolders() });
}
