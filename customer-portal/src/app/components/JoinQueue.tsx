import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeft, MapPin, Clock, Users, ArrowRight } from "lucide-react";

export function JoinQueue() {
  const navigate = useNavigate();
  const [joined, setJoined] = useState(false);

  if (joined) {
    return (
      <div className="max-w-md mx-auto py-12 text-center animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl font-bold text-primary">#4</span>
        </div>
        <h1 className="text-3xl font-bold mb-3">You're in the queue!</h1>
        <p className="text-muted-foreground text-lg mb-8">
          We'll notify you when it's almost your turn.
        </p>

        <div className="bg-card border border-border rounded-2xl p-6 mb-8 text-left shadow-sm">
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-border">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Estimated Wait</p>
              <p className="text-2xl font-bold">25 <span className="text-base font-medium text-muted-foreground">Mins</span></p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Customers Ahead</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
          <Link 
            to="/queue/status"
            className="flex items-center justify-center gap-2 w-full py-3 bg-secondary text-foreground font-medium rounded-xl hover:bg-muted transition-colors"
          >
            Track Live Status <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <Link
          to="/"
          className="text-primary font-medium hover:underline"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-secondary transition-colors -ml-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-semibold">Join Queue</h1>
      </div>

      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 space-y-8 shadow-sm">
        
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6 text-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-1">Trimly Studio</h2>
            <p className="text-muted-foreground">123 Barber Street, NY 10001</p>
            <p className="text-sm text-green-600 font-medium mt-1">Open today until 8:00 PM</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-6 border-y border-border">
          <div>
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Current Wait</span>
            </div>
            <p className="text-2xl font-bold">~25 min</p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="w-4 h-4" />
              <span className="text-sm">In Line</span>
            </div>
            <p className="text-2xl font-bold">3 people</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Queue Rules</h3>
          <ul className="space-y-3 text-muted-foreground text-sm">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              We will notify you 10 minutes before your turn.
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              Please arrive promptly. If you are not present when called, you may lose your spot.
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              You can cancel your place in line at any time from the app.
            </li>
          </ul>
        </div>
      </div>

      <button
        onClick={() => setJoined(true)}
        className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl text-center text-lg hover:bg-primary/90 transition-all shadow-md transform hover:-translate-y-0.5"
      >
        Join Queue Now
      </button>
    </div>
  );
}
