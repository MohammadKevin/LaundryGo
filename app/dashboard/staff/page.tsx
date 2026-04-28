"use client"

import { JSX, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    LayoutDashboard,
    Inbox,
    RefreshCw,
    CheckCircle2,
    Menu as MenuIcon,
    ChevronLeft,
    WashingMachine,
    Wind,
    Shirt,
    Clock,
    Bell,
    Check,
    X,
    ArrowRight,
    MoreHorizontal
} from "lucide-react"

type StaffMenu = "dashboard" | "incoming" | "processing" | "done"
type OrderStatus = "pending" | "accepted" | "washing" | "drying" | "ironing" | "done"

interface Order {
    id: string
    customer: string
    service: string
    weight: number
    status: OrderStatus
    time: string
    priority: boolean
}

interface SidebarProps {
    collapsed: boolean
    setCollapsed: (v: boolean) => void
    activeMenu: StaffMenu
    setMenu: (m: StaffMenu) => void
}

export default function StaffPanel(): JSX.Element {
    const [collapsed, setCollapsed] = useState<boolean>(false)
    const [activeMenu, setActiveMenu] = useState<StaffMenu>("dashboard")

    const [orders, setOrders] = useState<Order[]>([
        { id: "LG-001", customer: "Adit Nugroho", service: "Cuci Setrika", weight: 4, status: "pending", time: "10:30", priority: true },
        { id: "LG-002", customer: "Sisca Kohl", service: "Cuci Kering", weight: 10, status: "washing", time: "09:00", priority: false },
        { id: "LG-003", customer: "Raffi Ahmad", service: "Setrika Saja", weight: 2, status: "ironing", time: "11:15", priority: false },
    ])

    const updateStatus = (id: string, newStatus: OrderStatus) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o))
    }

    return (
        <div className="flex min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} activeMenu={activeMenu} setMenu={setActiveMenu} />

            <main className="flex-1 overflow-y-auto">
                <header className="sticky top-0 z-20 flex items-center justify-between bg-white/80 px-8 py-4 backdrop-blur-md border-b border-slate-100">
                    <div>
                        <h1 className="text-xl font-black text-slate-900 capitalize">{activeMenu === 'incoming' ? 'Order Masuk' : activeMenu}</h1>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Operator: Mohammad Kevin</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 bg-slate-50 text-slate-400 rounded-xl relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-10 w-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-black shadow-lg shadow-sky-100">MK</div>
                    </div>
                </header>

                <div className="p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeMenu}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeMenu === "dashboard" && <StaffDashboard orders={orders} />}
                            {activeMenu === "incoming" && <IncomingOrders orders={orders} updateStatus={updateStatus} />}
                            {activeMenu === "processing" && <ProcessingOrders orders={orders} updateStatus={updateStatus} />}
                            {activeMenu === "done" && <CompletedOrders orders={orders} />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    )
}

function Sidebar({ collapsed, setCollapsed, activeMenu, setMenu }: SidebarProps): JSX.Element {
    const menuItems: { id: StaffMenu; label: string; icon: JSX.Element }[] = [
        { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
        { id: "incoming", label: "Order Masuk", icon: <Inbox size={20} /> },
        { id: "processing", label: "Proses Kerja", icon: <RefreshCw size={20} /> },
        { id: "done", label: "Selesai", icon: <CheckCircle2 size={20} /> },
    ]

    return (
        <motion.div animate={{ width: collapsed ? 80 : 280 }} className="relative flex flex-col bg-white border-r border-slate-100 p-4 shadow-sm">
            <div className="flex items-center justify-between px-2 mb-10 mt-2">
                {!collapsed && <h1 className="text-2xl font-black text-sky-600 tracking-tighter">LaundryGo</h1>}
                <button onClick={() => setCollapsed(!collapsed)} className="p-2 rounded-xl hover:bg-slate-50 text-slate-400">
                    {collapsed ? <MenuIcon size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>
            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                    <button key={item.id} onClick={() => setMenu(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group ${activeMenu === item.id ? "bg-sky-500 text-white shadow-lg shadow-sky-200" : "text-slate-500 hover:bg-slate-50"}`}
                    >
                        <span>{item.icon}</span>
                        {!collapsed && <span className="font-semibold text-sm">{item.label}</span>}
                    </button>
                ))}
            </nav>
        </motion.div>
    )
}

function StaffDashboard({ orders }: { orders: Order[] }) {
    const stats = [
        { label: "Total Tugas", value: orders.length, color: "bg-blue-500" },
        { label: "Perlu Diproses", value: orders.filter(o => o.status === "pending").length, color: "bg-amber-500" },
        { label: "Sedang Dicuci", value: orders.filter(o => o.status === "washing").length, color: "bg-sky-500" },
    ]

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-5">
                        <div className={`h-12 w-12 rounded-2xl ${s.color} text-white flex items-center justify-center shadow-lg`}>
                            <RefreshCw size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                            <h3 className="text-2xl font-black">{s.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100">
                <h3 className="font-black text-slate-800 mb-6 flex items-center gap-2"><Clock size={18} className="text-sky-500" /> Antrean Terlama</h3>
                <div className="space-y-4">
                    {orders.filter(o => o.status !== 'done').slice(0, 3).map(o => (
                        <div key={o.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                            <div className="flex gap-4">
                                <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center font-black text-xs text-sky-500 shadow-sm">{o.id.split('-')[1]}</div>
                                <div>
                                    <p className="text-sm font-black text-slate-800">{o.customer}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">{o.service} • {o.time}</p>
                                </div>
                            </div>
                            <span className="text-[9px] font-black px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-500">{o.status.toUpperCase()}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function IncomingOrders({ orders, updateStatus }: { orders: Order[], updateStatus: (id: string, s: OrderStatus) => void }) {
    const pending = orders.filter(o => o.status === "pending")

    return (
        <div className="space-y-6">
            <h2 className="text-lg font-black px-2 flex items-center gap-2"><Inbox size={20} className="text-amber-500" /> Permintaan Baru</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence>
                    {pending.map(o => (
                        <motion.div key={o.id} layout initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ opacity: 0 }} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
                            {o.priority && <div className="absolute top-0 right-0 bg-red-500 text-white text-[8px] font-black px-4 py-1 rotate-45 translate-x-3 translate-y-1">PRIORITAS</div>}
                            <div className="mb-6">
                                <h3 className="font-black text-slate-800">{o.customer}</h3>
                                <p className="text-xs text-slate-400 font-bold">{o.service} • {o.weight}kg</p>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => updateStatus(o.id, "accepted")} className="flex-1 bg-sky-500 text-white font-black py-3 rounded-xl text-[10px] tracking-widest hover:bg-sky-600 transition-all flex items-center justify-center gap-2"><Check size={14} /> TERIMA</button>
                                <button className="flex-1 bg-white text-red-500 border border-red-100 font-black py-3 rounded-xl text-[10px] tracking-widest hover:bg-red-50 transition-all flex items-center justify-center gap-2"><X size={14} /> TOLAK</button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}

function ProcessingOrders({ orders, updateStatus }: { orders: Order[], updateStatus: (id: string, s: OrderStatus) => void }) {
    const processing = orders.filter(o => o.status !== "pending" && o.status !== "done")

    return (
        <div className="space-y-6">
            <h2 className="text-lg font-black px-2 flex items-center gap-2"><RefreshCw size={20} className="text-sky-500" /> Sedang Dikerjakan</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {processing.map(o => (
                    <div key={o.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="font-black text-slate-800 leading-none mb-1">{o.customer}</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase">{o.service} • {o.weight}kg</p>
                            </div>
                            <button className="text-slate-300"><MoreHorizontal size={18} /></button>
                        </div>

                        <div className="flex justify-between mb-8 relative">
                            <div className="absolute top-4 left-0 right-0 h-[2px] bg-slate-100 -z-0"></div>
                            {["accepted", "washing", "drying", "ironing"].map((step, idx) => {
                                const isActive = o.status === step
                                const isDone = ["accepted", "washing", "drying", "ironing"].indexOf(o.status) > idx
                                return (
                                    <div key={step} className="relative z-10 flex flex-col items-center gap-2">
                                        <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${isDone ? 'bg-emerald-500 text-white' : isActive ? 'bg-sky-500 text-white scale-110 shadow-lg shadow-sky-100' : 'bg-slate-50 text-slate-300'}`}>
                                            {isDone ? <Check size={14} /> : idx === 1 ? <WashingMachine size={12} /> : idx === 2 ? <Wind size={12} /> : <Shirt size={12} />}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <button
                            onClick={() => {
                                const steps: OrderStatus[] = ["accepted", "washing", "drying", "ironing", "done"]
                                const currentIdx = steps.indexOf(o.status)
                                updateStatus(o.id, steps[currentIdx + 1])
                            }}
                            className="w-full bg-slate-800 text-white font-black py-4 rounded-2xl text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-black transition-all"
                        >
                            UPDATE KE {o.status === 'accepted' ? 'PENCUCIAN' : o.status === 'washing' ? 'PENGERINGAN' : o.status === 'drying' ? 'PENYETRIKAAN' : 'SELESAI'} <ArrowRight size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

function CompletedOrders({ orders }: { orders: Order[] }) {
    const done = orders.filter(o => o.status === "done")
    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100">
            <h2 className="text-lg font-black mb-6 flex items-center gap-2"><CheckCircle2 size={20} className="text-emerald-500" /> Pesanan Selesai</h2>
            <div className="space-y-3">
                {done.map(o => (
                    <div key={o.id} className="flex items-center justify-between p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                        <div className="flex gap-4">
                            <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm"><Check size={20} /></div>
                            <div>
                                <p className="text-sm font-black text-slate-800">{o.customer}</p>
                                <p className="text-[10px] font-bold text-slate-400">{o.service} • Selesai pada {o.time}</p>
                            </div>
                        </div>
                        <button className="text-[10px] font-black text-emerald-600 bg-white px-4 py-2 rounded-lg border border-emerald-100 shadow-sm">CETAK STRUK</button>
                    </div>
                ))}
                {done.length === 0 && <p className="text-center py-10 text-slate-400 text-xs font-bold uppercase tracking-widest">Belum ada pesanan selesai</p>}
            </div>
        </div>
    )
}