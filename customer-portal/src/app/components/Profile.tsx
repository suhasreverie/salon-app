import { Link, useNavigate } from "react-router";
import { ChevronRight, User, Settings, Bell, Clock, HelpCircle, LogOut, ChevronLeft } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Profile() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-secondary transition-colors -ml-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-semibold">Profile</h1>
      </div>

      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center overflow-hidden border-4 border-background shadow-sm">
            <User className="w-10 h-10 text-muted-foreground" />
          </div>
        </div>
        <h2 className="text-2xl font-bold">Alex Johnson</h2>
        <p className="text-muted-foreground mt-1">+1 (555) 123-4567</p>
      </div>

      <div className="space-y-4">
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <Link to="/profile/edit" className="flex items-center gap-4 p-5 hover:bg-secondary/50 transition-colors border-b border-border">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Personal Information</h3>
              <p className="text-sm text-muted-foreground">Edit name, photo, and language</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>
          
          <Link to="/profile/preferences" className="flex items-center gap-4 p-5 hover:bg-secondary/50 transition-colors border-b border-border">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <Settings className="w-5 h-5 text-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Saved Preferences</h3>
              <p className="text-sm text-muted-foreground">Favorite barber and services</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>

          <Link to="/appointments" className="flex items-center gap-4 p-5 hover:bg-secondary/50 transition-colors border-b border-border">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Appointment History</h3>
              <p className="text-sm text-muted-foreground">View past and upcoming bookings</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>

          <Link to="/profile/notifications" className="flex items-center gap-4 p-5 hover:bg-secondary/50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5 text-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Notification Settings</h3>
              <p className="text-sm text-muted-foreground">Manage alerts and reminders</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <Link to="#" className="flex items-center gap-4 p-5 hover:bg-secondary/50 transition-colors border-b border-border">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5 text-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Help & Support</h3>
              <p className="text-sm text-muted-foreground">FAQs and contact us</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>
          
          <Link to="/login" className="flex items-center gap-4 p-5 hover:bg-destructive/5 transition-colors text-destructive">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
              <LogOut className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Logout</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
