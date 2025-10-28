import OpenAI from "openai";

export interface ItineraryInput {
  location: string;
  preferences: string;
  dates: { start: string; end: string };
  groupSize?: number;
}

export interface DayPlan {
  day: string;
  activities: string[];
  restaurants: string[];
  sightseeing: string[];
  images?: string[];
}

export interface ItineraryOutput {
  location: string;
  startDate: string;
  endDate: string;
  groupSize?: number;
  days: DayPlan[];
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const getItineraryFromGPT = async (input: ItineraryInput): Promise<ItineraryOutput> => {
  if (!input.location || !input.preferences || !input.dates.start || !input.dates.end) {
    throw new Error("Missing required fields: location, preferences, or dates");
  }

const prompt = `
You are an expert travel planner. Generate a **highly detailed, day-by-day travel itinerary**.
Requirements:

- Location: ${input.location}
- Dates: ${input.dates.start} to ${input.dates.end}
- Traveler preferences: ${input.preferences}
- Group size: ${input.groupSize || 1}
- Output **strictly JSON** in the following format:

{
  "location": "string",
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD",
  "groupSize": number,
  "days": [
    {
      "day": "Day X",
      "date": "YYYY-MM-DD",
      "schedule": {
        "morning": {
          "activities": ["string"],
          "restaurants": ["string"],
          "sightseeing": ["string"]
        },
        "afternoon": {...},
        "evening": {...}
      },
      "tips": "string",
    }
  ]
}

Include **multiple activities, restaurants, sightseeing spots per time block**.
Provide **travel tips** for each day.
Return valid JSON only, no extra text.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 1200,
    response_format: { type: "json_object" }
  });

  try {
  const rawContent = response.choices[0].message?.content || "{}";
  const itinerary: ItineraryOutput = JSON.parse(rawContent);
  return itinerary;
} catch (err) {
  console.error("Raw GPT output:", response.choices[0].message?.content);
  throw new Error("Failed to parse GPT response as JSON: " + err);
}
};
