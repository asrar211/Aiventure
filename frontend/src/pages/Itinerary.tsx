import { Cards } from "@/components/Itenary/Cards";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Itinerary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const itinerary = (location.state as any)?.itinerary;
  const [openDay, setOpenDay] = useState<number | null>(null);
  console.log(itinerary)

  const handleToggle = (idx: number) => {
    setOpenDay(openDay === idx ? null : idx);
  }

  if (!itinerary) {
    return (
      <div className="p-5">
        <p>No itinerary found. Please create one first.</p>
        <button onClick={() => navigate("/")} className="mt-2 p-2 bg-blue-500 text-white rounded">Go Back</button>
      </div>
    );
  }

  return (
    <>
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-rose-800 to-amber-200">Location: {itinerary.location}</h1>
      <p className="text-rose-700  text-sm font-light">Total Days: {itinerary.days.length}</p>
    </div>
    {itinerary.days.map((day: any, idx: number) => (
      <div key={idx} className="flex flex-col">
        <button className="w-[20%] mx-auto bg-amber-200 text-rose-700 my-1 py-2 rounded-md text-sm cursor-pointer" onClick={() => handleToggle(idx)}>{day.day}</button>
        {openDay === idx && (
          <Cards day={day}/>
        )}
        </div>
    ))}
    </>
  );
};
