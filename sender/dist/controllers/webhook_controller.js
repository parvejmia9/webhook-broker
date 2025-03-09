import Webhook from "../models/webhook_model.js"; // Adjust the path as necessary
import * as webhook_service from "../services/webhook_service.js";
import { register } from "module";
export async function getAllWebhooksHandler(req, res) {
    try {
        const { page_size = "10", offset = "0" } = req.query;
        const webhooks = await webhook_service.getAllWebhooks(Number(page_size), Number(offset));
        res.status(200).json(webhooks);
    }
    catch (error) {
        console.error("Error fetching webhooks:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export async function getWebhooksByEventNameHandler(req, res) {
    try {
        const { eventName } = req.params;
        const webhooks = await webhook_service.getWebhooksByEventName(eventName);
        if (webhooks.length === 0) {
            res.status(404).json({ message: "No webhooks found for this event" });
        }
        console.log("******", webhooks);
        res.status(200).json({
            eventName,
            webhookUrls: webhooks.map((wh) => wh.dataValues.webhookUrl),
        });
    }
    catch (error) {
        console.error("Error fetching webhooks by event name:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export async function registerWebhookHandler(req, res) {
    try {
        const { webhookUrl, eventName } = req.body;
        if (!webhookUrl || !eventName) {
            res.status(400).json({ message: "webhookUrl and eventName are required" });
            return;
        }
        const newWebhook = await webhook_service.registerWebhook(webhookUrl, eventName);
        res.status(201).json(newWebhook);
    }
    catch (error) {
        console.error("Error adding webhook:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
