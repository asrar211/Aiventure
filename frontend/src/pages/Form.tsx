import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateItinerary } from "../api/api";

export const Form = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [preferences, setPreferences] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [groupSize, setGroupSize] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const itinerary = await generateItinerary({
        location,
        preferences,
        dates: { start: startDate, end: endDate },
        groupSize
      });

      // Navigate to itinerary page with state
      navigate("/itenary", { state: { itinerary } });
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to generate itinerary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-5 border rounded-lg shadow">
      <h1 className="text-xl font-bold mb-4">AI Travel Planner</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required className="p-2 border rounded" />
        <input type="text" placeholder="Preferences (e.g., food, culture)" value={preferences} onChange={e => setPreferences(e.target.value)} required className="p-2 border rounded" />
        <div className="flex gap-2">
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required className="p-2 border rounded flex-1" />
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required className="p-2 border rounded flex-1" />
        </div>
        <input type="number" min={1} value={groupSize} onChange={e => setGroupSize(Number(e.target.value))} placeholder="Group Size" className="p-2 border rounded" />
        <button type="submit" disabled={loading} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {loading ? "Generating..." : "Generate Itinerary"}
        </button>
      </form>
    </div>
  );
};
