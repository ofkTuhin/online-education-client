import axios from "axios";
const Token = process.env.NEXT_PUBLIC_TOKEN;
export const Axios = axios.create({
  baseURL: "http://localhost:5000/api/",
  // "http://localhost:4001/",
  // "https://test-db-sl6v.vercel.app/",
  headers: {
    authorization: `Bearer ${Token}`,
  },
});
