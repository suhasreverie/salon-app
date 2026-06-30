import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import * as Switch from "@radix-ui/react-switch";

export function NotificationSettings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    reminders: true,
    queue: true,
    confirmations: true,
    promos: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-24">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-secondary transition-colors -ml-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-semibold">Notification Settings</h1>
      </div>

      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        
        <div className="flex items-center justify-between pb-6 border-b border-border">
          <div className="pr-4">
            <h3 className="font-semibold text-lg">Appointment Reminders</h3>
            <p className="text-sm text-muted-foreground mt-1">Get notified 24 hours and 2 hours before your booking.</p>
          </div>
          <Switch.Root 
            checked={settings.reminders}
            onCheckedChange={() => toggleSetting('reminders')}
            className={`w-11 h-6 rounded-full relative transition-colors ${settings.reminders ? 'bg-primary' : 'bg-secondary border border-border'}`}
          >
            <Switch.Thumb className={`block w-5 h-5 bg-background rounded-full transition-transform shadow-sm ${settings.reminders ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </Switch.Root>
        </div>

        <div className="flex items-center justify-between pb-6 border-b border-border">
          <div className="pr-4">
            <h3 className="font-semibold text-lg">Queue Updates</h3>
            <p className="text-sm text-muted-foreground mt-1">Live alerts when you join the queue and when you're next.</p>
          </div>
          <Switch.Root 
            checked={settings.queue}
            onCheckedChange={() => toggleSetting('queue')}
            className={`w-11 h-6 rounded-full relative transition-colors ${settings.queue ? 'bg-primary' : 'bg-secondary border border-border'}`}
          >
            <Switch.Thumb className={`block w-5 h-5 bg-background rounded-full transition-transform shadow-sm ${settings.queue ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </Switch.Root>
        </div>

        <div className="flex items-center justify-between pb-6 border-b border-border">
          <div className="pr-4">
            <h3 className="font-semibold text-lg">Booking Confirmations</h3>
            <p className="text-sm text-muted-foreground mt-1">Immediate receipts when an appointment is booked or changed.</p>
          </div>
          <Switch.Root 
            checked={settings.confirmations}
            onCheckedChange={() => toggleSetting('confirmations')}
            className={`w-11 h-6 rounded-full relative transition-colors ${settings.confirmations ? 'bg-primary' : 'bg-secondary border border-border'}`}
          >
            <Switch.Thumb className={`block w-5 h-5 bg-background rounded-full transition-transform shadow-sm ${settings.confirmations ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </Switch.Root>
        </div>

        <div className="flex items-center justify-between">
          <div className="pr-4">
            <h3 className="font-semibold text-lg">Promotional Offers</h3>
            <p className="text-sm text-muted-foreground mt-1">Special deals, new services, and seasonal discounts.</p>
          </div>
          <Switch.Root 
            checked={settings.promos}
            onCheckedChange={() => toggleSetting('promos')}
            className={`w-11 h-6 rounded-full relative transition-colors ${settings.promos ? 'bg-primary' : 'bg-secondary border border-border'}`}
          >
            <Switch.Thumb className={`block w-5 h-5 bg-background rounded-full transition-transform shadow-sm ${settings.promos ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </Switch.Root>
        </div>

      </div>

      <div className="flex justify-end pt-4">
        <button onClick={() => navigate('/profile')} className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl text-center text-lg hover:bg-primary/90 transition-all shadow-md transform hover:-translate-y-0.5">
          Save Settings
        </button>
      </div>

    </div>
  );
}
