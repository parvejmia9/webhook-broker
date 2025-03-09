import Webhook from "../models/webhook_model.js";

export async function getAllWebhooks(page_size: number, offset: number) {
  try {
    const webhooks = await Webhook.findAll({
      limit: Number(page_size),
      offset: Number(offset),
    });
    return webhooks;
  } catch (error) {
    console.error("Error fetching webhooks:", error);
    throw new Error("Failed to fetch webhooks"); 
  }
}

export async function getWebhooksByEventName(eventName: string) {
  try {
    const webhooks = await Webhook.findAll({ where: { eventName } });
    return webhooks;
  } catch (error) {
    console.error("Error fetching webhooks by event name:", error);
    throw new Error("Failed to fetch webhooks by event name");
  }
}

export async function registerWebhook(webhookUrl: string, eventName: string) {
  try {
    const newWebhook = await Webhook.create({ webhookUrl, eventName });
    return newWebhook;
  } catch (error) {
    console.error("Error adding webhook:", error);
    throw new Error("Failed to add webhook");
  }
}
