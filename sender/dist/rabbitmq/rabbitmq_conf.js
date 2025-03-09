import amqp from "amqplib";
import dotenv from "dotenv";
dotenv.config();
const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
const QUEUE_NAME = process.env.QUEUE_NAME || "uploadImage";
export async function sendMessage(message) {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, { durable: true });
        channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)), {
            persistent: true,
        });
        console.log(`📤 Sent message to queue '${QUEUE_NAME}':`, message);
        setTimeout(() => {
            connection.close();
        }, 500);
    }
    catch (error) {
        console.error("Error in sender:", error);
    }
}
const messagePayload = {
    id: "123456",
    url: "https://example.com/images/sample.jpg",
    name: "sample_image",
    description: "A sample image for demonstration purposes",
    tags: ["sample", "image", "demo"],
    metadata: {
        dimensions: {
            width: 1920,
            height: 1080,
        },
        format: "jpeg",
        size_in_bytes: 204800,
        created_at: "2024-12-23T12:00:00Z",
        updated_at: "2024-12-23T12:00:00Z",
    },
    related_entities: {
        album_id: "7890",
        user_id: "user_456",
    },
    is_public: true,
};
const message = {
    url: "https://eocwrsoyaqdawk4.m.pipedream.net",
    payload: messagePayload,
};
sendMessage(message);
