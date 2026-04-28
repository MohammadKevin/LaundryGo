"use client"

import { JSX, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    LayoutDashboard, Store, Users, FileText, Menu as MenuIcon, ChevronLeft,
    Plus, TrendingUp, Clock, MapPin, Search, Trash2, UserPlus, ShieldCheck,
    Bike, UserCog, Phone, Tags, Settings2
} from "lucide-react"

type AdminMenu = "dashboard" | "branch" | "staff" | "report"

interface Service {
    id: string
    name: string
    price: string
}

interface Branch {
    id: number
    name: string
    location: string
    services: Service[]
    status: "online" | "offline"
}

interface Staff {
    id: number
    name: string
    role: "Staff" | "Kurir"
    phone: string
    address: string
    branch: string
    status: "pending" | "approved"
}

export default function AdminPage(): JSX.Element {
    const [collapsed, setCollapsed] = useState<boolean>(false)
    const [activeMenu, setActiveMenu] = useState<AdminMenu>("dashboard")

    return (
        <div className="flex min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                activeMenu={activeMenu}
                setMenu={setActiveMenu}
            />

            <main className="flex-1 overflow-y-auto">
                <header className="sticky top-0 z-10 flex items-center justify-between bg-white/80 px-8 py-4 backdrop-blur-md border-b border-slate-100">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 capitalize">{activeMenu}</h1>
                        <p className="text-xs text-slate-400">Panel Administrator LaundryGoKu</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold border border-sky-200 shadow-sm">
                        AD
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
                            {activeMenu === "dashboard" && <Dashboard />}
                            {activeMenu === "branch" && <BranchPage />}
                            {activeMenu === "staff" && <StaffPage />}
                            {activeMenu === "report" && <ReportPage />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    )
}

interface AdminSidebarProps {
    collapsed: boolean
    setCollapsed: (v: boolean) => void
    activeMenu: AdminMenu
    setMenu: (m: AdminMenu) => void
}

function Sidebar({ collapsed, setCollapsed, activeMenu, setMenu }: AdminSidebarProps): JSX.Element {
    const menuItems: { id: AdminMenu; label: string; icon: JSX.Element }[] = [
        { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
        { id: "branch", label: "Cabang & Layanan", icon: <Store size={20} /> },
        { id: "staff", label: "Manajemen Staff", icon: <Users size={20} /> },
        { id: "report", label: "Laporan", icon: <FileText size={20} /> },
    ]

    return (
        <motion.div
            animate={{ width: collapsed ? 80 : 280 }}
            className="relative flex flex-col bg-white border-r border-slate-100 p-4 shadow-sm"
        >
            <div className="flex items-center justify-between px-2 mb-10 mt-2">
                {!collapsed && (
                    <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-sky-600 to-blue-500 bg-clip-text text-transparent">
                        LaundryGoKu
                    </h1>
                )}
                <button onClick={() => setCollapsed(!collapsed)} className="p-2 rounded-xl hover:bg-slate-50 text-slate-400">
                    {collapsed ? <MenuIcon size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setMenu(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group ${activeMenu === item.id ? "bg-sky-500 text-white shadow-lg shadow-sky-200" : "text-slate-500 hover:bg-slate-50"
                            }`}
                    >
                        <span className={`${activeMenu === item.id ? "text-white" : "text-slate-400 group-hover:text-sky-500"}`}>
                            {item.icon}
                        </span>
                        {!collapsed && <span className="font-semibold text-sm">{item.label}</span>}
                    </button>
                ))}
            </nav>
        </motion.div>
    )
}

function Dashboard(): JSX.Element {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Cabang" value="5" icon={<Store />} color="bg-blue-500" />
                <StatCard title="Personil" value="12" icon={<Users />} color="bg-indigo-500" />
                <StatCard title="Pendapatan" value="Rp 15.250.000" icon={<TrendingUp />} color="bg-emerald-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-black text-slate-800 flex items-center gap-2 text-lg">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            Cabang Aktif
                        </h3>
                        <button className="text-[10px] font-bold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-lg hover:bg-sky-100">
                            LIHAT SEMUA
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-separate border-spacing-y-2">
                            <thead>
                                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <th className="px-4 py-2">Outlet</th>
                                    <th className="px-4 py-2">Lokasi</th>
                                    <th className="px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { name: "Cabang Malang", loc: "Lowokwaru", status: "Online" },
                                    { name: "Cabang Surabaya", loc: "Gubeng", status: "Online" },
                                    { name: "Cabang Jakarta", loc: "Tebet", status: "Offline" },
                                ].map((item, i) => (
                                    <tr key={i} className="group bg-slate-50/50 hover:bg-white hover:shadow-md transition-all cursor-default">
                                        <td className="px-4 py-3 rounded-l-2xl text-xs font-bold text-slate-700">{item.name}</td>
                                        <td className="px-4 py-3 text-[11px] text-slate-500 font-medium">{item.loc}</td>
                                        <td className="px-4 py-3 rounded-r-2xl">
                                            <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg ${item.status === 'Online' ? 'bg-green-100 text-green-600' : 'bg-slate-200 text-slate-500'
                                                }`}>
                                                {item.status.toUpperCase()}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-black text-slate-800 flex items-center gap-2 text-lg">
                            <Clock size={18} className="text-sky-500" />
                            Order Terbaru
                        </h3>
                        <div className="h-8 w-8 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                            <Search size={14} />
                        </div>
                    </div>
                    <div className="space-y-3">
                        {[
                            { id: "#LG-8821", user: "Budi Santoso", type: "Cuci Setrika", weight: "5kg", status: "Proses" },
                            { id: "#LG-8820", user: "Sisca Kohl", type: "Cuci Kering", weight: "12kg", status: "Selesai" },
                            { id: "#LG-8819", user: "Raffi Ahmad", type: "Cuci Karpet", weight: "2pcs", status: "Dijemput" },
                        ].map((order, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 hover:bg-white hover:ring-1 hover:ring-slate-100 transition-all shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-sky-500 shadow-sm font-black text-[10px]">
                                        {order.id.split('-')[1]}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-800">{order.user}</p>
                                        <p className="text-[10px] text-slate-400 font-medium">{order.type} • {order.weight}</p>
                                    </div>
                                </div>
                                <div className={`text-[9px] font-black px-3 py-1.5 rounded-full ${order.status === 'Selesai' ? 'bg-emerald-100 text-emerald-600' :
                                    order.status === 'Proses' ? 'bg-sky-100 text-sky-600' : 'bg-amber-100 text-amber-600'
                                    }`}>
                                    {order.status.toUpperCase()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function BranchPage(): JSX.Element {
    const [newServices, setNewServices] = useState<Omit<Service, "id">[]>([{ name: "", price: "" }])
    const [branches, setBranches] = useState<Branch[]>([
        {
            id: 1,
            name: "Cabang Malang",
            location: "Lowokwaru",
            status: "online",
            services: [
                { id: "s1", name: "CUCI KERING", price: "7500" },
                { id: "s2", name: "CUCI SETRIKA", price: "10000" }
            ]
        },
        {
            id: 2,
            name: "Cabang Surabaya",
            location: "Gubeng",
            status: "offline",
            services: [
                { id: "s3", name: "CUCI KERING", price: "8000" }
            ]
        }
    ])

    const deleteBranch = (id: number) => {
        if (confirm("Apakah Anda yakin ingin menghapus cabang ini secara permanen?")) {
            setBranches(branches.filter(b => b.id !== id))
        }
    }

    const addNewServiceToBranch = (branchId: number) => {
        const serviceName = prompt("Nama Layanan:")
        const servicePrice = prompt("Harga per KG:")

        if (serviceName && servicePrice) {
            setBranches(branches.map(b => {
                if (b.id === branchId) {
                    const newService: Service = {
                        id: Math.random().toString(36).substr(2, 9),
                        name: serviceName.toUpperCase(),
                        price: servicePrice
                    }
                    return { ...b, services: [...b.services, newService] }
                }
                return b
            }))
        }
    }

    const deleteService = (branchId: number, serviceId: string) => {
        setBranches(branches.map(b => {
            if (b.id === branchId) {
                return { ...b, services: b.services.filter(s => s.id !== serviceId) }
            }
            return b
        }))
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm sticky top-28">
                <div className="mb-8">
                    <div className="h-12 w-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 mb-4">
                        <Plus size={24} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800">Tambah Cabang</h2>
                    <p className="text-xs text-slate-400 font-medium tracking-tight">Daftarkan outlet dan layanan pertamanya</p>
                </div>

                <div className="space-y-4">
                    <input className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-sky-500 outline-none transition-all" placeholder="Nama Cabang" />
                    <input className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-sky-500 outline-none transition-all" placeholder="Lokasi" />

                    <div className="space-y-3 pt-4 border-t border-slate-50">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-bold uppercase text-slate-400 ml-1 tracking-widest">Layanan Awal</label>
                            <button
                                onClick={() => setNewServices([...newServices, { name: "", price: "" }])}
                                className="text-[10px] font-black text-sky-600 bg-sky-50 px-2.5 py-1.5 rounded-lg hover:bg-sky-100"
                            >
                                + LAYANAN
                            </button>
                        </div>
                        {newServices.map((s, i) => (
                            <div key={i} className="flex gap-2">
                                <input className="flex-1 bg-slate-50 rounded-xl p-3 text-xs outline-none" placeholder="Nama Layanan" />
                                <input className="w-24 bg-slate-50 rounded-xl p-3 text-xs outline-none" placeholder="Harga" />
                                {newServices.length > 1 && (
                                    <button onClick={() => setNewServices(newServices.filter((_, idx) => idx !== i))} className="text-slate-300 hover:text-red-500"><Trash2 size={14} /></button>
                                )}
                            </div>
                        ))}
                    </div>
                    <button className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-2xl shadow-lg mt-4 active:scale-[0.98] transition-all">Simpan Cabang</button>
                </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
                <h2 className="text-xl font-black text-slate-800 px-2 flex items-center justify-between">
                    Daftar Cabang & Layanan
                    <span className="text-xs bg-slate-100 text-slate-500 px-3 py-1 rounded-full">{branches.length} Outlet</span>
                </h2>
                <div className="grid gap-6">
                    <AnimatePresence>
                        {branches.map((branch) => (
                            <motion.div
                                key={branch.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden transition-all hover:shadow-md"
                            >
                                <div className="p-6 border-b border-slate-50 bg-slate-50/40 flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-sky-500">
                                            <Store size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-slate-800 text-sm leading-tight">{branch.name}</h3>
                                            <p className="text-[10px] text-slate-400 flex items-center gap-1 font-bold uppercase tracking-wider mt-1"><MapPin size={10} /> {branch.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className={`h-2 w-2 rounded-full ${branch.status === 'online' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-slate-300'}`} />
                                        <button onClick={() => deleteBranch(branch.id)} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <Tags size={12} /> Kelola Layanan
                                        </span>
                                        <button
                                            onClick={() => addNewServiceToBranch(branch.id)}
                                            className="text-[10px] font-black text-sky-500 bg-sky-50 px-3 py-1.5 rounded-lg hover:bg-sky-100 flex items-center gap-1 transition-all"
                                        >
                                            <Plus size={12} /> TAMBAH LAYANAN
                                        </button>
                                    </div>

                                    <div className="grid gap-2">
                                        <AnimatePresence>
                                            {branch.services.map((service) => (
                                                <motion.div
                                                    key={service.id}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 20 }}
                                                    className="flex items-center justify-between p-3.5 bg-slate-50/50 rounded-2xl group transition-all hover:bg-white hover:ring-1 hover:ring-slate-100 hover:shadow-sm"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-sky-500 transition-colors">
                                                            <Settings2 size={14} />
                                                        </div>
                                                        <div>
                                                            <p className="text-[11px] font-black text-slate-700 uppercase tracking-tight">{service.name}</p>
                                                            <p className="text-[10px] text-slate-400 font-mono mt-0.5 font-bold">Rp {parseInt(service.price).toLocaleString()} /KG</p>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => deleteService(branch.id, service.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

function StaffPage(): JSX.Element {
    const [selectedRole, setSelectedRole] = useState<"Staff" | "Kurir">("Staff")
    const [staffList, setStaffList] = useState<Staff[]>([
        { id: 1, name: "Rudi Kurir", role: "Kurir", phone: "08123456789", address: "Jl. Merdeka No. 1", branch: "Cabang Malang", status: "approved" },
        { id: 2, name: "Siti Operator", role: "Staff", phone: "08198765432", address: "Jl. Mawar No. 12", branch: "Cabang Surabaya", status: "approved" },
    ])

    const deleteStaff = (id: number, name: string) => {
        if (confirm(`Hapus ${name} dari daftar personil?`)) {
            setStaffList(staffList.filter(s => s.id !== id))
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm sticky top-28">
                <div className="mb-8 flex items-center gap-4">
                    <div className="h-12 w-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 shadow-sm">
                        <UserPlus size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-slate-800 leading-tight">Registrasi Staff</h2>
                        <p className="text-xs text-slate-400 font-medium">Tambah personil secara manual</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <input className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-sky-500" placeholder="Nama Lengkap" />
                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm outline-none" placeholder="Nomor HP" />
                    </div>
                    <textarea className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 text-sm outline-none min-h-[80px]" placeholder="Alamat Lengkap" />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex bg-slate-50 p-1 rounded-2xl">
                            <button onClick={() => setSelectedRole("Staff")} className={`flex-1 py-2.5 rounded-xl text-[11px] font-bold transition-all ${selectedRole === "Staff" ? "bg-white text-sky-600 shadow-sm" : "text-slate-400"}`}>Staff</button>
                            <button onClick={() => setSelectedRole("Kurir")} className={`flex-1 py-2.5 rounded-xl text-[11px] font-bold transition-all ${selectedRole === "Kurir" ? "bg-white text-sky-600 shadow-sm" : "text-slate-400"}`}>Kurir</button>
                        </div>
                        <select className="bg-slate-50 border-none rounded-2xl px-4 text-[11px] font-bold outline-none cursor-pointer">
                            <option value="malang">Cabang Malang</option>
                            <option value="surabaya">Cabang Surabaya</option>
                        </select>
                    </div>
                    <button className="w-full bg-sky-500 text-white font-bold py-4 rounded-2xl shadow-lg mt-2 hover:bg-sky-600 active:scale-95 transition-all">Daftarkan Staff</button>
                </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
                <h2 className="text-xl font-black text-slate-800 px-2 flex items-center justify-between">
                    Personil Aktif
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input className="bg-white border-none rounded-xl py-2 pl-9 pr-4 text-xs shadow-sm outline-none w-40" placeholder="Cari..." />
                    </div>
                </h2>
                <div className="grid gap-4">
                    <AnimatePresence>
                        {staffList.map((s) => (
                            <motion.div
                                key={s.id}
                                layout
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                                whileHover={{ x: 5 }}
                                className="group bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all ${s.role === "Kurir" ? "bg-amber-50 text-amber-500 shadow-sm" : "bg-sky-50 text-sky-500 shadow-sm"}`}>
                                        {s.role === "Kurir" ? <Bike size={20} /> : <UserCog size={20} />}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-700 text-sm">{s.name}</h4>
                                        <p className="text-[10px] text-slate-400 font-medium tracking-tight mt-0.5">{s.phone} • {s.branch}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1 text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-tighter shadow-sm">
                                        <ShieldCheck size={14} /> Verified
                                    </div>
                                    <button
                                        onClick={() => deleteStaff(s.id, s.name)}
                                        className="p-2 text-slate-200 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

function ReportPage(): JSX.Element {
    return (
        <div className="h-[60vh] flex flex-col items-center justify-center bg-white rounded-[3rem] border border-dashed border-slate-200 text-center shadow-inner">
            <Clock size={40} className="text-slate-200 mb-4 animate-pulse" />
            <h2 className="text-xl font-bold text-slate-800">Laporan Segera Hadir</h2>
            <p className="text-xs text-slate-400 mt-2">Data transaksi sedang diolah sistem.</p>
        </div>
    )
}

interface StatCardProps {
    title: string
    value: string
    icon: JSX.Element
    color: string
}

function StatCard({ title, value, icon, color }: StatCardProps) {
    return (
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5 transition-all hover:-translate-y-1 hover:shadow-md">
            <div className={`h-14 w-14 rounded-2xl ${color} text-white flex items-center justify-center shadow-lg shadow-slate-100`}>{icon}</div>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</p>
                <h3 className="text-2xl font-black text-slate-800 mt-0.5 leading-none">{value}</h3>
            </div>
        </div>
    )
}