import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ChevronLeft, Star, Clock, Calendar } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function BarberProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data fetching based on ID
  const barber = {
    id: id,
    name: id === "sarah" ? "Sarah" : "David",
    image: id === "sarah" ? "https://images.unsplash.com/photo-1659355750609-7f3d2c912c3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB5b3VuZyUyMGZlbWFsZSUyMGJhcmJlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc4MTc4ODM2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" : "https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWxlJTIwYmFyYmVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzgxNzg4MzY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: id === "sarah" ? "4.8" : "4.9",
    reviews: id === "sarah" ? "98" : "124",
    experience: id === "sarah" ? "5 years" : "8 years",
    status: id === "sarah" ? "Available Tomorrow" : "Available Today",
    specialties: ["Fades", "Beard Sculpting", "Classic Cuts"],
    bio: "Passionate about modern grooming and classic barbering techniques. Dedicated to making every client look and feel their absolute best.",
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-24">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-secondary transition-colors -ml-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-semibold">Barber Profile</h1>
      </div>

      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 text-center sm:text-left">
          <ImageWithFallback
            src={barber.image}
            alt={barber.name}
            className="w-32 h-32 rounded-full object-cover shadow-sm"
          />
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <h2 className="text-2xl font-bold">{barber.name}</h2>
              <span className="inline-block px-3 py-1 bg-secondary text-muted-foreground rounded-full text-xs font-medium w-fit mx-auto sm:mx-0">
                {barber.status}
              </span>
            </div>
            
            <div className="flex items-center justify-center sm:justify-start gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-medium text-foreground">{barber.rating}</span>
                <span>({barber.reviews})</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-border" />
              <span>{barber.experience} exp</span>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              {barber.bio}
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-border">
          <h3 className="font-semibold mb-3">Specialties</h3>
          <div className="flex flex-wrap gap-2">
            {barber.specialties.map(spec => (
              <span key={spec} className="px-3 py-1.5 bg-secondary text-foreground text-sm font-medium rounded-lg">
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-medium">Upcoming Availability</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { time: "01:00 PM", day: "Today" },
            { time: "02:30 PM", day: "Today" },
            { time: "09:00 AM", day: "Tomorrow" },
            { time: "10:30 AM", day: "Tomorrow" }
          ].map((slot, i) => (
            <div key={i} className="p-3 border border-border bg-card rounded-xl text-center hover:border-primary/50 transition-colors cursor-pointer">
              <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{slot.day}</p>
              <p className="font-medium">{slot.time}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-border md:static md:bg-transparent md:border-t-0 md:p-0">
        <div className="max-w-2xl mx-auto flex justify-end">
          <Link
            to={`/book/service?barber=${barber.id}`}
            className="w-full md:w-auto px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl text-center text-lg hover:bg-primary/90 transition-all shadow-md transform hover:-translate-y-0.5"
          >
            Book With This Barber
          </Link>
        </div>
      </div>
    </div>
  );
}
