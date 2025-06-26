import React, { useState, useRef, useEffect } from "react";

const Home: React.FC = () => {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [darkMode, setDarkMode] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setLoading(true);
    setError(undefined);
    const userInput = input;
    setInput("");
    try {
      const res = await fetch("/api/generateText", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userInput }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      setMessages((prev) => [...prev, { role: "ai", content: data.text }]);
    } catch (err: any) {
      setError(err.message || "Failed to generate response.");
      setMessages((prev) => [...prev, { role: "ai", content: "Sorry, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 dark:bg-gray-950 flex flex-col items-center py-8 transition-colors duration-300">
      <div className="w-full max-w-2xl flex flex-col flex-1 bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
        <header className="relative px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-indigo-700 via-purple-800 to-gray-900 dark:from-indigo-900 dark:via-purple-900 dark:to-gray-950">
          <h1 className="text-4xl font-serif text-white tracking-tight drop-shadow">Craft.AI</h1>
          <p className="text-sm text-indigo-200 mt-1">Your AI chat assistant</p>
         
        </header>
        <main className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-white/80 dark:bg-gray-900/80 transition-colors duration-300" style={{ minHeight: 400 }}>
          {messages.length === 0 && (
            <div className="text-center text-gray-400 dark:text-gray-500 mt-12">Start the conversation by typing a prompt below.</div>
          )}
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`rounded-2xl px-5 py-3 max-w-[80%] shadow text-base whitespace-pre-line font-medium transition-colors duration-300 ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-indigo-600 to-purple-700 text-white self-end"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 self-start border border-gray-100 dark:border-gray-700"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl px-5 py-3 bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 max-w-[80%] shadow animate-pulse">
                CraftAI is typing...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </main>
        <form onSubmit={handleSubmit} className="flex items-center gap-2 px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 transition-colors duration-300">
          <input
            type="text"
            className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            autoFocus
          />
          <button
            type="submit"
            className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-lg px-5 py-2 font-semibold hover:from-indigo-700 hover:to-purple-800 transition disabled:opacity-60 shadow"
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </form>
        {error && (
          <div className="px-6 py-2 text-red-600 bg-red-50 dark:bg-gray-900/80 border-t border-red-200 dark:border-gray-800 text-sm">{error}</div>
        )}
      </div>
      <footer className="mt-8 text-gray-400 dark:text-gray-600 text-sm">Powered by Next.js, Tailwind CSS, and Hugging Face</footer>
    </div>
  );
};

export default Home;