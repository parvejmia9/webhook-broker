import express from "express";
import { registerWebhookHandler, getAllWebhooksHandler, getWebhooksByEventNameHandler, triggerEventHandler } from "../controllers/webhook_controller.js";
const webhookRoutes = express.Router();


webhookRoutes.post("/webhooks", registerWebhookHandler);  
webhookRoutes.get("/webhooks", getAllWebhooksHandler);  
webhookRoutes.get("/webhooks/:eventName", getWebhooksByEventNameHandler);
webhookRoutes.post("/trigger-event/:eventName", triggerEventHandler);
webhookRoutes.get("/", (req, res) => {
  res.send("Webhook service is running");
});
export default webhookRoutes;
