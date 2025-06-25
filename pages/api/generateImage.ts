import type { NextApiRequest, NextApiResponse } from "next";
import { generateImage } from "../../lib/huggingface";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { prompt } = req.body;
    const resp = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!resp.ok) {
      throw new Error(`Error: ${await resp.text()}`);
    }

    const buffer = await resp.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    res.status(200).json({ image: `data:image/png;base64,${base64Image}` });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}