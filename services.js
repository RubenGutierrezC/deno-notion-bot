import axios from "axios";
import { SERVER_URL } from "./config.mjs";

const http = axios.create({
  baseURL: `${SERVER_URL}/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const addItem = ({ title = "" }) => {
  return http.post("/add-item", { title });
};
