import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { ChevronLeft, Check } from "lucide-react";
import { BookingProgress } from "./BookingProgress";

export function SelectService() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  useEffect(() => {
    const preselected = searchParams.get("selected");
    if (preselected) {
      setSelectedService(preselected);
    }
  }, [searchParams]);

  const services = [
    { id: "haircut", name: "Haircut", price: "$40", duration: "45m", desc: "Classic or modern haircut tailored to you." },
    { id: "beard", name: "Beard Trim", price: "$25", duration: "30m", desc: "Detailed trim, shape, and hot towel finish." },
    { id: "combo", name: "Haircut + Beard", price: "$60", duration: "1h 15m", desc: "The full package. Haircut and premium beard trim." },
    { id: "spa", name: "Hair Spa", price: "$35", duration: "30m", desc: "Relaxing scalp massage and deep conditioning." },
  ];

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
        {services.map((service) => (
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
              <p className="text-sm text-muted-foreground mb-3">{service.desc}</p>
              <div className="flex items-center gap-3 text-sm font-medium">
                <span className="bg-secondary px-2.5 py-1 rounded-md">{service.duration}</span>
                <span>{service.price}</span>
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
