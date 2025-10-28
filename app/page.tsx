"use client";

export default function Page() {
  const emails = [
    { subject: "We need your feedback", sender: "Gear 4 Good", snippet: "…" },
    { subject: "Your order has shipped", sender: "Gear 4 Good", snippet: "…" },
    { subject: "Welcome to Gear4Good", sender: "Gear 4 Good", snippet: "…" },
  ];

  return (
    <div className="flex min-h-screen font-[Helvetica] text-gray-900 bg-white dark:text-white dark:bg-black">
      {/* Sidebar */}
      <aside className="w-56 border-r border-gray-200 dark:border-gray-700 p-4">
        <h1 className="text-xl font-bold mb-6">EMail</h1>
        <button className="bg-gray-200 dark:bg-gray-800 text-sm font-semibold py-2 px-4 rounded mb-4">
          COMPOSE
        </button>
        <nav className="flex flex-col gap-2 text-sm">
          <span className="font-semibold text-blue-600">📥 Inbox (561)</span>
          <span>⭐ Starred</span>
          <span>🕑 Snoozed</span>
          <span>📤 Sent</span>
          <span>📝 Drafts</span>
          <span>📦 All Mail</span>
          <span>🚫 Spam</span>
          <span>🗑 Trash</span>
          <span>🏷 Categories</span>
          <span>⬇ More</span>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="border-b border-gray-200 dark:border-gray-700 px-4 py-2">
          <input
            type="text"
            placeholder="🔍 search in email"
            className="w-full bg-gray-100 dark:bg-gray-800 rounded px-3 py-2 text-sm outline-none"
          />
        </header>

        <div className="flex flex-1">
          {/* Inbox list (static) */}
          <div className="w-80 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
            {emails.map((e, i) => (
              <div
                key={i}
                className="border-b border-gray-100 dark:border-gray-800 px-4 py-3 text-sm"
              >
                <div className="font-semibold">{e.sender}</div>
                <div>{e.subject}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {e.snippet}
                </div>
              </div>
            ))}
          </div>

          {/* Compose panel */}
          <div className="flex-1 p-6">
            <div className="max-w-3xl border border-gray-200 dark:border-gray-700 rounded">
              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-sm font-semibold">
                New message
              </div>

              <div className="px-4 py-3 space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-16 text-gray-500 dark:text-gray-400">To</span>
                  <input
                    type="text"
                    className="flex-1 border-b border-gray-200 dark:border-gray-700 bg-transparent outline-none"
                    placeholder="name@example.com"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-16 text-gray-500 dark:text-gray-400">Cc/Bcc</span>
                  <input
                    type="text"
                    className="flex-1 border-b border-gray-200 dark:border-gray-700 bg-transparent outline-none"
                    placeholder="Add Cc or Bcc"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-16 text-gray-500 dark:text-gray-400">Subject</span>
                  <input
                    type="text"
                    className="flex-1 border-b border-gray-200 dark:border-gray-700 bg-transparent outline-none"
                    placeholder="Add a subject"
                  />
                </div>
              </div>

              <div className="px-4 pb-4">
                <textarea
                  aria-label="Message body"
                  className="w-full h-[420px] border border-gray-200 dark:border-gray-700 rounded p-3 text-sm outline-none focus:border-gray-400 dark:focus:border-gray-500 resize-none bg-transparent"
                  placeholder="Write your message here..."
                />
              </div>

              <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2">
                <button className="bg-gray-200 dark:bg-gray-800 text-sm font-semibold px-3 py-1.5 rounded">
                  Send
                </button>
                <button className="text-sm px-2 py-1.5">Discard</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
