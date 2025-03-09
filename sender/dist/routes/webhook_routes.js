import express from "express";
import { registerWebhookHandler, getAllWebhooksHandler, getWebhooksByEventNameHandler } from "../controllers/webhook_controller.js";
const webhookRoutes = express.Router();
// Ensure proper route definitions
webhookRoutes.post("/webhooks", registerWebhookHandler); // Register webhook (presumably for adding new webhooks)
webhookRoutes.get("/webhooks", getAllWebhooksHandler); // Get all webhooks (with pagination)
webhookRoutes.get("/webhooks/:eventName", getWebhooksByEventNameHandler); // Get webhooks by event name
webhookRoutes.get("/", (req, res) => {
    res.send("Webhook service is running");
});
export default webhookRoutes;
