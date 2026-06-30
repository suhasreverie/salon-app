import { create } from 'zustand';

interface BookingState {
  serviceId: string | null;
  barberId: string | null;
  date: string | null;
  time: string | null;
  setService: (id: string) => void;
  setBarber: (id: string) => void;
  setDateTime: (date: string, time: string) => void;
  reset: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  serviceId: null,
  barberId: null,
  date: null,
  time: null,
  setService: (id) => set({ serviceId: id }),
  setBarber: (id) => set({ barberId: id }),
  setDateTime: (date, time) => set({ date, time }),
  reset: () => set({ serviceId: null, barberId: null, date: null, time: null }),
}));
