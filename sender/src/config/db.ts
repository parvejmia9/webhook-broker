import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || '',
  process.env.DB_USER || '',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    dialect: "postgres",
    logging: console.log, 
    dialectOptions: {
      ssl: false,
    },
  }
);
console.log( ".........",process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS)
export default sequelize;
