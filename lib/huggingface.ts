const HF_API_KEY = process.env.HF_API_KEY;

if (!HF_API_KEY) {
  throw new Error("Hugging Face API key (HF_API_KEY) is not set in environment variables.");
}

export async function generateText(prompt: string): Promise<string> {
  const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: prompt }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Hugging Face API error: ${error}`);
  }

  const data = await response.json();
  if (!Array.isArray(data) || !data[0]?.generated_text) {
    throw new Error("Unexpected response from Hugging Face API.");
  }
  return data[0].generated_text as string;
}

export async function generateImage(prompt: string): Promise<string> {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Hugging Face API error: ${error}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.startsWith("application/json")) {
    const data = await response.json();
    throw new Error(data.error || "Failed to generate image.");
  }

  // The response is a binary image (PNG)
  const buffer = await response.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  return base64;
}