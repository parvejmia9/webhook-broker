import Webhook from "../models/webhook_model.js";
import { sendMessage } from "../rabbitmq/rabbitmq_conf.js";

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

export async function triggerEvent(eventName: string, payload: any) {  
  try {  
    // Fetch all webhooks for the given eventName  
    const webhooks = await Webhook.findAll({ where: { eventName } });  

    if (!webhooks || webhooks.length === 0) {  
      return false; // No webhooks registered for this event  
    }  

    // Publish each webhook event to RabbitMQ  
    for (const webhook of webhooks) {  
      const webhookUrl = webhook.dataValues.webhookUrl;  
      const message = { url: webhookUrl, payload };  
      console.log(webhookUrl);
      await sendMessage(message);  
    }  

    return true;  
  } catch (error) {  
    console.error("Error triggering event:", error);  
    throw new Error("Failed to trigger event");  
  }  
}