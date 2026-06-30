import { Link, useNavigate } from "react-router";
import { ChevronLeft, Check } from "lucide-react";
import { BookingProgress } from "./BookingProgress";
import { useQuery } from "@tanstack/react-query";
import { fetchServices } from "../../api/client";
import { useBookingStore } from "../../store/bookingStore";

export function SelectService() {
  const navigate = useNavigate();
  const selectedService = useBookingStore((state) => state.serviceId);
  const setSelectedService = useBookingStore((state) => state.setService);

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices
  });

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-secondary transition-colors -ml-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-semibold">Select Service</h1>
      </div>

      <BookingProgress currentStep={1} />

      <div className="grid gap-4">
        {isLoading ? <p>Loading services...</p> : services.map((service: any) => (
          <div
            key={service.id}
            onClick={() => setSelectedService(service.id)}
            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between group ${
              selectedService === service.id
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border bg-card hover:border-primary/30"
            }`}
          >
            <div>
              <h3 className="font-semibold text-lg mb-1">{service.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
              <div className="flex items-center gap-3 text-sm font-medium">
                <span className="bg-secondary px-2.5 py-1 rounded-md">{service.duration_minutes}m</span>
                <span>${service.price}</span>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
              selectedService === service.id ? "border-primary bg-primary" : "border-muted-foreground/30 group-hover:border-primary/50"
            }`}>
              {selectedService === service.id && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-border flex justify-end">
        <Link
          to={selectedService ? "/book/barber" : "#"}
          className={`px-8 py-3.5 rounded-xl font-semibold transition-all ${
            selectedService
              ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
              : "bg-secondary text-muted-foreground cursor-not-allowed"
          }`}
          onClick={(e) => !selectedService && e.preventDefault()}
        >
          Continue to Barber
        </Link>
      </div>
    </div>
  );
}
