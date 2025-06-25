import { useState } from "react";

interface PromptFormProps {
  onSubmit: (prompt: string) => void;
  loading?: boolean;
  placeholder?: string;
}

export default function PromptForm({ onSubmit, loading, placeholder }: PromptFormProps) {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="flex gap-2">
      <input
        className="flex-1 border rounded p-2"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={placeholder || "Enter a prompt..."}
      />
      <button
        onClick={() => onSubmit(prompt)}
        disabled={loading}
        className={`bg-blue-500 text-white px-4 py-2 rounded ${loading ? "opacity-50" : ""}`}
      >
        {loading ? "Loading..." : "Generate"}
      </button>
    </div>
  );
}