import { Request, Response } from "express";
import { getItineraryFromGPT, ItineraryInput, ItineraryOutput } from "../services/openai";

export const generateItinerary = async (req: Request, res: Response) => {
  try {
    const { location, preferences, dates, groupSize } = req.body;

    if (!location || !preferences || !dates || !dates.start || !dates.end) {
      return res.status(400).json({ error: "Missing required fields: location, preferences, or dates" });
    }

    const input: ItineraryInput = {
      location,
      preferences,
      dates,
      groupSize,
    };

    const itinerary: ItineraryOutput = await getItineraryFromGPT(input);

    return res.status(200).json({ itinerary });

  } catch (error: any) {
    console.error("Error generating itinerary:", error);
    return res.status(500).json({ error: "Failed to generate itinerary. " + error.message });
  }
};
