"use client"

import { JSX, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    LayoutDashboard,
    Truck,
    MapPin,
    CheckCircle2,
    Menu as MenuIcon,
    ChevronLeft,
    Navigation,
    Phone,
    Package,
    Clock,
    Map as MapIcon,
    ChevronRight,
    Search,
    ArrowRight
} from "lucide-react"

type CourierMenu = "dashboard" | "tasks" | "history"
type TaskType = "PICKUP" | "DELIVERY"
type TaskStatus = "pending" | "on-way" | "completed"

interface Task {
    id: string
    customer: string
    address: string
    type: TaskType
    status: TaskStatus
    distance: string
    timeLimit: string
}

interface SidebarProps {
    collapsed: boolean
    setCollapsed: (val: boolean) => void
    activeMenu: CourierMenu
    setMenu: (menu: CourierMenu) => void
}

export default function CourierPanel(): JSX.Element {
    const [collapsed, setCollapsed] = useState<boolean>(false)
    const [activeMenu, setActiveMenu] = useState<CourierMenu>("dashboard")

    const [tasks, setTasks] = useState<Task[]>([
        { id: "TRK-901", customer: "Budi Santoso", address: "Jl. Merdeka No. 1, Malang", type: "PICKUP", status: "pending", distance: "1.2 km", timeLimit: "15 Menit" },
        { id: "TRK-902", customer: "Sisca Kohl", address: "Gedung Biru Lt. 2, Surabaya", type: "DELIVERY", status: "on-way", distance: "4.5 km", timeLimit: "ASAP" },
        { id: "TRK-903", customer: "Raffi Ahmad", address: "Andara Green Hills No. 5", type: "PICKUP", status: "pending", distance: "0.8 km", timeLimit: "30 Menit" },
    ])

    const updateTaskStatus = (id: string, newStatus: TaskStatus) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t))
    }

    return (
        <div className="flex min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} activeMenu={activeMenu} setMenu={setActiveMenu} />

            <main className="flex-1 overflow-y-auto">
                <header className="sticky top-0 z-20 flex items-center justify-between bg-white/80 px-8 py-4 backdrop-blur-md border-b border-slate-100">
                    <div>
                        <h1 className="text-xl font-black text-slate-900 capitalize">{activeMenu === 'tasks' ? 'Jemput & Antar' : activeMenu}</h1>
                        <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-1">
                            <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></span> Status: Online & Aktif
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-black text-slate-800">Rudi Kurir</p>
                            <p className="text-[10px] text-slate-400 font-bold">Plat: N 1234 ABC</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-black shadow-lg shadow-amber-100">RK</div>
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
                            {activeMenu === "dashboard" && <CourierDashboard tasks={tasks} setMenu={setActiveMenu} />}
                            {activeMenu === "tasks" && <TaskManagement tasks={tasks} updateStatus={updateTaskStatus} />}
                            {activeMenu === "history" && <CourierHistory tasks={tasks} />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    )
}

function Sidebar({ collapsed, setCollapsed, activeMenu, setMenu }: SidebarProps): JSX.Element {
    const menuItems: { id: CourierMenu; label: string; icon: JSX.Element }[] = [
        { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
        { id: "tasks", label: "Jemput & Antar", icon: <Truck size={20} /> },
        { id: "history", label: "Riwayat", icon: <CheckCircle2 size={20} /> },
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
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group ${activeMenu === item.id ? "bg-amber-500 text-white shadow-lg shadow-amber-200" : "text-slate-500 hover:bg-slate-50"}`}
                    >
                        <span>{item.icon}</span>
                        {!collapsed && <span className="font-semibold text-sm">{item.label}</span>}
                    </button>
                ))}
            </nav>
        </motion.div>
    )
}

function CourierDashboard({ tasks, setMenu }: { tasks: Task[], setMenu: (m: CourierMenu) => void }) {
    const activeTasksCount = tasks.filter(t => t.status !== 'completed').length

    return (
        <div className="space-y-8">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl">
                <div className="relative z-10">
                    <h2 className="text-2xl font-black mb-2">Semangat Pagi, Rudi!</h2>
                    <p className="text-slate-400 text-sm mb-6">Ada {activeTasksCount} tugas yang menunggu untuk diselesaikan.</p>
                    <button onClick={() => setMenu("tasks")} className="bg-amber-500 text-white font-black px-6 py-3 rounded-xl text-xs hover:bg-amber-600 transition-all flex items-center gap-2">LIHAT TUGAS SEKARANG <ChevronRight size={14} /></button>
                </div>
                <Truck className="absolute right-[-20px] bottom-[-20px] text-white/5 w-64 h-64 rotate-12" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatSimple label="Selesai" value="12" color="text-emerald-500" />
                <StatSimple label="Bensin" value="85%" color="text-sky-500" />
                <StatSimple label="Rating" value="4.9" color="text-amber-500" />
                <StatSimple label="Poin" value="1.250" color="text-indigo-500" />
            </div>

            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100">
                <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2"><MapIcon size={18} className="text-sky-500" /> Lokasi Terdekat</h3>
                <div className="h-48 bg-slate-100 rounded-3xl relative overflow-hidden flex items-center justify-center border-2 border-dashed border-slate-200">
                    <div className="text-center">
                        <Navigation className="text-sky-500 mx-auto mb-2 animate-bounce" size={32} />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Peta Sedang Dimuat...</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function TaskManagement({ tasks, updateStatus }: { tasks: Task[], updateStatus: (id: string, s: TaskStatus) => void }) {
    const activeTasks = tasks.filter(t => t.status !== "completed")

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
                <h2 className="text-lg font-black flex items-center gap-2"><Truck size={20} className="text-amber-500" /> Daftar Jemput & Antar</h2>
                <div className="bg-white px-3 py-1 rounded-full border border-slate-100 text-[10px] font-black text-slate-400">{activeTasks.length} TUGAS</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence>
                    {activeTasks.map(t => (
                        <motion.div key={t.id} layout initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm group">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`px-3 py-1 rounded-lg text-[9px] font-black tracking-widest ${t.type === 'PICKUP' ? 'bg-blue-50 text-blue-500' : 'bg-orange-50 text-orange-500'}`}>
                                    {t.type}
                                </div>
                                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                                    <Clock size={12} /> {t.timeLimit}
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div>
                                    <h3 className="font-black text-slate-800 text-lg leading-tight">{t.customer}</h3>
                                    <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-1"><MapPin size={12} /> {t.address}</p>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 bg-slate-50 w-fit px-3 py-1 rounded-lg">
                                    <Navigation size={12} /> {t.distance} dari lokasimu
                                </div>
                            </div>

                            <div className="flex gap-2">
                                {t.status === 'pending' ? (
                                    <button onClick={() => updateStatus(t.id, 'on-way')} className="flex-1 bg-slate-800 text-white font-black py-4 rounded-2xl text-[10px] tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2">
                                        MULAI JALAN <ArrowRight size={14} />
                                    </button>
                                ) : (
                                    <button onClick={() => updateStatus(t.id, 'completed')} className="flex-1 bg-emerald-500 text-white font-black py-4 rounded-2xl text-[10px] tracking-widest hover:bg-emerald-600 transition-all flex items-center justify-center gap-2">
                                        SELESAIKAN <CheckCircle2 size={14} />
                                    </button>
                                )}
                                <button className="h-12 w-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-sky-500 hover:bg-sky-50 transition-all"><Phone size={18} /></button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {activeTasks.length === 0 && (
                <div className="text-center py-20">
                    <div className="h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300"><CheckCircle2 size={40} /></div>
                    <h3 className="font-black text-slate-800">Semua Beres!</h3>
                    <p className="text-xs text-slate-400 mt-1">Belum ada tugas baru untukmu saat ini.</p>
                </div>
            )}
        </div>
    )
}

function CourierHistory({ tasks }: { tasks: Task[] }) {
    const history = tasks.filter(t => t.status === "completed")
    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="text-lg font-black mb-6 flex items-center gap-2 text-emerald-500"><CheckCircle2 size={20} /> Riwayat Tugas Selesai</h2>
            <div className="space-y-4">
                {history.map(t => (
                    <div key={t.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                        <div className="flex gap-4">
                            <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-slate-300"><Package size={20} /></div>
                            <div>
                                <p className="text-sm font-black text-slate-800">{t.customer}</p>
                                <p className="text-[10px] font-bold text-slate-400">{t.type} • {t.address.substring(0, 25)}...</p>
                            </div>
                        </div>
                        <div className="text-emerald-500 font-black text-[9px] uppercase">Berhasil</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function StatSimple({ label, value, color }: { label: string, value: string, color: string }) {
    return (
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm text-center">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
            <h4 className={`text-xl font-black ${color}`}>{value}</h4>
        </div>
    )
}