import { type ReactNode, useEffect, useState } from "react";
import { AlertTriangle, Bell, CalendarDays, Check, ChevronRight, Circle, Clock, Coffee, LogOut, MessageCircle, MoreVertical, Phone, Scissors, Star, User, X } from "lucide-react";
import { QueryClient, QueryClientProvider, useQuery, useMutation } from "@tanstack/react-query";
import { fetchBarberQueue, updateAppointmentStatus } from "../api/client";
import { useLiveStore } from "../store/liveStore";

const queryClient = new QueryClient();

type Screen = "login" | "queue" | "details" | "change" | "transfer" | "contact" | "calendar" | "notifications" | "profile" | "availability" | "break" | "activeBreak";
type Customer = { name: string; phone: string; service: string; time: string; duration: string; status: string; notes: string; photo: string };

const initialCustomers: Customer[] = [
  { name: "Mandla Khumalo", phone: "+27 72 441 9012", service: "Skin Fade + Beard Line", time: "09:30", duration: "45 min", status: "Arrived", notes: "Prefers a low skin fade and natural beard line. Sensitive around the neck.", photo: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=180&h=180&fit=crop&auto=format" },
  { name: "Sizwe Dlamini", phone: "+27 81 305 7710", service: "Classic Cut", time: "10:20", duration: "30 min", status: "Confirmed", notes: "Keep the top fuller than last visit. No product unless requested.", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=180&h=180&fit=crop&auto=format" },
  { name: "Thabo Mokoena", phone: "+27 73 188 6630", service: "Cut + Hot Towel Shave", time: "11:00", duration: "55 min", status: "On The Way", notes: "Usually arrives 5 minutes early. Offer hot towel before beard work.", photo: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=180&h=180&fit=crop&auto=format" },
  { name: "Aiden Naidoo", phone: "+27 84 996 2341", service: "Kids Cut", time: "12:10", duration: "25 min", status: "Not Checked In", notes: "Parent requested quick clipper cut before school photos.", photo: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=180&h=180&fit=crop&auto=format" },
  { name: "Neo Jacobs", phone: "+27 76 552 1904", service: "Beard Shape", time: "13:00", duration: "20 min", status: "No Show", notes: "Call before cancelling. Often parks behind the salon.", photo: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=180&h=180&fit=crop&auto=format" },
];

const barbers = [
  { name: "Kabelo Stone", state: "Available", photo: "https://images.unsplash.com/photo-1582893561942-d61adcb2e534?w=160&h=160&fit=crop&auto=format" },
  { name: "Lerato Fade", state: "Busy", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&fit=crop&auto=format" },
  { name: "Mo Jazz", state: "On Break", photo: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=160&h=160&fit=crop&auto=format" },
];

function StatusChip({ children }: { children: string }) {
  const styles: Record<string, string> = {
    Arrived: "bg-[#DCE9DD] text-[#1F4A37]",
    Confirmed: "bg-[#DDE8F6] text-[#245789]",
    "On The Way": "bg-[#F5E7C8] text-[#7B5716]",
    "Not Checked In": "bg-[#ECE7DE] text-[#5D574D]",
    "No Show": "bg-[#F1D7D2] text-[#8A2F24]",
  };
  const dots: Record<string, string> = { Arrived: "text-[#2E8B57]", Confirmed: "text-[#2F6FAA]", "On The Way": "text-[#D29A22]", "Not Checked In": "text-[#A8A095]", "No Show": "text-[#C44235]" };
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${styles[children]}`}><Circle className={`size-2.5 fill-current ${dots[children]}`} />{children}</span>;
}

function Shell({ screen, setScreen, children }: { screen: Screen; setScreen: (s: Screen) => void; children: ReactNode }) {
  const nav = [["queue", Scissors], ["calendar", CalendarDays], ["notifications", Bell], ["profile", User]] as const;
  return <div className="min-h-screen bg-background text-foreground"><main className="mx-auto max-w-6xl px-4 pb-28 pt-5 sm:px-6">{children}</main><nav className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-3xl rounded-t-[28px] border border-border bg-card/95 px-4 py-3 shadow-[0_-18px_50px_rgba(31,74,55,.13)] backdrop-blur"><div className="grid grid-cols-4 gap-2">{nav.map(([id, Icon]) => <button key={id} onClick={() => setScreen(id)} className={`flex min-h-14 flex-col items-center justify-center rounded-2xl text-xs transition ${screen === id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}><Icon size={20}/><span className="mt-1 capitalize">{id}</span></button>)}</div></nav></div>;
}

function StatusToggle({ barberStatus, setScreen }: { barberStatus: string; setScreen: (s: Screen) => void }) {
  return <div className="flex rounded-2xl bg-secondary p-1"><button className={`rounded-xl px-5 py-3 ${barberStatus === "Available" ? "bg-primary text-white" : "text-muted-foreground"}`}>Available</button><button onClick={() => setScreen("break")} className={`px-5 py-3 ${barberStatus === "On Break" ? "rounded-xl bg-primary text-white" : "text-muted-foreground"}`}><Coffee className="mr-2 inline" size={18}/>On Break</button></div>;
}

function Login({ setScreen }: { setScreen: (s: Screen) => void }) {
  return <div className="grid min-h-screen bg-background p-5 lg:grid-cols-[1.05fr_.95fr]"><section className="relative hidden overflow-hidden rounded-[32px] bg-[#173629] lg:block"><img className="h-full w-full object-cover opacity-70" alt="Premium barbershop chair and warm interior" src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1200&h=1400&fit=crop&auto=format"/><div className="absolute inset-0 bg-gradient-to-t from-[#10291f] via-transparent to-transparent"/><div className="absolute bottom-10 left-10 max-w-md text-white"><p className="mb-3 text-sm uppercase tracking-[.25em] text-white/70">Barber Portal</p><h1 className="font-serif text-5xl leading-tight">Today's chair, handled with calm precision.</h1></div></section><section className="flex items-center justify-center"><div className="w-full max-w-md rounded-[28px] border border-border bg-card p-8 shadow-[0_24px_70px_rgba(31,74,55,.12)]"><div className="mb-8 flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><Scissors/></div><h1 className="font-serif text-4xl">Welcome back</h1><p className="mt-2 text-muted-foreground">Sign in to manage today's appointments.</p><label className="mt-8 block text-sm">Phone Number</label><input className="mt-2 h-14 w-full rounded-2xl border border-border bg-secondary px-4 outline-none focus:ring-2 focus:ring-primary" placeholder="+27 72 000 0000"/><label className="mt-4 block text-sm">Password</label><input type="password" className="mt-2 h-14 w-full rounded-2xl border border-border bg-secondary px-4 outline-none focus:ring-2 focus:ring-primary" placeholder="••••••••"/><button onClick={() => setScreen("queue")} className="mt-7 h-14 w-full rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-[#1F4A37]/20">Login</button><button className="mt-3 h-14 w-full rounded-2xl border border-border bg-card text-primary">Login with OTP</button></div></section></div>;
}

function Queue({ setScreen, barberStatus, customers, serviceStarted, setServiceStarted, completeService, selectCustomer }: { setScreen: (s: Screen) => void; barberStatus: string; customers: Customer[]; serviceStarted: boolean; setServiceStarted: (v: boolean) => void; completeService: () => void; selectCustomer: (i: number) => void }) {
  const active = customers[0];
  const next = customers[1];
  
  if (!active) {
      return (
          <>
            <header className="mb-6 flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm uppercase tracking-[.22em] text-muted-foreground">Monday, 21 June</p><h1 className="font-serif text-4xl text-[#18201C]">Good Morning, Langu 👋</h1>{barberStatus === "On Break" && <p className="mt-2 inline-flex rounded-full bg-[#F5E7C8] px-3 py-1 text-sm font-semibold text-[#7B5716]">Unavailable — no new appointments assigned</p>}</div><StatusToggle barberStatus={barberStatus} setScreen={setScreen}/></header>
            <div className="rounded-[28px] border border-border bg-card p-10 text-center shadow-[0_18px_45px_rgba(31,74,55,.08)]">
                <h2 className="font-serif text-3xl mb-2">No Appointments</h2>
                <p className="text-muted-foreground">You have no upcoming appointments in your queue.</p>
            </div>
          </>
      );
  }

  return <><header className="mb-6 flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm uppercase tracking-[.22em] text-muted-foreground">Monday, 21 June</p><h1 className="font-serif text-4xl text-[#18201C]">Good Morning, Langu 👋</h1>{barberStatus === "On Break" && <p className="mt-2 inline-flex rounded-full bg-[#F5E7C8] px-3 py-1 text-sm font-semibold text-[#7B5716]">Unavailable — no new appointments assigned</p>}</div><StatusToggle barberStatus={barberStatus} setScreen={setScreen}/></header><div className="grid gap-5 lg:grid-cols-[1.08fr_.92fr]"><section className="rounded-[28px] bg-primary p-6 text-white shadow-[0_26px_60px_rgba(31,74,55,.24)]"><p className="text-sm font-semibold tracking-[.24em] text-white/60">NOW SERVING</p><div className="mt-6 flex items-center gap-5"><img className="size-24 rounded-3xl object-cover" alt="Active customer" src={active.photo}/><div><h2 className="font-serif text-3xl">{active.name}</h2><p className="text-white/70">{active.service}</p><div className="mt-3"><StatusChip>{active.status}</StatusChip></div></div></div><div className="my-8 rounded-[24px] bg-white/10 p-6"><p className="text-sm text-white/60">Service Timer</p><div className="mt-2 font-serif text-7xl">{serviceStarted ? "08:42" : "00:00"}</div><div className="mt-4 grid grid-cols-2 gap-3 text-sm"><div className="rounded-2xl bg-white/10 p-4"><span className="text-white/50">Elapsed Time</span><b className="block text-lg">{serviceStarted ? "8 min" : "Not started"}</b></div><div className="rounded-2xl bg-white/10 p-4"><span className="text-white/50">Expected Duration</span><b className="block text-lg">{active.duration}</b></div></div></div><button onClick={() => serviceStarted ? completeService() : setServiceStarted(true)} className="h-16 w-full rounded-2xl bg-[#F7D9A1] font-semibold text-[#173629]"><Check className="mr-2 inline"/>{serviceStarted ? "Complete Service" : "Start Service"}</button></section><section className="rounded-[28px] border border-border bg-card p-5 shadow-[0_18px_45px_rgba(31,74,55,.08)]"><div className="mb-4 flex items-center justify-between"><div><p className="text-sm uppercase tracking-[.22em] text-muted-foreground">Today's Queue</p><h2 className="font-serif text-3xl">Who is next?</h2></div><span className="rounded-full bg-secondary px-4 py-2 text-sm">{customers.length} booked</span></div><div className="space-y-3">{customers.map((c, i) => <div key={c.name} className="rounded-3xl border border-border bg-[#FFFEFB] p-4 transition hover:-translate-y-0.5 hover:shadow-lg"><p className="mb-3 text-xs font-semibold uppercase tracking-[.22em] text-muted-foreground">{i === 0 ? "Now Serving" : i === 1 ? "Next" : "Upcoming"}</p><div className="flex items-center gap-4"><div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-white font-serif">{i + 1}</div><img className="size-12 rounded-2xl object-cover" alt={c.name} src={c.photo}/><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="truncate font-semibold">{c.name}</h3><StatusChip>{c.status}</StatusChip></div><p className="text-sm text-muted-foreground">{c.service} · {c.time} · {c.duration}</p></div>{i === 0 ? <button onClick={() => serviceStarted ? completeService() : setServiceStarted(true)} className="hidden rounded-2xl bg-primary px-4 py-3 text-sm text-white sm:block">{serviceStarted ? "Complete Service" : "Start Service"}</button> : <button onClick={() => { selectCustomer(i); setScreen("details"); }} className="hidden rounded-2xl bg-primary px-4 py-3 text-sm text-white sm:block">View Details</button>}<button onClick={() => { selectCustomer(i); setScreen("details"); }} className="rounded-2xl border border-border p-3"><MoreVertical size={18}/></button></div>{i === 0 && next && <p className="mt-3 text-sm text-muted-foreground">Next up: <b className="text-foreground">{next.name}</b> at {next.time}</p>}</div>)}</div></section></div></>;
}

function ModalScreen({ title, children, setScreen }: { title: string; children: ReactNode; setScreen: (s: Screen) => void }) { return <Shell screen="queue" setScreen={setScreen}><div className="mx-auto max-w-2xl rounded-[30px] border border-border bg-card p-6 shadow-[0_24px_70px_rgba(31,74,55,.12)]"><button onClick={() => setScreen("queue")} className="mb-4 rounded-full bg-secondary p-3"><X/></button><h1 className="font-serif text-4xl">{title}</h1><div className="mt-6">{children}</div></div></Shell>; }
function DetailCard({ customer }: { customer: Customer }) { return <div className="mb-5 flex items-center gap-4 rounded-3xl bg-secondary p-4"><img className="size-16 rounded-2xl object-cover" alt="Customer" src={customer.photo}/><div><b>{customer.name}</b><p className="text-sm text-muted-foreground">{customer.service} · Current {customer.time}</p></div></div>; }
function Change({ setScreen, customer }: { setScreen: (s: Screen) => void; customer: Customer }) { return <ModalScreen title="Change Time" setScreen={setScreen}><DetailCard customer={customer}/><div className="grid grid-cols-3 gap-3">{["+5 min", "+10 min", "+15 min"].map(x => <button className="h-14 rounded-2xl bg-secondary font-semibold" key={x}>{x}</button>)}</div><label className="mt-5 block text-sm">Custom Time</label><input className="mt-2 h-14 w-full rounded-2xl border border-border bg-background px-4" value="09:45" readOnly/><div className="my-5 rounded-3xl bg-[#E7EFE8] p-4 text-primary">Preview Updated Time: <b>09:45 — 10:30</b></div><textarea className="h-24 w-full rounded-2xl border border-border bg-background p-4" placeholder="Optional reason"/><button onClick={() => setScreen("details")} className="mt-4 h-14 w-full rounded-2xl bg-primary text-white">Update Time</button></ModalScreen>; }
function Transfer({ setScreen, customer }: { setScreen: (s: Screen) => void; customer: Customer }) { return <ModalScreen title="Transfer Appointment" setScreen={setScreen}><DetailCard customer={customer}/><div className="space-y-3">{barbers.map((b, i) => <button key={b.name} className={`flex w-full items-center gap-4 rounded-3xl border p-4 text-left ${i === 0 ? "border-primary bg-[#E7EFE8]" : "border-border bg-background"}`}><img className="size-14 rounded-2xl object-cover" alt={b.name} src={b.photo}/><span className="flex-1"><b>{b.name}</b><p className="text-sm text-muted-foreground">{b.state}</p></span><ChevronRight/></button>)}</div><textarea className="mt-4 h-24 w-full rounded-2xl border border-border bg-background p-4" placeholder="Optional reason"/><button onClick={() => setScreen("details")} className="mt-4 h-14 w-full rounded-2xl bg-primary text-white">Transfer Appointment</button></ModalScreen>; }
function Contact({ setScreen, customer }: { setScreen: (s: Screen) => void; customer: Customer }) { return <ModalScreen title="Contact Customer" setScreen={setScreen}><DetailCard customer={customer}/><button className="mb-3 flex h-20 w-full items-center justify-center rounded-3xl bg-primary text-lg text-white"><Phone className="mr-3"/>Call Customer</button><button className="flex h-20 w-full items-center justify-center rounded-3xl bg-[#DCE9DD] text-lg text-primary"><MessageCircle className="mr-3"/>WhatsApp Customer</button></ModalScreen>; }
function AppointmentDetails({ setScreen, customer, cancelAppt }: { setScreen: (s: Screen) => void; customer: Customer; cancelAppt: (id: string) => void }) { const rows = [["Phone Number", customer.phone], ["Service", customer.service], ["Duration", customer.duration], ["Appointment Time", customer.time]]; return <Shell screen="queue" setScreen={setScreen}><div className="mx-auto max-w-3xl rounded-[30px] border border-border bg-card p-6 shadow-[0_24px_70px_rgba(31,74,55,.12)]"><button onClick={() => setScreen("queue")} className="mb-4 rounded-full bg-secondary p-3"><X/></button><div className="flex flex-wrap items-center gap-5"><img className="size-24 rounded-3xl object-cover" alt={customer.name} src={customer.photo}/><div><h1 className="font-serif text-4xl">{customer.name}</h1><div className="mt-2"><StatusChip>{customer.status}</StatusChip></div></div></div><div className="mt-6 grid gap-3 sm:grid-cols-2">{rows.map(([label, value]) => <div key={label} className="rounded-2xl border border-border bg-background p-4"><p className="text-sm text-muted-foreground">{label}</p><b>{value}</b></div>)}</div><div className="mt-3 rounded-2xl bg-secondary p-4"><p className="text-sm text-muted-foreground">Customer Notes</p><p className="mt-1">{customer.notes}</p></div><div className="mt-5 grid gap-3 sm:grid-cols-2"><button onClick={() => setScreen("change")} className="h-14 rounded-2xl bg-secondary">Change Time</button><button onClick={() => setScreen("transfer")} className="h-14 rounded-2xl bg-secondary">Transfer Appointment</button><button onClick={() => setScreen("contact")} className="h-14 rounded-2xl bg-secondary">Contact Customer</button><button onClick={() => customer.id && cancelAppt(customer.id)} className="h-14 rounded-2xl bg-[#F1D7D2] text-[#8A2F24]">Cancel Appointment</button></div><button onClick={() => setScreen("queue")} className="mt-3 h-14 w-full rounded-2xl bg-primary text-white">Back to Queue</button></div></Shell>; }

function BreakManagement({ setScreen, startBreak }: { setScreen: (s: Screen) => void; startBreak: (mins: number) => void }) { const [mins, setMins] = useState(30); return <Shell screen="queue" setScreen={setScreen}><div className="mx-auto max-w-2xl rounded-[30px] border border-border bg-card p-6 shadow-[0_24px_70px_rgba(31,74,55,.12)]"><h1 className="font-serif text-4xl">Break Management</h1><div className="mt-5 flex justify-between rounded-3xl bg-secondary p-4"><span>Current Status</span><b className="text-primary">Available</b></div><p className="mt-5 text-sm font-semibold uppercase tracking-[.22em] text-muted-foreground">Choose Break Duration</p><div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">{[[15,"15 Minutes"],[30,"30 Minutes"],[45,"45 Minutes"],[60,"1 Hour"],[20,"Custom"]].map(([m, label]) => <button key={label} onClick={() => setMins(Number(m))} className={`h-14 rounded-2xl ${mins === Number(m) ? "bg-primary text-white" : "bg-secondary"}`}>{label}</button>)}</div><p className="mt-5 text-sm font-semibold uppercase tracking-[.22em] text-muted-foreground">Optional Reason</p><div className="mt-3 grid grid-cols-2 gap-3">{["Lunch", "Tea Break", "Emergency", "Personal", "Other"].map(r => <button key={r} className="h-12 rounded-2xl bg-secondary">{r}</button>)}</div><div className="mt-5 flex gap-3 rounded-3xl bg-[#F5E7C8] p-4 text-[#7B5716]"><AlertTriangle className="shrink-0"/><p>Appointments during your break may be delayed or reassigned. The manager will be notified and new appointments will not be assigned.</p></div><div className="mt-5 grid gap-3 sm:grid-cols-2"><button onClick={() => startBreak(mins)} className="h-14 rounded-2xl bg-primary text-white">Start Break</button><button onClick={() => setScreen("queue")} className="h-14 rounded-2xl border border-border bg-card">Cancel</button></div></div></Shell>; }
function ActiveBreak({ setScreen, resumeWork, remaining, extendBreak }: { setScreen: (s: Screen) => void; resumeWork: () => void; remaining: number; extendBreak: (m: number) => void }) { const mm = Math.floor(remaining / 60).toString().padStart(2, "0"); const ss = (remaining % 60).toString().padStart(2, "0"); return <Shell screen="queue" setScreen={setScreen}><div className="mx-auto max-w-2xl rounded-[30px] border border-border bg-card p-6 text-center shadow-[0_24px_70px_rgba(31,74,55,.12)]"><div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary text-white"><Coffee/></div><h1 className="mt-5 font-serif text-4xl">On Break</h1><p className="mt-2 text-muted-foreground">Break Started · Unavailable across the application</p><div className="my-8 rounded-[24px] bg-secondary p-6"><p className="text-sm text-muted-foreground">Remaining Time</p><div className="mt-2 font-serif text-7xl text-primary">{mm}:{ss}</div></div><p className="text-sm font-semibold uppercase tracking-[.22em] text-muted-foreground">Extend Break</p><div className="mt-3 grid grid-cols-4 gap-3">{[[10,"+10"],[15,"+15"],[30,"+30"],[5,"Custom"]].map(([m,l]) => <button onClick={() => extendBreak(Number(m))} key={l} className="h-12 rounded-2xl bg-secondary">{l}</button>)}</div><button onClick={resumeWork} className="mt-5 h-14 w-full rounded-2xl bg-primary text-white">Resume Work</button></div></Shell>; }

function Calendar({ setScreen, customers }: { setScreen: (s: Screen) => void; customers: Customer[] }) { return <Shell screen="calendar" setScreen={setScreen}><h1 className="font-serif text-4xl">Calendar</h1><div className="mt-6 grid gap-5 lg:grid-cols-[.9fr_1.1fr]"><div className="rounded-[28px] bg-card p-5 shadow-sm"><div className="grid grid-cols-7 gap-2 text-center text-sm text-muted-foreground">{"MTWTFSS".split("").map((d,i)=><span key={i}>{d}</span>)}{Array.from({length:35},(_,i)=><button key={i} className={`aspect-square rounded-2xl ${i===20?"bg-primary text-white":i%6===0?"bg-secondary":"hover:bg-secondary"}`}>{i+1}</button>)}</div></div><div className="rounded-[28px] bg-card p-5"><h2 className="font-serif text-3xl">Daily Schedule</h2>{customers.length === 0 ? <p className="mt-4 text-muted-foreground">No appointments today.</p> : customers.map(c=><div key={c.name} className="mt-3 flex items-center gap-4 rounded-3xl border border-border p-4"><Clock className="text-primary"/><div className="flex-1"><b>{c.time}</b><p className="text-muted-foreground">{c.name} — {c.service}</p></div><StatusChip>{c.status}</StatusChip></div>)}</div></div></Shell>; }
function Notifications({ setScreen }: { setScreen: (s: Screen) => void }) { const items=["Manager notified: barber on break","Appointment Cancelled","Customer On The Way","New Appointment","Running Late","Appointment Completed"]; return <Shell screen="notifications" setScreen={setScreen}><h1 className="font-serif text-4xl">Notifications</h1>{["Today","Yesterday","Earlier"].map((g,gi)=><section key={g} className="mt-6"><p className="mb-3 text-sm uppercase tracking-[.22em] text-muted-foreground">{g}</p>{items.slice(gi,gi+3).map(x=><div key={x} className="mb-3 rounded-3xl bg-card p-5 shadow-sm"><b>{x}</b><p className="text-sm text-muted-foreground">Mandla Khumalo · {gi+9}:15</p></div>)}</section>)}</Shell>; }
function Profile({ setScreen }: { setScreen: (s: Screen) => void }) { const opts=["My Profile","Service History","Availability & Working Hours","Transfer Requests","Help & Support","Logout"]; return <Shell screen="profile" setScreen={setScreen}><div className="rounded-[30px] bg-primary p-6 text-white"><img className="size-24 rounded-3xl object-cover" alt="Barber Langu" src="https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=220&h=220&fit=crop&auto=format"/><h1 className="mt-4 font-serif text-4xl">Langu Maseko</h1><p className="text-white/70"><Star className="inline fill-[#F7D9A1] text-[#F7D9A1]" size={18}/> 4.9 rating · 8 years experience</p></div><div className="mt-5 rounded-[28px] bg-card p-3">{opts.map(o=><button key={o} onClick={()=> o.startsWith("Availability") && setScreen("availability")} className="flex w-full items-center justify-between rounded-2xl p-5 hover:bg-secondary"><span>{o}</span>{o==="Logout"?<LogOut/>:<ChevronRight/>}</button>)}</div></Shell>; }
function Availability({ setScreen }: { setScreen: (s: Screen) => void }) { return <Shell screen="profile" setScreen={setScreen}><h1 className="font-serif text-4xl">Availability</h1><div className="mt-6 max-w-2xl rounded-[28px] bg-card p-6 shadow-sm"><div className="mb-5 flex justify-between rounded-3xl bg-secondary p-4"><span>Availability Toggle</span><b className="text-primary">Available</b></div>{["Working Hours 08:30 — 18:00","Break Hours 13:30 — 14:00","Days Off Sunday"].map(x=><div key={x} className="mb-3 rounded-2xl border border-border p-5">{x}</div>)}<button className="mt-3 h-14 w-full rounded-2xl bg-primary text-white">Save Changes</button></div></Shell>; }

export default function AppWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

// HARDCODED MOCK BARBER ID FOR PROOF OF CONCEPT (Langu Maseko)
const MOCK_BARBER_ID = "11111111-1111-1111-1111-111111111110";

function App() {
  const connect = useLiveStore((state) => state.connect);
  
  useEffect(() => {
    connect("ws://localhost:8000/ws");
  }, [connect]);

  const [screen, setScreen] = useState<Screen>("login");
  
  const { data: liveQueue, refetch } = useQuery({ 
    queryKey: ["barber-queue", MOCK_BARBER_ID], 
    queryFn: () => fetchBarberQueue(MOCK_BARBER_ID) 
  });
  
  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) => updateAppointmentStatus(id, status),
    onSuccess: () => refetch()
  });

  const queue = liveQueue || initialCustomers;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [serviceStarted, setServiceStarted] = useState(false);
  const [barberStatus, setBarberStatus] = useState("Available");
  const [remaining, setRemaining] = useState(0);
  useEffect(() => { if (screen !== "activeBreak" || remaining <= 0) return; const id = window.setInterval(() => setRemaining(v => Math.max(0, v - 1)), 1000); return () => window.clearInterval(id); }, [screen, remaining]);
  
  const selectedCustomer = queue[Math.min(selectedIndex, Math.max(0, queue.length - 1))] || initialCustomers[0];
  
  const completeService = () => { 
    if (queue.length > 0 && queue[0].id) {
        updateStatus.mutate({ id: queue[0].id, status: "COMPLETED" });
    }
    setServiceStarted(false); setSelectedIndex(0); 
  };
  
  const startService = () => {
    if (queue.length > 0 && queue[0].id) {
        updateStatus.mutate({ id: queue[0].id, status: "IN_CHAIR" });
    }
    setServiceStarted(true);
  };
  
  const startBreak = (mins: number) => { setBarberStatus("On Break"); setRemaining(mins * 60); setScreen("activeBreak"); };
  const resumeWork = () => { setBarberStatus("Available"); setRemaining(0); setScreen("queue"); };
  
  const cancelAppt = (id: string) => {
    updateStatus.mutate({ id, status: "CANCELLED" });
    setScreen("queue");
  };

  if (screen === "login") return <Login setScreen={setScreen}/>;
  if (screen === "details") return <AppointmentDetails setScreen={setScreen} customer={selectedCustomer} cancelAppt={cancelAppt} />;
  if (screen === "change") return <Change setScreen={setScreen} customer={selectedCustomer}/>;
  if (screen === "transfer") return <Transfer setScreen={setScreen} customer={selectedCustomer}/>;
  if (screen === "contact") return <Contact setScreen={setScreen} customer={selectedCustomer}/>;
  if (screen === "break") return <BreakManagement setScreen={setScreen} startBreak={startBreak}/>;
  if (screen === "activeBreak") return <ActiveBreak setScreen={setScreen} resumeWork={resumeWork} remaining={remaining} extendBreak={(m) => setRemaining(v => v + m * 60)}/>;
  if (screen === "calendar") return <Calendar setScreen={setScreen} customers={queue} />;
  if (screen === "notifications") return <Notifications setScreen={setScreen}/>;
  if (screen === "profile") return <Profile setScreen={setScreen}/>;
  if (screen === "availability") return <Availability setScreen={setScreen}/>;
  return <Shell screen="queue" setScreen={setScreen}><Queue setScreen={setScreen} barberStatus={barberStatus} customers={queue} serviceStarted={serviceStarted} setServiceStarted={startService} completeService={completeService} selectCustomer={setSelectedIndex}/></Shell>;
}
