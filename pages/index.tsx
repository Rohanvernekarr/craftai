import React, { useState } from "react";
import PromptForm from "../components/PromptForm";

const Home: React.FC = () => {
  // Text generation state
  const [textLoading, setTextLoading] = useState(false);
  const [textResult, setTextResult] = useState<string | undefined>();
  const [textError, setTextError] = useState<string | undefined>();

  // Image generation state
  const [imageLoading, setImageLoading] = useState(false);
  const [imageResult, setImageResult] = useState<string | undefined>();
  const [imageError, setImageError] = useState<string | undefined>();

  const handleTextSubmit = async (prompt: string) => {
    setTextLoading(true);
    setTextResult(undefined);
    setTextError(undefined);
    try {
      const res = await fetch("/api/generateText", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      setTextResult(data.text);
    } catch (err: any) {
      setTextError(err.message || "Failed to generate text.");
    } finally {
      setTextLoading(false);
    }
  };

  const handleImageSubmit = async (prompt: string) => {
    setImageLoading(true);
    setImageResult(undefined);
    setImageError(undefined);
    try {
      const res = await fetch("/api/generateImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      setImageResult(data.image);
    } catch (err: any) {
      setImageError(err.message || "Failed to generate image.");
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center py-12">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-2">CraftAI</h1>
      <p className="text-lg text-gray-600 mb-8">
        Generate text and images with the Hugging Face Inference API.
      </p>
      <PromptForm
        label="Text Generation"
        placeholder="Enter a prompt for text (e.g. 'Once upon a time...')"
        onSubmit={handleTextSubmit}
        loading={textLoading}
        result={textResult}
        resultType="text"
        error={textError}
      />
      <PromptForm
        label="Image Generation"
        placeholder="Enter a prompt for an image (e.g. 'A futuristic cityscape at sunset')"
        onSubmit={handleImageSubmit}
        loading={imageLoading}
        result={imageResult}
        resultType="image"
        error={imageError}
      />
      <footer className="mt-12 text-gray-400 text-sm">
        Powered by Next.js, Tailwind CSS, and Hugging Face
      </footer>
    </div>
  );
};

export default Home;