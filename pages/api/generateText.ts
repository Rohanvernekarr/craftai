import type { NextApiRequest, NextApiResponse } from "next";
import type { TextRequest, TextResponse } from "../../types";
import { generateGeminiText } from "../../lib/gemini";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TextResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { prompt } = req.body as TextRequest;
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Prompt is required" });
  }
  try {
    const text = await generateGeminiText(prompt);
    res.status(200).json({ text });
  } catch (error: any) {
    res.status(500).json({
      error:
        error?.message ||
        "Failed to generate text. Please try again later.",
    });
  }
}
