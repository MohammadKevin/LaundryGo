"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Store,
    Users,
    BarChart3,
    LogOut
} from "lucide-react"

type User = {
    username: string
    role: string
}

type Cabang = {
    id: number
    nama: string
    alamat: string
    telepon: string
}

type SidebarItemProps = {
    icon: React.ElementType
    label: string
    href: string
}

function SidebarItem({ icon: Icon, label, href }: SidebarItemProps) {
    const router = useRouter()
    const pathname = usePathname()
    const active = pathname === href

    return (
        <button
            onClick={() => router.push(href)}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition
            ${active
                    ? "bg-white/40 font-semibold text-blue-600"
                    : "text-slate-700 hover:bg-white/30 hover:text-slate-900"
                }`}
        >
            <Icon size={18} />
            {label}
        </button>
    )
}

export default function AdminDashboard() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [totalCabang, setTotalCabang] = useState<number>(0)

    useEffect(() => {
        const storedUser = localStorage.getItem("authUser")
        if (!storedUser) {
            router.push("/login")
            return
        }

        const parsed: User = JSON.parse(storedUser)
        if (parsed.role !== "admin") {
            router.push("/dashboard/user")
            return
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(parsed)

        const stored = localStorage.getItem("cabangList")
        const list: Cabang[] = stored ? JSON.parse(stored) : []
        setTotalCabang(list.length)
    }, [router])

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#c9f4ff] text-slate-400">
                Loading...
            </div>
        )
    }

    return (
        <div className="flex min-h-screen">
            <aside className="flex w-[260px] flex-col justify-between border-r border-[#5290a5] bg-[#37c2f0] p-6">
                <div>
                    <div className="mb-12 text-center">
                        <p className="text-3xl font-semibold text-[#287c91]">LaundryGo</p>
                        <p className="text-sm text-[#0c606e]">Admin Dashboard</p>
                    </div>

                    <nav className="space-y-2">
                        <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/dashboard/admin" />
                        <SidebarItem icon={Store} label="Branch" href="/dashboard/admin/branch" />
                        <SidebarItem icon={Users} label="Staff" href="/dashboard/admin/staff" />
                        <SidebarItem icon={BarChart3} label="Report" href="/dashboard/admin/laporan" />
                    </nav>
                </div>

                <button
                    onClick={() => {
                        localStorage.removeItem("authUser")
                        router.push("/")
                    }}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-red-500 transition hover:bg-white/30"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </aside>

            <main className="flex-1 p-10">
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-700">
                            Hallo, <span className="text-blue-600">Admin</span>
                        </h1>
                        <p className="text-slate-500">
                            Ringkasan aktivitas LaundryGo hari ini
                        </p>
                    </div>
                </div>

                <div className="mb-12 grid grid-cols-4 gap-6">
                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <p className="text-sm text-slate-500">Total Branches</p>
                        <p className="mt-3 text-3xl font-semibold">{totalCabang}</p>
                    </div>

                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <p className="text-sm text-slate-500">Total Staff</p>
                        <p className="mt-3 text-3xl font-semibold">20</p>
                    </div>

                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <p className="text-sm text-slate-500">Order this month</p>
                        <p className="mt-3 text-3xl font-semibold">139</p>
                    </div>

                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <p className="text-sm text-slate-500">Income</p>
                        <p className="mt-3 text-3xl font-semibold">Rp. 50.000.000</p>
                    </div>
                </div>

                <div className="rounded-2xl border bg-white shadow-sm">
                    <div className="border-b px-6 py-4">
                        <h2 className="text-lg font-semibold text-slate-700">
                            Transactions History
                        </h2>
                    </div>

                    <div className="max-h-[420px] overflow-y-auto">
                        <table className="w-full text-sm">
                            <thead className="sticky top-0 bg-slate-50">
                                <tr className="text-slate-600">
                                    <th className="px-6 py-3 text-left font-medium">No</th>
                                    <th className="px-6 py-3 text-left font-medium">Order Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: 20 }).map((_, i) => (
                                    <tr
                                        key={i}
                                        className="border-b last:border-none hover:bg-slate-50"
                                    >
                                        <td className="px-6 py-3">{i + 1}</td>
                                        <td className="px-6 py-3 font-medium text-slate-700">
                                            ORD-00{i + 1}
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