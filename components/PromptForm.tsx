import React, { useState, FormEvent } from "react";

interface PromptFormProps {
  label: string;
  placeholder: string;
  onSubmit: (prompt: string) => Promise<void>;
  loading: boolean;
  result?: string;
  resultType?: "text" | "image";
  error?: string;
}

const PromptForm: React.FC<PromptFormProps> = ({
  label,
  placeholder,
  onSubmit,
  loading,
  result,
  resultType = "text",
  error,
}) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    await onSubmit(prompt);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 w-full max-w-xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="font-semibold text-gray-700">{label}</label>
        <input
          type="text"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder={placeholder}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          disabled={loading || !prompt.trim()}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Generating...
            </span>
          ) : (
            "Generate"
          )}
        </button>
      </form>
      {error && (
        <div className="mt-4 text-red-600 bg-red-50 border border-red-200 rounded p-3">
          {error}
        </div>
      )}
      {result && (
        <div className="mt-6">
          <div className="font-semibold mb-2">Result:</div>
          {resultType === "text" ? (
            <div className="whitespace-pre-line bg-gray-50 p-4 rounded border border-gray-100 text-gray-800">
              {result}
            </div>
          ) : (
            <img
              src={`data:image/png;base64,${result}`}
              alt="Generated"
              className="rounded shadow max-w-full"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PromptForm;