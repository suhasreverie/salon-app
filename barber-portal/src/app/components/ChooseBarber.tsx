import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeft, Star, Check } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BookingProgress } from "./BookingProgress";

export function ChooseBarber() {
  const navigate = useNavigate();
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);

  const barbers = [
    {
      id: "david",
      name: "David",
      exp: "8 yrs exp",
      rating: "4.9",
      reviews: "124",
      image: "https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWxlJTIwYmFyYmVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzgxNzg4MzY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      available: true,
    },
    {
      id: "sarah",
      name: "Sarah",
      exp: "5 yrs exp",
      rating: "4.8",
      reviews: "98",
      image: "https://images.unsplash.com/photo-1659355750609-7f3d2c912c3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB5b3VuZyUyMGZlbWFsZSUyMGJhcmJlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc4MTc4ODM2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      available: true,
    },
    {
      id: "marcus",
      name: "Marcus",
      exp: "3 yrs exp",
      rating: "4.7",
      reviews: "56",
      image: "https://images.unsplash.com/photo-1553521041-d168abd31de3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbGUlMjBiYXJiZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3ODE3ODgzNjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      available: false,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-secondary transition-colors -ml-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-semibold">Choose Barber</h1>
      </div>

      <BookingProgress currentStep={2} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div
            onClick={() => setSelectedBarber("anyone")}
            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center h-[200px] relative overflow-hidden ${
              selectedBarber === "anyone"
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border bg-card hover:border-primary/30"
            }`}
          >
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="font-semibold text-lg">Anyone Available</h3>
            <p className="text-sm text-muted-foreground mt-1">Get the earliest slot</p>
            {selectedBarber === "anyone" && (
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
            )}
        </div>

        {barbers.map((barber) => (
          <div
            key={barber.id}
            onClick={() => barber.available && setSelectedBarber(barber.id)}
            className={`relative p-5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center h-[200px] overflow-hidden ${
              !barber.available
                ? "opacity-60 cursor-not-allowed bg-secondary/50 border-transparent"
                : selectedBarber === barber.id
                ? "border-primary bg-primary/5 shadow-sm cursor-pointer"
                : "border-border bg-card hover:border-primary/30 cursor-pointer"
            }`}
          >
            {!barber.available && (
              <span className="absolute top-3 right-3 text-xs font-medium bg-background px-2 py-1 rounded text-muted-foreground">
                Off today
              </span>
            )}
            {selectedBarber === barber.id && (
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
            )}
            
            <ImageWithFallback
              src={barber.image}
              alt={barber.name}
              className="w-16 h-16 rounded-full object-cover mb-3"
            />
            <h3 className="font-semibold text-lg">{barber.name}</h3>
            <p className="text-sm text-muted-foreground">{barber.exp}</p>
            <div className="flex items-center gap-1 mt-2 text-sm">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-medium">{barber.rating}</span>
              <span className="text-muted-foreground">({barber.reviews})</span>
            </div>
            
            <Link 
              to={`/barber/${barber.id}`} 
              className="absolute bottom-3 text-xs font-medium text-primary hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              View Profile
            </Link>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-border flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="text-muted-foreground font-medium hover:text-foreground">
          Back
        </button>
        <Link
          to={selectedBarber ? "/book/datetime" : "#"}
          className={`px-8 py-3.5 rounded-xl font-semibold transition-all ${
            selectedBarber
              ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
              : "bg-secondary text-muted-foreground cursor-not-allowed"
          }`}
          onClick={(e) => !selectedBarber && e.preventDefault()}
        >
          Select Time
        </Link>
      </div>
    </div>
  );
}
