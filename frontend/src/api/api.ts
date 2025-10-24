import axios from "axios";

const api = axios.create({
  baseURL: "https://aiventure-r36z.onrender.com/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export const generateItinerary = async (data: any) => {
  const res = await api.post("/itenary", data);
  return res.data.itinerary;
};