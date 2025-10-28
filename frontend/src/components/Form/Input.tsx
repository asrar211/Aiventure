import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { generateItinerary } from "@/api/api"
import { useNavigate } from "react-router-dom"

export const Input = () => {
  const [location, setLocation] = useState<string>("");
  const [preferences, setPreferences] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [groupSize, setGroupSize] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!location || !preferences || !startDate || !endDate) {
      alert("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const itinerary = await generateItinerary({
        location,
        preferences,
        dates: {
          start: startDate.toISOString().split("T")[0],
          end: endDate.toISOString().split("T")[0],
        },
        groupSize,
      });

      navigate("/itinerary", { state: { itinerary } });
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to generate itinerary");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="relative bg-amber-200 max-[768px]:bg-linear-to-b from-amber-200  h-screen w-full">
        <div className="bg-black blur-[250px] absolute h-80 w-80 rounded-full top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"></div>
        <div className="flex justify-center items-center h-screen">
  <form onSubmit={handleSubmit} className="flex flex-col text-black gap-2 p-10 bg-amber-300 rounded-xl z-50 shadow-xl shadow-rose-500">
    <label htmlFor="location" className="text-[13px] font-light">Location</label>
    <input 
    value={location}
    onChange={(e) => setLocation(e.target.value)}
      className=" w-[260px] px-2 py-1.5 rounded-md bg-amber-400/70 shadow-md outline-none placeholder:text-[13px] text-[14px] font-light  transition-all duration-300 ease-in-out focus:ring-2 focus:ring-rose-700"
      type="text" 
      name="location" 
      id="location" 
      placeholder="Srinagar" 
    />

    <label htmlFor="prefrences" className="text-[13px] font-light mt-3">Your Prefrences</label>
    <input 
    value={preferences}
    onChange={(e) => setPreferences(e.target.value)}
      className=" w-[260px] px-2 py-1.5 rounded-md bg-amber-400/70 shadow-md outline-none placeholder:text-[13px] text-[14px] font-light  transition-all duration-300 ease-in-out focus:ring-2 focus:ring-rose-700"
      type="text" 
      name="prefrences" 
      id="prefrences" 
      placeholder="e.g Food, Culture ..." 
    />

    <div className="flex gap-1">
      <DropCalendar dateName="Start Date" date={startDate} setDate={setStartDate}/>
    <DropCalendar dateName="End Date" date={endDate} setDate={setEndDate}/>
    </div>

    <label htmlFor="group" className="text-[13px] font-light mt-3">Group Size</label>
    <input 
      value={groupSize}
      onChange={(e) => setGroupSize(Number(e.target.value))}
      className="w-[260px] font-light text-[14px] px-2 py-1.5 rounded-md shadow-md bg-amber-400/70  outline-none placeholder:text-[13px]  transition-all duration-300 ease-in-out focus:ring-2 focus:ring-amber-700 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      type="number" 
      name="group" 
      id="group" 
      min="1"
      placeholder="1" 
      onWheel={(e) => (e.target as HTMLInputElement).blur()}
    />

    <button className="mt-3 p-2 bg-rose-800 text-amber-200 rounded-md text-sm cursor-pointer">
      {loading ? "Generating..." : "Generate Itinerary"}
    </button>
  </form>
</div>

    </div>
  )
}

interface DropCalendarProps {
  dateName: string;
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}


export function DropCalendar({ dateName, date, setDate }: DropCalendarProps) {
  const [open, setOpen] = useState(false);

  return (

    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="mt-1 w-32 px-2 py-1.5 rounded-md bg-amber-400/70  text-[13px] text-rose-700 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-amber-700 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : dateName}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0 bg-amber-400 text-black" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}