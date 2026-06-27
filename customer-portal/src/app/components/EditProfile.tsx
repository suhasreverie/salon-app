import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeft, Camera, ShieldAlert } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

export function EditProfile() {
  const navigate = useNavigate();
  const [isOtpOpen, setIsOtpOpen] = useState(false);

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-24">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-secondary transition-colors -ml-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-semibold">Edit Profile</h1>
      </div>

      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-8">
        
        {/* Photo Upload */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center overflow-hidden border-4 border-background shadow-sm">
              <span className="text-2xl font-bold text-muted-foreground">AJ</span>
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-md hover:bg-primary/90 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-3">Tap to change photo</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input 
              type="text" 
              defaultValue="Alex Johnson"
              className="w-full p-4 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Preferred Language</label>
            <select className="w-full p-4 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-end mb-2">
              <label className="block text-sm font-medium">Phone Number</label>
              <button 
                onClick={() => setIsOtpOpen(true)}
                className="text-xs font-medium text-primary hover:underline"
              >
                Change Number
              </button>
            </div>
            <div className="relative">
              <input 
                type="tel" 
                defaultValue="+1 (555) 123-4567"
                disabled
                className="w-full p-4 bg-secondary/50 border border-border rounded-xl text-muted-foreground cursor-not-allowed"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md border border-green-200">
                <ShieldAlert className="w-3 h-3" /> Verified
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              Requires OTP verification to change.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button onClick={() => navigate(-1)} className="w-full sm:w-auto px-8 py-4 font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-colors">
          Cancel
        </button>
        <button onClick={() => navigate('/profile')} className="w-full sm:flex-1 py-4 bg-primary text-primary-foreground font-semibold rounded-xl text-center text-lg hover:bg-primary/90 transition-all shadow-md transform hover:-translate-y-0.5">
          Save Changes
        </button>
      </div>

      {/* OTP Dialog */}
      <Dialog.Root open={isOtpOpen} onOpenChange={setIsOtpOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-card p-6 rounded-3xl shadow-2xl z-50 animate-in zoom-in-95 duration-200">
            <Dialog.Title className="text-xl font-semibold mb-2">Change Phone Number</Dialog.Title>
            <Dialog.Description className="text-sm text-muted-foreground mb-6">
              Enter your new phone number. We'll send a verification code to confirm.
            </Dialog.Description>
            
            <input 
              type="tel" 
              placeholder="+1 (000) 000-0000"
              className="w-full p-4 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all mb-6"
            />

            <div className="flex gap-3">
              <Dialog.Close className="flex-1 py-3 bg-secondary text-foreground font-medium rounded-xl hover:bg-muted transition-colors">
                Cancel
              </Dialog.Close>
              <button onClick={() => setIsOtpOpen(false)} className="flex-1 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-sm">
                Send OTP
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

    </div>
  );
}
