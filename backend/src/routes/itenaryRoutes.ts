import { Router } from "express";
import { generateItinerary } from "../controllers/itineraryController";
import { dailyRequestLimiter } from "../middlewares/dailyRate";

const router = Router();

router.post("/", dailyRequestLimiter, generateItinerary);

export default router;
