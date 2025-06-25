import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt } = req.body;
  // Dummy response for now:
  res.status(200).json({ text: `You wrote: ${prompt}` });
}
