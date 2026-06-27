import { Link, useNavigate } from "react-router";
import { ChevronLeft, Star, Scissors, Clock, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function SavedPreferences() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-24">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-secondary transition-colors -ml-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-semibold">Saved Preferences</h1>
      </div>

      <div className="space-y-6">
        
        {/* Preferred Barber */}
        <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            Preferred Barber
          </h2>
          
          <div className="flex items-center gap-4">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWxlJTIwYmFyYmVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzgxNzg4MzY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="David"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">David</h3>
              <p className="text-sm text-muted-foreground">Senior Barber</p>
            </div>
            <Link to="/barber/david" className="text-sm font-medium text-primary hover:underline">
              View Profile
            </Link>
          </div>
        </div>

        {/* Favorite Service */}
        <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Scissors className="w-5 h-5 text-foreground" />
            Favorite Service
          </h2>
          
          <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-2xl border border-border">
            <div>
              <h3 className="font-semibold">Haircut + Beard Trim</h3>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 1h 15m</span>
                <span>•</span>
                <span>$60</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Services */}
        <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-foreground" />
            Recent Services
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div>
                <h3 className="font-medium">Classic Haircut</h3>
                <p className="text-sm text-muted-foreground">Sep 10, 2024</p>
              </div>
              <span className="text-sm font-medium">$40</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Beard Trim</h3>
                <p className="text-sm text-muted-foreground">Aug 05, 2024</p>
              </div>
              <span className="text-sm font-medium">$25</span>
            </div>
          </div>
        </div>

      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-border md:static md:bg-transparent md:border-t-0 md:p-0">
        <div className="max-w-2xl mx-auto flex justify-end">
          <Link
            to="/book/service?selected=combo&barber=david"
            className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl text-lg hover:bg-primary/90 transition-all shadow-md transform hover:-translate-y-0.5"
          >
            Quick Rebook <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

    </div>
  );
}
