"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
    LayoutDashboard,
    Users,
    ClipboardList,
    LogOut,
    Search,
    Bell
} from "lucide-react"

type User = {
    username: string
    role: string
}

function SidebarItem({
    icon: Icon,
    label,
    active = false
}: {
    icon: any
    label: string
    active?: boolean
}) {
    return (
        <button className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
            active 
            ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
            : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        }`}>
            <Icon size={18} />
            {label}
        </button>
    )
}

export default function AdminDashboard() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const storedUser = localStorage.getItem("authUser")
        if (!storedUser) {
            router.push("/login")
            return
        }
        const parsedUser: User = JSON.parse(storedUser)
        if (parsedUser.role !== "admin") {
            router.push("/dashboard/user")
            return
        }
        setUser(parsedUser)
    }, [router])

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-400 animate-pulse">
                Loading workspace...
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-[#F8FAFC] text-slate-900 antialiased">
            <aside className="fixed h-screen w-72 border-r border-slate-200 bg-white/80 backdrop-blur-md px-8 py-10">
                <div className="flex items-center gap-3 px-2 mb-12">
                    <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">A</div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-800">
                        LaundryGo<span className="text-blue-600">Admin</span>
                    </h1>
                </div>

                <nav className="space-y-1.5">
                    <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Main Menu</p>
                    <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
                    <SidebarItem icon={Users} label="Manage Users" />
                    <SidebarItem icon={ClipboardList} label="Order History" />
                </nav>

                <div className="absolute bottom-10 left-8 right-8">
                    <button
                        onClick={() => {
                            localStorage.removeItem("authUser")
                            router.push("/")
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                    >
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>
            </aside>

            <main className="ml-72 flex-1 p-12">
                <header className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                            Welcome back, {user.username}! 👋
                        </h2>
                        <p className="mt-1 text-slate-500">
                            Here's what's happening with your platform today.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-blue-600 transition-all">
                            <Search size={20} />
                        </button>
                        <button className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-blue-600 transition-all">
                            <Bell size={20} />
                        </button>
                    </div>
                </header>

                {/* Stats Cards */}
                <div className="grid gap-8 md:grid-cols-3 mb-12">
                    {[
                        { title: "Total Users", value: "1,284", growth: "+12%" },
                        { title: "Active Staff", value: "12", growth: "0%" },
                        { title: "Monthly Orders", value: "342", growth: "+8%" },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="group relative rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
                        >
                            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                                {item.title}
                            </h3>
                            <div className="mt-4 flex items-end justify-between">
                                <p className="text-4xl font-bold text-slate-900 italic-nums">
                                    {item.value}
                                </p>
                                <span className="mb-1 text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">
                                    {item.growth}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Table Section */}
                <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="flex items-center justify-between border-b border-slate-50 p-8">
                        <h3 className="text-lg font-bold text-slate-800">Recent Users</h3>
                        <button className="text-sm font-semibold text-blue-600 hover:underline">View All</button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50 text-[11px] uppercase tracking-widest text-slate-400">
                                <tr>
                                    <th className="px-8 py-4 font-semibold">User Details</th>
                                    <th className="px-8 py-4 font-semibold">Role</th>
                                    <th className="px-8 py-4 font-semibold">Status</th>
                                    <th className="px-8 py-4 font-semibold text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {[
                                    { name: "Kevin", email: "kevin@nexus.com", role: "admin" },
                                    { name: "Dipta", email: "dipta@nexus.com", role: "staff" },
                                    { name: "Gibran", email: "gibran@nexus.com", role: "user" },
                                ].map((u, i) => (
                                    <tr key={i} className="group transition-colors hover:bg-slate-50/50">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-slate-100 to-slate-200 border border-white shadow-sm flex items-center justify-center font-bold text-slate-500">
                                                    {u.name[0]}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900">{u.name}</p>
                                                    <p className="text-xs text-slate-400">{u.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ${
                                                u.role === 'admin' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                                <span className="text-sm font-medium text-slate-600">Online</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button className="text-slate-400 hover:text-slate-900 transition-colors font-bold text-lg">···</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}