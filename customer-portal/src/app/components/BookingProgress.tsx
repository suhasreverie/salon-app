import { Check } from "lucide-react";

interface BookingProgressProps {
  currentStep: number;
}

export function BookingProgress({ currentStep }: BookingProgressProps) {
  const steps = ["Service", "Barber", "Time", "Review", "Confirm"];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        {/* Connecting lines */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -z-10 -translate-y-1/2" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-primary -z-10 -translate-y-1/2 transition-all duration-500" 
          style={{ width: `${(Math.min(currentStep - 1, steps.length - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={step} className="flex flex-col items-center gap-2 bg-background px-2">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors ${
                  isCompleted 
                    ? "bg-primary border-primary text-primary-foreground" 
                    : isCurrent 
                      ? "bg-background border-primary text-primary" 
                      : "bg-background border-border text-muted-foreground"
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : stepNumber}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${
                isCurrent ? "text-foreground" : "text-muted-foreground"
              }`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
