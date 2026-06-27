import { useState } from "react";
import { Clock, Scissors, Calendar as CalendarIcon, ChevronDown, ChevronUp } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Link } from "react-router";

export function MyAppointments() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const appointments = {
    upcoming: [
      {
        id: 1,
        date: "Thu, Oct 24",
        time: "10:00 AM - 11:15 AM",
        service: "Haircut + Beard Trim",
        duration: "1h 15m",
        barber: "David",
        barberImage: "https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWxlJTIwYmFyYmVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzgxNzg4MzY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        status: "Confirmed",
        price: "$60",
      },
      {
        id: 2,
        date: "Fri, Nov 15",
        time: "02:00 PM - 02:45 PM",
        service: "Haircut",
        duration: "45m",
        barber: "Sarah",
        barberImage: "https://images.unsplash.com/photo-1659355750609-7f3d2c912c3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB5b3VuZyUyMGZlbWFsZSUyMGJhcmJlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc4MTc4ODM2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        status: "Pending",
        price: "$40",
      }
    ],
    past: [
      {
        id: 3,
        date: "Mon, Sep 10",
        time: "11:00 AM - 11:45 AM",
        service: "Haircut",
        duration: "45m",
        barber: "David",
        barberImage: "https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWxlJTIwYmFyYmVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzgxNzg4MzY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        status: "Completed",
        price: "$40",
      },
      {
        id: 4,
        date: "Wed, Aug 05",
        time: "03:30 PM - 04:00 PM",
        service: "Beard Trim",
        duration: "30m",
        barber: "Marcus",
        barberImage: "https://images.unsplash.com/photo-1553521041-d168abd31de3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbGUlMjBiYXJiZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3ODE3ODgzNjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        status: "Completed",
        price: "$25",
      }
    ]
  };

  const currentList = appointments[tab];

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
      <header>
        <h1 className="text-3xl font-semibold mb-2">My Appointments</h1>
        <p className="text-muted-foreground">Manage your past and upcoming bookings.</p>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-secondary/50 rounded-xl w-fit">
        <button
          onClick={() => setTab("upcoming")}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
            tab === "upcoming" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setTab("past")}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
            tab === "past" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Past
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {currentList.map((apt) => {
          const isExpanded = expandedId === apt.id;
          
          return (
            <div key={apt.id} className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden transition-all duration-300">
              {/* Header / Condensed View */}
              <div 
                onClick={() => toggleExpand(apt.id)}
                className="p-5 flex flex-col md:flex-row gap-4 md:items-center cursor-pointer hover:bg-secondary/20 transition-colors"
              >
                {/* Date/Time Block */}
                <div className="flex items-start gap-4 md:w-1/3">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <CalendarIcon className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">{apt.date}</p>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                      <Clock className="w-3.5 h-3.5" />
                      {apt.time}
                    </div>
                  </div>
                </div>

                {/* Service/Barber Block */}
                <div className="flex-1 flex items-center justify-between md:border-l md:border-border md:pl-6">
                  <div>
                    <h3 className="font-semibold text-lg">{apt.service}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <ImageWithFallback
                        src={apt.barberImage}
                        alt={apt.barber}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium text-muted-foreground">with {apt.barber}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {/* Status Badge */}
                    <div className={`hidden sm:block px-3 py-1 rounded-full text-xs font-medium ${
                      apt.status === "Confirmed" ? "bg-green-100 text-green-800 border border-green-200" :
                      apt.status === "Pending" ? "bg-yellow-100 text-yellow-800 border border-yellow-200" :
                      "bg-secondary text-muted-foreground border border-border"
                    }`}>
                      {apt.status}
                    </div>
                    
                    <button className="text-muted-foreground hover:text-foreground transition-colors p-1">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="p-5 border-t border-border bg-secondary/10 animate-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Service</p>
                      <p className="font-medium text-sm">{apt.service}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Duration</p>
                      <p className="font-medium text-sm">{apt.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Price</p>
                      <p className="font-medium text-sm">{apt.price}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Status</p>
                      <p className="font-medium text-sm">{apt.status}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                    {tab === "upcoming" ? (
                      <>
                        <Link to={`/appointment/${apt.id}`} className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
                          View Details
                        </Link>
                        <button className="px-4 py-2 bg-background border border-border text-foreground text-sm font-medium rounded-lg hover:bg-secondary transition-colors">
                          Reschedule
                        </button>
                        <button className="px-4 py-2 text-destructive text-sm font-medium hover:bg-destructive/10 rounded-lg transition-colors ml-auto">
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to={`/book/service?selected=haircut&barber=${apt.barber.toLowerCase()}`} className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
                          Book Again
                        </Link>
                        <button className="px-4 py-2 bg-background border border-border text-foreground text-sm font-medium rounded-lg hover:bg-secondary transition-colors">
                          Leave Review
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {currentList.length === 0 && (
          <div className="text-center py-12 bg-card border border-border rounded-2xl border-dashed">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Scissors className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No appointments</h3>
            <p className="text-muted-foreground">You don't have any {tab} appointments.</p>
          </div>
        )}
      </div>
    </div>
  );
}
