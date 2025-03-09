import axios from "axios";

export async function UploadImage(url: string, payload: any) {
  try {
    const response = await axios.post(url, payload, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Response from the server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in consumer:", error);
    throw new Error((error as Error).message);
  }
}