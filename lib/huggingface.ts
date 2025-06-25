export async function generateImage(prompt: string): Promise<string> {
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
      const error = await resp.text();
      throw new Error(`HF API Error: ${error}`);
    }
  
    // Get the image as a Blob
    const blob = await resp.blob();
    return URL.createObjectURL(blob); // This returns a browser blob URL
  }