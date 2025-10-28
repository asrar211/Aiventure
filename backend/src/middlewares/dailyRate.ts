import rateLimit from "express-rate-limit";
import { Request } from "express";

export const dailyRequestLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 1,
  message: {
    error: "You have already generated an itinerary today. Please try again tomorrow."
  },
  keyGenerator: (req: Request) => {
    const ipSource = req.ip ?? req.headers["x-forwarded-for"] ?? req.socket?.remoteAddress ?? "";
    return String(ipSource);
  }
});
