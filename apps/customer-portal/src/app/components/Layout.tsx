import { Bell, Scissors, Calendar, User, LogOut, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", path: "/", icon: Scissors },
    { label: "My Appointments", path: "/appointments", icon: Calendar },
  ];

  const isActive = (path: string) => location.pathname === path;

  const notifications = [
    { id: 1, title: "Appointment Confirmed", desc: "Your haircut with David is confirmed for tomorrow at 10:00 AM.", time: "2h ago", unread: true },
    { id: 2, title: "Appointment Reminder", desc: "Don't forget! Your appointment is in 2 hours.", time: "1d ago", unread: false },
    { id: 3, title: "Appointment Completed", desc: "How was your haircut? Leave a review for Marcus.", time: "3d ago", unread: false },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-card border-b border-border z-20">
        <div className="flex items-center gap-2">
          <Scissors className="w-6 h-6 text-primary" />
          <span className="font-semibold text-lg tracking-tight">Trimly</span>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/profile" className="p-2">
            <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-foreground" />
            </div>
          </Link>
          <button onClick={() => setIsNotificationsOpen(true)} className="p-2 relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 -mr-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-card border-r border-border p-6 flex flex-col z-10 transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="hidden md:flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <Scissors className="w-8 h-8 text-primary" />
            <span className="font-bold text-2xl tracking-tight">Trimly</span>
          </div>
          <button onClick={() => setIsNotificationsOpen(true)} className="p-2 hover:bg-secondary rounded-full transition-colors relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-border">
          <Link to="/profile" className="flex items-center gap-3 mb-6 px-2 hover:bg-secondary/50 rounded-lg p-2 transition-colors -ml-2 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">Alex Johnson</p>
              <p className="text-xs text-muted-foreground">Premium Member</p>
            </div>
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-4 md:p-8 lg:p-12 pb-24">
          {children}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-0 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Notifications Slide-over */}
      <Dialog.Root open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
          <Dialog.Content className="fixed right-0 top-0 h-full w-full max-w-sm bg-card shadow-2xl z-50 animate-in slide-in-from-right duration-300 border-l border-border flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <Dialog.Title className="text-xl font-semibold">Notifications</Dialog.Title>
              <Dialog.Close className="p-2 hover:bg-secondary rounded-full transition-colors">
                <X className="w-5 h-5" />
              </Dialog.Close>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {notifications.map(note => (
                <div key={note.id} className={`p-4 rounded-xl border ${note.unread ? 'bg-primary/5 border-primary/20' : 'bg-background border-border'}`}>
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h4 className="font-semibold text-sm">{note.title}</h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{note.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{note.desc}</p>
                </div>
              ))}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

    </div>
  );
}
