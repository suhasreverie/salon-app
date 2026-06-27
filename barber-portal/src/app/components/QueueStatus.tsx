import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeft, MapPin, Clock, Users, ArrowRight } from "lucide-react";

export function QueueStatus() {
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-secondary transition-colors -ml-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-semibold">Live Queue Status</h1>
      </div>

      <div className="bg-card border border-border rounded-3xl p-8 text-center shadow-sm relative overflow-hidden">
        {/* Pulsing indicator */}
        <div className="absolute top-6 right-6 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Live</span>
        </div>

        <p className="text-muted-foreground mb-2">Your Ticket Number</p>
        <div className="text-6xl font-bold text-primary mb-10">#4</div>

        <div className="grid grid-cols-2 gap-4 text-left">
          <div className="bg-secondary/50 p-4 rounded-2xl border border-border">
            <p className="text-sm text-muted-foreground mb-1">Est. Wait Time</p>
            <p className="text-2xl font-bold">25 <span className="text-base font-medium text-muted-foreground">Mins</span></p>
          </div>
          <div className="bg-secondary/50 p-4 rounded-2xl border border-border">
            <p className="text-sm text-muted-foreground mb-1">Customers Ahead</p>
            <p className="text-2xl font-bold">3</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-left">
          <h3 className="font-semibold mb-4">Currently Serving</h3>
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-xl border border-primary/20">
               #1
             </div>
             <div>
               <p className="font-medium">Ticket #1</p>
               <p className="text-sm text-muted-foreground">with Barber David</p>
             </div>
          </div>
        </div>
      </div>

      <button className="w-full py-4 bg-background border border-destructive text-destructive font-semibold rounded-xl text-center hover:bg-destructive/5 transition-colors">
        Leave Queue
      </button>
    </div>
  );
}
