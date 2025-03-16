import type { Request } from "express";
import type { Response } from "express";
import Webhook from "../models/webhook_model.js"; // Adjust the path as necessary
import * as webhook_service from "../services/webhook_service.js";
import { register } from "module";

export async function getAllWebhooksHandler(req: Request, res: Response) {
  try {
    const { page_size = "10", offset = "0" } = req.query as {
      page_size: string;
      offset: string;
    };

    const webhooks = await webhook_service.getAllWebhooks(
      Number(page_size),
      Number(offset)
    );
    res.status(200).json(webhooks);
  } catch (error) {
    console.error("Error fetching webhooks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getWebhooksByEventNameHandler(
  req: Request,
  res: Response
) {
  try {
    const { eventName } = req.params;

    const webhooks = await webhook_service.getWebhooksByEventName(eventName);

    if (webhooks.length === 0) {
      res.status(404).json({ message: "No webhooks found for this event" });
    }
    console.log("******",webhooks);

    res.status(200).json({
      eventName,
      webhookUrls: webhooks.map((wh) => wh.dataValues.webhookUrl),
    });
  } catch (error) {
    console.error("Error fetching webhooks by event name:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function registerWebhookHandler(req: Request, res: Response) {
  try {
    const { webhookUrl, eventName } = req.body as {
      webhookUrl: string;
      eventName: string;
    };

    if (!webhookUrl || !eventName) {
      res.status(400).json({ message: "webhookUrl and eventName are required" });
      return;
    }

    const newWebhook = await webhook_service.registerWebhook(webhookUrl, eventName);

    res.status(201).json(newWebhook);
  } catch (error) {
    console.error("Error adding webhook:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function triggerEventHandler(req: Request, res: Response) {
  const { eventName } = req.params;
  const payload = req.body; 

  try {
    const triggered = await webhook_service.triggerEvent(eventName, payload);

    if (!triggered) {
      res.status(404).json({ message: "No webhooks registered for this event" });
    }
    
    res.status(200).json({ message: "Event triggered and messages queued for delivery" });
  } catch (error) {
    console.error("Error triggering event:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}




