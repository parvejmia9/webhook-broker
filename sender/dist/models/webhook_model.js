import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
class Webhook extends Model {
    id;
    eventName;
    webhookUrl;
}
Webhook.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    eventName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    webhookUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "Webhook",
    tableName: "webhooks",
    timestamps: true,
});
export default Webhook;
