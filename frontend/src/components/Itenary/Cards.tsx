import { motion, AnimatePresence } from "motion/react";

export const Cards = ({ day }: { day: any }) => {
  return (
    <div className="md:max-w-7xl md:mx-auto mx-2">
      <AnimatePresence>
      <motion.div
        key={day.day}
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-amber-200  rounded-xl p-4 mt-3 shadow-md shadow-rose-200 backdrop-blur-lg"
      >
        <h2 className="text-lg font-semibold text-rose-700 mb-2">{day.day}</h2>
        <p className="text-sm text-rose-600 mb-3">{day.date}</p>

        <div className="space-y-4 text-sm text-rose-700">
          {["morning", "afternoon", "evening"].map((time) => (
            <div key={time} className="bg-amber-300/70 p-3 rounded-lg shadow-xl">
              <h3 className="font-bold capitalize text-rose-700">{time}</h3>
              <p><span className="text-rose-600">Activities:</span> {day.schedule[time].activities.join(", ")}</p>
              <p><span className="text-rose-600">Restaurants:</span> {day.schedule[time].restaurants.join(", ")}</p>
              <p><span className="text-rose-600">Sightseeing:</span> {day.schedule[time].sightseeing.join(", ")}</p>
            </div>
          ))}

          {day.tips && (
            <p className="mt-2 italic text-rose-800 bg-amber-300/70 p-2 rounded-lg">
               {day.tips}
            </p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
    </div>
  );
};
