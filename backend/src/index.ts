import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import itineraryRoutes from "./routes/itenaryRoutes";


const app = express();
app.use(cors({
  origin: ["http://localhost:5173", "https://aiventure-nine.vercel.app"],
  credentials: true,
}));


app.use(express.json());

app.use("/api/itinerary", itineraryRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("AI Travel Planner Backend Running");
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
