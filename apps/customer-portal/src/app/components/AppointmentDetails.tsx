import { Link, useNavigate } from "react-router";
import { ChevronLeft, Scissors, Calendar, Clock, MapPin, Phone, MessageCircle, AlertTriangle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function AppointmentDetails() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-secondary transition-colors -ml-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-semibold">Appointment Details</h1>
      </div>

      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 space-y-8 shadow-sm relative overflow-hidden">
        {/* Status banner */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-green-500" />
        
        <div className="flex justify-between items-start">
          <div>
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 border border-green-200 rounded-full text-xs font-medium mb-4">
              Confirmed
            </span>
            <h2 className="text-2xl font-bold">Haircut + Beard Trim</h2>
            <p className="text-muted-foreground flex items-center gap-2 mt-2">
              <Clock className="w-4 h-4" /> 1h 15m • $60.00
            </p>
          </div>
        </div>

        <div className="space-y-6 pt-6 border-t border-border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-0.5">Date & Time</p>
              <p className="font-semibold text-lg">Thursday, Oct 24 • 10:00 AM</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWxlJTIwYmFyYmVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzgxNzg4MzY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="David"
              className="w-12 h-12 rounded-full object-cover shrink-0"
            />
            <div>
              <p className="text-sm text-muted-foreground mb-0.5">Barber</p>
              <p className="font-semibold text-lg">David <Link to="/barber/david" className="text-sm font-medium text-primary ml-2 hover:underline">View Profile</Link></p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-0.5">Location</p>
              <p className="font-semibold text-lg">Trimly Studio</p>
              <p className="text-muted-foreground">123 Barber Street, NY 10001</p>
            </div>
          </div>
        </div>

        {/* Live Queue tracking snippet */}
        <div className="bg-secondary/50 rounded-2xl p-5 border border-border mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center border border-border shrink-0">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </div>
            <div>
              <p className="font-medium">Live Queue Status</p>
              <p className="text-sm text-muted-foreground">You are next in line</p>
            </div>
          </div>
          <Link to="/queue/status" className="w-full sm:w-auto px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors text-center">
            View Live Queue
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button className="flex flex-col items-center justify-center gap-2 py-4 bg-card border border-border rounded-xl hover:bg-secondary transition-colors text-foreground">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <span className="font-medium text-sm">Reschedule</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-2 py-4 bg-card border border-border rounded-xl hover:bg-secondary transition-colors text-foreground">
          <Phone className="w-5 h-5 text-muted-foreground" />
          <span className="font-medium text-sm">Contact Salon</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-2 py-4 bg-card border border-destructive/30 rounded-xl hover:bg-destructive/10 transition-colors text-destructive">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-medium text-sm">Cancel Booking</span>
        </button>
      </div>
    </div>
  );
}
