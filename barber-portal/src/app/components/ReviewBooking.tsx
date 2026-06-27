import { Link, useNavigate } from "react-router";
import { ChevronLeft, Scissors, Calendar, Clock, CreditCard } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BookingProgress } from "./BookingProgress";

export function ReviewBooking() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-secondary transition-colors -ml-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-semibold">Review & Confirm</h1>
      </div>

      <BookingProgress currentStep={4} />

      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 space-y-8 shadow-sm">
        
        {/* Barber Section */}
        <div className="flex items-center gap-4 pb-8 border-b border-border">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWxlJTIwYmFyYmVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzgxNzg4MzY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="David"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold mb-1">David</h2>
            <p className="text-muted-foreground">Senior Barber</p>
          </div>
          <Link to="/book/barber" className="ml-auto text-sm font-medium text-primary hover:underline">Edit</Link>
        </div>

        {/* Details Section */}
        <div className="space-y-5 pb-8 border-b border-border">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <Scissors className="w-5 h-5 text-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Haircut + Beard Trim</h3>
                <Link to="/book/service" className="text-sm font-medium text-primary hover:underline">Edit</Link>
              </div>
              <p className="text-muted-foreground mt-1">1h 15m duration</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Thursday, Oct 24, 2024</h3>
                <Link to="/book/datetime" className="text-sm font-medium text-primary hover:underline">Edit</Link>
              </div>
              <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>10:00 AM - 11:15 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-muted-foreground" />
            Payment Summary
          </h3>
          
          <div className="flex justify-between text-muted-foreground">
            <span>Service</span>
            <span>$60.00</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Taxes & Fees</span>
            <span>$4.50</span>
          </div>
          
          <div className="pt-4 border-t border-border flex justify-between font-semibold text-xl">
            <span>Total</span>
            <span>$64.50</span>
          </div>
          
          <p className="text-sm text-muted-foreground text-center pt-2">
            Pay at the shop after your service.
          </p>
        </div>

      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center pt-4">
        <button onClick={() => navigate(-1)} className="w-full sm:w-auto px-8 py-4 font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-colors">
          Back
        </button>
        <Link
          to="/book/confirmation"
          className="w-full sm:flex-1 py-4 bg-primary text-primary-foreground font-semibold rounded-xl text-center text-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Confirm Booking
        </Link>
      </div>
    </div>
  );
}
