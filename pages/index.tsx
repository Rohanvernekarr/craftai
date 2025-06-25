import PromptForm from "@/components/PromptForm";
import { useState } from "react";

export default function Home() {
  const [textResult, setTextResult] = useState("");
  const [imageResult, setImageResult] = useState("");
  const [loadingText, setLoadingText] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  async function generateText(prompt: string) {
    setLoadingText(true);
    const resp = await fetch("/api/generateText", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await resp.json();
    setTextResult(data.text);
    setLoadingText(false);
  }

  async function generateImage(prompt: string) {
    setLoadingImage(true);
    const resp = await fetch("/api/generateImage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await resp.json();
    setImageResult(data.image);
    setLoadingImage(false);
  }

  return (
    <main className="p-8 max-w-xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">PromptCraft</h1>

      <div>
        <h2 className="text-xl mb-2">Generate Text</h2>
        <PromptForm onSubmit={generateText} loading={loadingText} />
        {textResult && <p className="mt-2 p-2 border">{textResult}</p>}
      </div>

      <div>
        <h2 className="text-xl mb-2">Generate Image</h2>
        <PromptForm onSubmit={generateImage} loading={loadingImage} />
        {imageResult && <img title="image" src={imageResult} className="mt-2 border" />}
      </div>
    </main>
  );
}