import amqp from "amqplib";
import dotenv from "dotenv";

import { UploadImage } from "../event/event.js";

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
const QUEUE_NAME = process.env.QUEUE_NAME || "uploadImage";

export interface UploadMessagePayload {
  id: string;
  url: string;
  name: string;
  description: string;
  tags: string[];
  metadata: {
    dimensions: {
      width: number;
      height: number;
    };
    format: string;
    size_in_bytes: number;
    created_at: string;
    updated_at: string;
  };
  related_entities: {
    album_id: string;
    user_id: string;
  };
  is_public: boolean;
}
interface UploadMessage {
  url: string;
  payload: UploadMessagePayload;
}

async function startReceiver() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });

    console.log(`Waiting for messages in queue '${QUEUE_NAME}'...`);

    channel.consume(
      QUEUE_NAME,
      async (msg) => {
        if (!msg) return;

        const content = msg.content.toString();
        const message: UploadMessage = JSON.parse(content);

        console.log(`Received message:`, message);

        try {
          
          const res = await UploadImage(message.url, message.payload);
          console.log(`POST request successful:`, res);
          channel.ack(msg);
        } catch (error) {
          console.error(`Error making POST request:`, error);
          //channel.ack(msg);
          channel.nack(msg, false, true); // Requeue the message
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error("Error in receiver:", error);
  }
}

startReceiver();
