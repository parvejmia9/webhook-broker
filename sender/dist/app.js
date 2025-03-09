import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import webhookRoutes from "./routes/webhook_routes.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use("/api", webhookRoutes);
const PORT = process.env.SERVER_PORT || 5000;
console.log("PORT:", PORT);
sequelize
    .sync()
    .then(() => {
    console.log("Database connected and synced.");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((err) => console.error("***Database connection failed:", err));
