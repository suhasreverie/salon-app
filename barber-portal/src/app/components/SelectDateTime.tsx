import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import { format, addDays } from "date-fns";
import { BookingProgress } from "./BookingProgress";

export function SelectDateTime() {
  const navigate = useNavigate();
  const today = new Date();
  
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const dates = Array.from({ length: 14 }).map((_, i) => addDays(today, i));

  const times = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM"
  ];

  const unavailableTimes = ["10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-secondary transition-colors -ml-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-semibold">Date & Time</h1>
      </div>

      <BookingProgress currentStep={3} />

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium mb-4">Select Date</h2>
          <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar">
            {dates.map((date) => {
              const isSelected = format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
              return (
                <button
                  key={date.toISOString()}
                  onClick={() => setSelectedDate(date)}
                  className={`flex-shrink-0 flex flex-col items-center justify-center w-[72px] h-[88px] rounded-2xl border-2 transition-all ${
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground shadow-md"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <span className={`text-xs font-medium uppercase ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {format(date, 'EEE')}
                  </span>
                  <span className="text-2xl font-bold mt-1">
                    {format(date, 'd')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-4">Available Slots</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {times.map((time) => {
              const isUnavailable = unavailableTimes.includes(time);
              const isSelected = selectedTime === time;

              return (
                <button
                  key={time}
                  onClick={() => !isUnavailable && setSelectedTime(time)}
                  disabled={isUnavailable}
                  className={`py-3 px-2 rounded-xl text-sm font-medium transition-all border-2 ${
                    isUnavailable
                      ? "opacity-50 cursor-not-allowed bg-secondary/50 border-transparent text-muted-foreground line-through"
                      : isSelected
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-border flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="text-muted-foreground font-medium hover:text-foreground">
          Back
        </button>
        <Link
          to={selectedTime ? "/book/review" : "#"}
          className={`px-8 py-3.5 rounded-xl font-semibold transition-all ${
            selectedTime
              ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
              : "bg-secondary text-muted-foreground cursor-not-allowed"
          }`}
          onClick={(e) => !selectedTime && e.preventDefault()}
        >
          Review Booking
        </Link>
      </div>
    </div>
  );
}
