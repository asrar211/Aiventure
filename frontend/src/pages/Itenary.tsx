import { useLocation, useNavigate } from "react-router-dom";

export const Itenary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const itinerary = (location.state as any)?.itinerary;

  if (!itinerary) {
    return (
      <div className="p-5">
        <p>No itinerary found. Please create one first.</p>
        <button onClick={() => navigate("/")} className="mt-2 p-2 bg-blue-500 text-white rounded">Go Back</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-5 p-5">
      <h1 className="text-2xl font-bold mb-4">{itinerary.location} Itinerary</h1>
      {itinerary.days.map((day: any, index: number) => (
        <div key={index} className="border p-4 mb-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">{day.day} - {day.date}</h2>
          {["morning", "afternoon", "evening"].map((time) => (
            <div key={time} className="mt-2">
              <h3 className="font-bold capitalize">{time}</h3>
              <p>Activities: {day.schedule[time].activities.join(", ")}</p>
              <p>Restaurants: {day.schedule[time].restaurants.join(", ")}</p>
              <p>Sightseeing: {day.schedule[time].sightseeing.join(", ")}</p>
              {day.images && day.images.length > 0 && (
                <div className="flex gap-2 mt-2 overflow-x-auto">
                  {day.images.map((img: string, idx: number) => (
                    <img key={idx} src={img} alt="Activity" className="w-32 h-24 object-cover rounded" />
                  ))}
                </div>
              )}
            </div>
          ))}
          {day.tips && <p className="mt-2 italic">Tips: {day.tips}</p>}
        </div>
      ))}
    </div>
  );
};
