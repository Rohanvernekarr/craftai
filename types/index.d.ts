// Text generation
export interface TextRequest {
    prompt: string;
  }
  export interface TextResponse {
    text?: string;
    error?: string;
  }
  
  // Image generation
  export interface ImageRequest {
    prompt: string;
  }
  export interface ImageResponse {
    image?: string; // base64
    error?: string;
  }