import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export const Input = () => {
  return (
    <div className="relative bg-slate-950 h-screen w-full">
        <div className="bg-white blur-[250px] absolute h-50 w-50 rounded-full top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"></div>
        <div className="flex justify-center items-center h-screen">
  <form className="flex flex-col text-gray-400 gap-2 p-10 bg-slate-950 rounded-xl z-50 border border-gray-700">
    <label htmlFor="location" className="text-[13px] font-light">Location</label>
    <input 
      className="w-[260px] px-2 py-1.5 rounded-md bg-black border border-gray-700 outline-none placeholder:text-[13px] hover:border-gray-500 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500"
      type="text" 
      name="location" 
      id="location" 
      placeholder="Srinagar" 
    />

    <label htmlFor="prefrences" className="text-[13px] font-light mt-3">Your Prefrences</label>
    <input 
      className="w-[260px] px-2 py-1.5 rounded-md bg-black border border-gray-700 outline-none placeholder:text-[13px] hover:border-gray-500 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500"
      type="text" 
      name="prefrences" 
      id="prefrences" 
      placeholder="Food, Culture ..." 
    />

    <div className="flex gap-1">
      <DropCalendar dateName="Start Date"/>
    <DropCalendar dateName="End Date"/>
    </div>

    <label htmlFor="group" className="text-[13px] font-light mt-3">Group Size</label>
    <input 
      className="w-[260px] px-2 py-1.5 rounded-md bg-black border border-gray-700 outline-none placeholder:text-[13px] text-gray-400 hover:border-gray-500 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      type="number" 
      name="group" 
      id="group" 
      min="1"
      placeholder="1" 
      onWheel={(e) => e.target.blur()}
    />

    <button className="mt-3 bg-blue-600 p-2 rounded text-white hover:bg-blue-700">
      Generate Itinerary
    </button>
  </form>
</div>

    </div>
  )
}


function DropCalendar ({dateName}: {dateName: string}) {
      const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  return (

    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="mt-1 w-32 px-2 py-1.5 rounded-md bg-black border border-gray-700 text-[13px] text-gray-600 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : dateName}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0 bg-black text-gray-600" align="start">
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