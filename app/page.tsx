"use client";

import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  const [sending, setSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [folders, setFolders] = useState<string[]>([
    "Inbox",
    "Starred",
    "Snoozed",
    "Sent",
    "Drafts",
    "All Mail",
    "Spam",
    "Trash",
    "Archive",
  ]);

  useEffect(() => {
    let cancelled = false;

    const loadFolders = async () => {
      try {
        const response = await fetch("/api/folders");
        if (!response.ok) {
          throw new Error("Failed to load folders");
        }

        const data = (await response.json()) as { folders?: string[] };

        if (!cancelled && Array.isArray(data.folders) && data.folders.length) {
          setFolders(data.folders);
        }
      } catch (error) {
        console.error("Unable to load folders", error);
      }
    };

    loadFolders();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSendEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSuccessMessage(null);
    setErrorMessage(null);
    setSending(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const to = (formData.get("to") as string | null)?.trim() ?? "";
    const ccRaw = (formData.get("cc") as string | null)?.trim() ?? "";
    const subject = (formData.get("subject") as string | null)?.trim() ?? "";
    const message = (formData.get("message") as string | null)?.trim() ?? "";

    if (!to) {
      setErrorMessage("Please add at least one recipient.");
      setSending(false);
      return;
    }

    if (!message) {
      setErrorMessage("Message body cannot be empty.");
      setSending(false);
      return;
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to,
          cc: ccRaw.length ? ccRaw : undefined,
          subject,
          message,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        setErrorMessage(
          typeof payload?.error === "string"
            ? payload.error
            : "Unable to send email."
        );
      } else {
        setSuccessMessage("Email sent successfully.");
        form.reset();
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Unexpected network error.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex min-h-screen font-[Helvetica] text-gray-900 bg-white dark:text-white dark:bg-black">
      {/* Sidebar */}
      <aside className="w-56 border-r border-gray-200 dark:border-gray-700 p-4">
        <h1 className="text-xl font-bold mb-6">Inbox</h1>
        <button className="bg-gray-200 dark:bg-gray-800 text-sm font-semibold py-2 px-4 rounded mb-4">
          COMPOSE
        </button>
        <nav className="flex flex-col gap-2 text-sm">
          {folders.map((folder, index) => (
            <span
              key={folder}
              className={
                index === 0
                  ? "font-semibold text-blue-600"
                  : undefined
              }
            >
              {folder}
            </span>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        <div className="flex flex-1">
          {/* Inbox list placeholder */}
          <div className="w-80 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
            <div className="h-full flex flex-col items-start gap-2 px-4 py-6 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                Inbox not connected
              </span>
              <p>
                To view live email threads, connect your real domain in Resend.
              </p>
              <a
                href="https://resend.com/domains"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 dark:text-blue-400 underline"
              >
                Manage domains
              </a>
            </div>
          </div>

          {/* Compose panel */}
          <div className="flex-1 p-6">
            <form
              onSubmit={handleSendEmail}
              className="max-w-3xl border border-gray-200 dark:border-gray-700 rounded"
            >
              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-sm font-semibold">
                New message
              </div>

              <div className="px-4 py-3 space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <label
                    className="w-16 text-gray-500 dark:text-gray-400"
                    htmlFor="compose-to"
                  >
                    To
                  </label>
                  <input
                    id="compose-to"
                    name="to"
                    type="email"
                    className="flex-1 border-b border-gray-200 dark:border-gray-700 bg-transparent outline-none"
                    placeholder="name@example.com"
                    required
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label
                    className="w-16 text-gray-500 dark:text-gray-400"
                    htmlFor="compose-cc"
                  >
                    Cc/Bcc
                  </label>
                  <input
                    id="compose-cc"
                    name="cc"
                    type="text"
                    className="flex-1 border-b border-gray-200 dark:border-gray-700 bg-transparent outline-none"
                    placeholder="Add comma separated emails"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label
                    className="w-16 text-gray-500 dark:text-gray-400"
                    htmlFor="compose-subject"
                  >
                    Subject
                  </label>
                  <input
                    id="compose-subject"
                    name="subject"
                    type="text"
                    className="flex-1 border-b border-gray-200 dark:border-gray-700 bg-transparent outline-none"
                    placeholder="Add a subject"
                  />
                </div>
              </div>

              <div className="px-4 pb-4">
                <textarea
                  id="compose-message"
                  name="message"
                  aria-label="Message body"
                  className="w-full h-[420px] border border-gray-200 dark:border-gray-700 rounded p-3 text-sm outline-none focus:border-gray-400 dark:focus:border-gray-500 resize-none bg-transparent"
                  placeholder="Write your message here..."
                  required
                />
              </div>

              <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2">
                <button
                  type="submit"
                  className="bg-gray-200 dark:bg-gray-800 text-sm font-semibold px-3 py-1.5 rounded disabled:opacity-60"
                  disabled={sending}
                >
                  {sending ? "Sending…" : "Send"}
                </button>
                <button
                  type="reset"
                  className="text-sm px-2 py-1.5"
                  onClick={() => {
                    setSuccessMessage(null);
                    setErrorMessage(null);
                  }}
                  disabled={sending}
                >
                  Discard
                </button>
                <div className="ml-auto text-xs">
                  {errorMessage ? (
                    <span className="text-red-600 dark:text-red-400">
                      {errorMessage}
                    </span>
                  ) : successMessage ? (
                    <span className="text-green-600 dark:text-green-400">
                      {successMessage}
                    </span>
                  ) : null}
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
