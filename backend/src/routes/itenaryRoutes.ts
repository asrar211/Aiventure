import { Router } from "express";
import { generateItenary } from "../controllers/itenaryController";
import { dailyRequestLimiter } from "../middlewares/dailyRate";

const router = Router();

router.post("/", dailyRequestLimiter, generateItenary);

export default router;
