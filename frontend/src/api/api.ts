import axios from "axios";

const api = axios.create({
  baseURL: "https://aiventure-2phs.onrender.com/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export const generateItinerary = async (data: any) => {
  const res = await api.post("/itinerary", data);
  return res.data.itinerary;
};

// 