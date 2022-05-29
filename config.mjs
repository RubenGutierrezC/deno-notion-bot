import { config } from "dotenv";

config();

export const SERVER_URL = process.env.SERVER_URL;
export const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN;
