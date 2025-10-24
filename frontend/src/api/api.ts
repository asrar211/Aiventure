import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8009/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export const generateItinerary = async (data: any) => {
  const res = await api.post("/itenary", data);
  return res.data.itinerary;
};