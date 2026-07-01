import { Link } from "react-router";
import { CheckCircle2, CalendarPlus, Home } from "lucide-react";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import { BookingProgress } from "./BookingProgress";
import { useBookingStore } from "../../store/bookingStore";
import { useQuery } from "@tanstack/react-query";
import { fetchServices, fetchBarbers } from "../../api/client";

export function Confirmation() {
  const serviceId = useBookingStore((state) => state.serviceId);
  const barberId = useBookingStore((state) => state.barberId);
  const date = useBookingStore((state) => state.date);
  const time = useBookingStore((state) => state.time);
  
  const { data: services = [] } = useQuery({ queryKey: ["services"], queryFn: fetchServices });
  const { data: barbers = [] } = useQuery({ queryKey: ["barbers"], queryFn: fetchBarbers });

  const selectedService = services.find((s: any) => s.id === serviceId);
  const selectedBarber = barbers.find((b: any) => b.id === barberId);
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#23402B', '#E9E6DF', '#1E1E1E']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#23402B', '#E9E6DF', '#1E1E1E']
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
      
      <div className="mb-12">
        <BookingProgress currentStep={5} />
      </div>

      <div className="text-center">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-12 h-12 text-primary" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Booking Confirmed!</h1>
        <p className="text-muted-foreground text-lg mb-10 max-w-sm mx-auto">
          You're all set for your appointment with {selectedBarber?.name || "your barber"}. We've sent the details to your phone.
        </p>

        <div className="bg-card border border-border rounded-3xl p-8 mb-10 text-left shadow-sm">
          <h2 className="font-semibold text-lg mb-6 border-b border-border pb-4">Appointment Details</h2>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Service</p>
              <p className="font-medium text-lg">{selectedService?.name || "Service"}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Date</p>
                <p className="font-medium">{date || "TBD"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Time</p>
                <p className="font-medium">{time || "TBD"}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-1">Location</p>
              <p className="font-medium">Trimly Studio<br />123 Barber Street, NY 10001</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="flex items-center justify-center gap-2 px-8 py-3.5 bg-secondary text-foreground font-medium rounded-xl hover:bg-muted transition-colors">
            <CalendarPlus className="w-5 h-5" />
            Add to Calendar
          </button>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Home className="w-5 h-5" />
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
