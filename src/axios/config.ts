import axios from "axios";

const envApi = process.env.NEXT_PUBLIC_API_URL;

if (!envApi) throw new Error("NEXT_PUBLIC_API_URL is not defined");

export const api = axios.create({
  baseURL: envApi,
});
