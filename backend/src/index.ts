import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import itenaryRoutes from "./routes/itenaryRoutes";


const app = express();
app.use(
  cors({
    origin: "*", // Allow all origins (only for development/testing)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());

app.use("/api/itenary", itenaryRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("AI Travel Planner Backend Running");
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
