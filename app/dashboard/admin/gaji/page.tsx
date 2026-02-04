"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Store,
    Users,
    ClipboardList,
    BarChart3,
    LogOut,
    Plus
} from "lucide-react"

type User = {
    username: string
    role: string
}

type Staff = {
    id: number
    nama: string
    jabatan: string
    cabang: string
    telepon: string
}

type Gaji = {
    id: number
    staffId: number
    staffNama: string
    bulan: string
    pokok: number
    bonus: number
    potongan: number
    total: number
}

function SidebarItem({
    icon: Icon,
    label,
    href
}: {
    icon: any
    label: string
    href: string
}) {
    const router = useRouter()
    const pathname = usePathname()
    const active = pathname === href

    return (
        <button
            onClick={() => router.push(href)}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium
        ${active ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-100"}`}
        >
            <Icon size={18} />
            {label}
        </button>
    )
}

export default function GajiDashboard() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)

    const [staffList, setStaffList] = useState<Staff[]>([])
    const [gajiList, setGajiList] = useState<Gaji[]>([])

    const [staffId, setStaffId] = useState("")
    const [bulan, setBulan] = useState("")
    const [pokok, setPokok] = useState("")
    const [bonus, setBonus] = useState("")
    const [potongan, setPotongan] = useState("")

    const loadStaff = () => {
        const stored = localStorage.getItem("staffList")
        setStaffList(stored ? JSON.parse(stored) : [])
    }

    const loadGaji = () => {
        const stored = localStorage.getItem("gajiList")
        setGajiList(stored ? JSON.parse(stored) : [])
    }

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

        setUser(parsed)
        loadStaff()
        loadGaji()

        const sync = () => {
            loadStaff()
            loadGaji()
        }

        window.addEventListener("storage", sync)
        window.addEventListener("staff-updated", sync)
        window.addEventListener("gaji-updated", sync)

        return () => {
            window.removeEventListener("storage", sync)
            window.removeEventListener("staff-updated", sync)
            window.removeEventListener("gaji-updated", sync)
        }
    }, [router])

    const simpanGaji = (e: React.FormEvent) => {
        e.preventDefault()

        const staff = staffList.find(s => s.id === Number(staffId))
        if (!staff) return

        const total =
            Number(pokok || 0) +
            Number(bonus || 0) -
            Number(potongan || 0)

        const newGaji: Gaji = {
            id: Date.now(),
            staffId: staff.id,
            staffNama: staff.nama,
            bulan,
            pokok: Number(pokok),
            bonus: Number(bonus),
            potongan: Number(potongan),
            total
        }

        const updated = [...gajiList, newGaji]
        setGajiList(updated)
        localStorage.setItem("gajiList", JSON.stringify(updated))
        window.dispatchEvent(new Event("gaji-updated"))

        setStaffId("")
        setBulan("")
        setPokok("")
        setBonus("")
        setPotongan("")
    }

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center text-slate-400">
                Loading...
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-slate-100">
            <aside className="fixed h-screen w-72 border-r bg-white px-8 py-10">
                <div className="mb-12 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                        LG
                    </div>
                    <h1 className="text-xl font-bold">
                        LaundryGo <span className="text-blue-600">Admin</span>
                    </h1>
                </div>

                <nav className="space-y-2">
                    <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/dashboard/admin" />
                    <SidebarItem icon={Store} label="Cabang" href="/dashboard/admin/branch" />
                    <SidebarItem icon={Users} label="Staff" href="/dashboard/admin/staff" />
                    <SidebarItem icon={ClipboardList} label="Gaji" href="/dashboard/admin/gaji" />
                    <SidebarItem icon={BarChart3} label="Laporan" href="/dashboard/admin/laporan" />
                </nav>

                <div className="absolute bottom-10 left-8 right-8">
                    <button
                        onClick={() => {
                            localStorage.removeItem("authUser")
                            router.push("/")
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            <main className="ml-72 flex-1 p-12">
                <h2 className="mb-6 text-3xl font-bold">Manajemen Gaji</h2>

                <div className="mb-10 rounded-2xl border bg-white p-6 space-y-6">
                    <h3 className="flex items-center gap-2 font-bold">
                        <Plus size={18} />
                        Input Gaji
                    </h3>

                    <form onSubmit={simpanGaji} className="grid gap-4 md:grid-cols-5">
                        <select value={staffId} onChange={e => setStaffId(e.target.value)} required className="rounded-xl border px-4 py-3 text-sm">
                            <option value="">Pilih Staff</option>
                            {staffList.map(s => (
                                <option key={s.id} value={s.id}>{s.nama}</option>
                            ))}
                        </select>

                        <input type="month" value={bulan} onChange={e => setBulan(e.target.value)} required className="rounded-xl border px-4 py-3 text-sm" />
                        <input type="number" value={pokok} onChange={e => setPokok(e.target.value)} placeholder="Gaji Pokok" required className="rounded-xl border px-4 py-3 text-sm" />
                        <input type="number" value={bonus} onChange={e => setBonus(e.target.value)} placeholder="Bonus" className="rounded-xl border px-4 py-3 text-sm" />
                        <input type="number" value={potongan} onChange={e => setPotongan(e.target.value)} placeholder="Potongan" className="rounded-xl border px-4 py-3 text-sm" />

                        <button type="submit" className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 md:col-span-5">
                            Simpan Gaji
                        </button>
                    </form>
                </div>

                <div className="rounded-2xl border bg-white">
                    <div className="border-b p-6 font-bold">Riwayat Gaji</div>
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-400">
                            <tr>
                                <th className="px-6 py-4 text-left">Staff</th>
                                <th className="px-6 py-4">Bulan</th>
                                <th className="px-6 py-4">Pokok</th>
                                <th className="px-6 py-4">Bonus</th>
                                <th className="px-6 py-4">Potongan</th>
                                <th className="px-6 py-4 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {gajiList.map(g => (
                                <tr key={g.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 font-medium">{g.staffNama}</td>
                                    <td className="px-6 py-4">{g.bulan}</td>
                                    <td className="px-6 py-4">Rp {g.pokok.toLocaleString()}</td>
                                    <td className="px-6 py-4">Rp {g.bonus.toLocaleString()}</td>
                                    <td className="px-6 py-4">Rp {g.potongan.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right font-semibold">
                                        Rp {g.total.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}
