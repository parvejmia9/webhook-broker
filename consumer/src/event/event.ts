import axios from "axios";

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function UploadImage(url: string, payload: any, retries = 5, baseDelay = 1000) {
  let attempt = 0;

  while (attempt < retries) {
    try {
      const response = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Response from the server:", response.data);
      return response.data;
    } catch (error) {
      attempt++;
      console.error(`Attempt ${attempt} failed:`, error);

      if (attempt >= retries) {
        console.error("Max retries reached. Failing permanently.");
        throw new Error((error as Error).message);
      }

      const delay = baseDelay * Math.pow(2, attempt); // Exponential backoff
      console.log(`Retrying in ${delay}ms...`);
      await sleep(delay);
    }
  }
}
