import type { NextApiRequest, NextApiResponse } from "next";
import { generateImage } from "../../lib/huggingface";
import type { ImageRequest, ImageResponse } from "../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ImageResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { prompt } = req.body as ImageRequest;
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Prompt is required" });
  }
  try {
    const image = await generateImage(prompt);
    res.status(200).json({ image });
  } catch (error: any) {
    res.status(500).json({
      error:
        error?.message ||
        "Failed to generate image. Please try again later.",
    });
  }
}