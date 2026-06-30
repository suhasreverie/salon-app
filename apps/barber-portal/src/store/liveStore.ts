import { create } from 'zustand';

interface LiveStore {
  isConnected: boolean;
  messages: any[];
  connect: (url: string) => void;
  disconnect: () => void;
}

let ws: WebSocket | null = null;

export const useLiveStore = create<LiveStore>((set) => ({
  isConnected: false,
  messages: [],
  connect: (url: string) => {
    if (ws) return;
    
    ws = new WebSocket(url);
    
    ws.onopen = () => {
      set({ isConnected: true });
      console.log('Connected to live salon stream');
    };
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      set((state) => ({ messages: [...state.messages, data] }));
      console.log('Live Event Received:', data);
    };
    
    ws.onclose = () => {
      set({ isConnected: false });
      ws = null;
      console.log('Disconnected from live salon stream');
      // Auto-reconnect logic could go here
    };
  },
  disconnect: () => {
    if (ws) {
      ws.close();
      ws = null;
    }
  }
}));
