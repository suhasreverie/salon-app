import { Calendar, Clock, Star, Users, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-semibold mb-2">Good morning, Alex</h1>
        <p className="text-muted-foreground">Ready for a fresh look?</p>
      </header>

      {/* Live Salon Status */}
      <section>
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2 mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Live Salon Status</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Current Wait Time</p>
              <p className="text-3xl font-bold">12 <span className="text-lg font-medium text-muted-foreground">Mins</span></p>
            </div>
            <div className="md:border-l md:border-border md:pl-6">
              <p className="text-muted-foreground text-sm mb-1">Next Available Slot</p>
              <p className="text-xl font-semibold">Today • 4:30 PM</p>
            </div>
            <div className="md:border-l md:border-border md:pl-6">
              <p className="text-muted-foreground text-sm mb-1">Customers Ahead</p>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <p className="text-xl font-semibold">2</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/book/service"
              className="flex-1 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl text-center hover:bg-primary/90 transition-colors shadow-sm"
            >
              Book Appointment
            </Link>
            <Link
              to="/queue/join"
              className="flex-1 py-3.5 bg-secondary text-foreground font-semibold rounded-xl text-center hover:bg-muted transition-colors border border-border"
            >
              Join Queue
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Appointment */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium">Upcoming Appointment</h2>
        </div>
        <div 
          onClick={() => navigate('/appointment/1')}
          className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center cursor-pointer hover:border-primary/50 transition-colors group"
        >
          <div className="bg-secondary rounded-xl p-4 flex flex-col items-center justify-center min-w-[80px]">
            <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Oct</span>
            <span className="text-2xl font-bold text-foreground">24</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">Haircut + Beard Trim</h3>
            <p className="text-muted-foreground flex items-center gap-2 text-sm mb-2">
              <Clock className="w-4 h-4" /> 10:00 AM - 11:00 AM
            </p>
            <div className="flex items-center gap-2">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWxlJTIwYmFyYmVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzgxNzg4MzY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="David"
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-sm font-medium">with David</span>
            </div>
          </div>
          <div className="w-full sm:w-auto px-6 py-2.5 bg-secondary text-foreground font-medium rounded-lg text-center text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex items-center justify-center gap-2">
            View Details <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium">Quick Book</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: "haircut", name: "Haircut", price: "$40", duration: "45m", icon: "✂️" },
            { id: "beard", name: "Beard Trim", price: "$25", duration: "30m", icon: "🧔" },
            { id: "combo", name: "Haircut + Beard", price: "$60", duration: "1h 15m", icon: "🔥" },
            { id: "spa", name: "Hair Spa", price: "$35", duration: "30m", icon: "💆‍♂️" },
          ].map((service) => (
            <Link 
              key={service.id} 
              to={`/book/service?selected=${service.id}`}
              className="bg-card border border-border rounded-xl p-4 hover:border-primary hover:shadow-md transition-all cursor-pointer group block"
            >
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-xl mb-3 group-hover:bg-primary/10 transition-colors">
                {service.icon}
              </div>
              <h3 className="font-semibold mb-1">{service.name}</h3>
              <p className="text-sm text-muted-foreground">{service.duration} • {service.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Barbers */}
      <section>
        <h2 className="text-xl font-medium mb-4">Our Barbers</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar">
          {[
            { id: "david", name: "David", image: "https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWxlJTIwYmFyYmVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzgxNzg4MzY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", rating: "4.9", status: "Available Today" },
            { id: "sarah", name: "Sarah", image: "https://images.unsplash.com/photo-1659355750609-7f3d2c912c3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB5b3VuZyUyMGZlbWFsZSUyMGJhcmJlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc4MTc4ODM2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", rating: "4.8", status: "Available Tomorrow" },
          ].map((barber) => (
            <Link 
              key={barber.id}
              to={`/barber/${barber.id}`}
              className="flex-shrink-0 bg-card border border-border rounded-xl p-4 flex flex-col items-center gap-3 w-[160px] hover:border-primary hover:shadow-md transition-all group block"
            >
              <ImageWithFallback
                src={barber.image}
                alt={barber.name}
                className="w-16 h-16 rounded-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="text-center">
                <h4 className="font-medium text-lg">{barber.name}</h4>
                <div className="flex items-center justify-center text-xs text-muted-foreground mt-1 mb-2">
                  <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                  {barber.rating}
                </div>
                <span className="text-[10px] font-medium px-2 py-1 bg-secondary rounded-full text-muted-foreground whitespace-nowrap">
                  {barber.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
