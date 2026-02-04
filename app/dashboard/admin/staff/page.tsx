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
    Plus,
    Trash2
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

export default function StaffDashboard() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)

    const [nama, setNama] = useState("")
    const [jabatan, setJabatan] = useState("")
    const [cabang, setCabang] = useState("")
    const [telepon, setTelepon] = useState("")

    const [staff, setStaff] = useState<Staff[]>([])
    const [cabangList, setCabangList] = useState<string[]>([])

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

        const storedStaff = localStorage.getItem("staffList")
        if (storedStaff) {
            setStaff(JSON.parse(storedStaff))
        }

        const storedCabang = localStorage.getItem("cabangList")
        if (storedCabang) {
            const cabangParsed = JSON.parse(storedCabang)
            setCabangList(cabangParsed.map((c: any) => c.nama))
        }
    }, [router])

    const simpanStaff = (e: React.FormEvent) => {
        e.preventDefault()

        const newStaff: Staff = {
            id: Date.now(),
            nama,
            jabatan,
            cabang,
            telepon
        }

        const updated = [...staff, newStaff]
        setStaff(updated)
        localStorage.setItem("staffList", JSON.stringify(updated))

        setNama("")
        setJabatan("")
        setCabang("")
        setTelepon("")
    }

    const hapusStaff = (id: number) => {
        const filtered = staff.filter(s => s.id !== id)
        setStaff(filtered)
        localStorage.setItem("staffList", JSON.stringify(filtered))
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
                <h2 className="mb-6 text-3xl font-bold">Manajemen Staff</h2>

                <div className="mb-10 rounded-2xl border bg-white p-6 space-y-6">
                    <h3 className="flex items-center gap-2 font-bold">
                        <Plus size={18} />
                        Tambah Staff
                    </h3>

                    <form onSubmit={simpanStaff} className="grid gap-4 md:grid-cols-4">
                        <input value={nama} onChange={e => setNama(e.target.value)} placeholder="Nama Staff" required className="rounded-xl border px-4 py-3 text-sm" />
                        <input value={jabatan} onChange={e => setJabatan(e.target.value)} placeholder="Jabatan" required className="rounded-xl border px-4 py-3 text-sm" />
                        <select value={cabang} onChange={e => setCabang(e.target.value)} required className="rounded-xl border px-4 py-3 text-sm">
                            <option value="">Pilih Cabang</option>
                            {cabangList.map((c, i) => (
                                <option key={i} value={c}>{c}</option>
                            ))}
                        </select>
                        <input value={telepon} onChange={e => setTelepon(e.target.value)} placeholder="Telepon" required className="rounded-xl border px-4 py-3 text-sm" />

                        <button type="submit" className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 md:col-span-4">
                            Simpan Staff
                        </button>
                    </form>
                </div>

                <div className="rounded-2xl border bg-white">
                    <div className="border-b p-6 font-bold">Daftar Staff</div>
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-400">
                            <tr>
                                <th className="px-6 py-4 text-left">Nama</th>
                                <th className="px-6 py-4">Jabatan</th>
                                <th className="px-6 py-4">Cabang</th>
                                <th className="px-6 py-4">Telepon</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {staff.map(s => (
                                <tr key={s.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 font-medium">{s.nama}</td>
                                    <td className="px-6 py-4">{s.jabatan}</td>
                                    <td className="px-6 py-4">{s.cabang}</td>
                                    <td className="px-6 py-4">{s.telepon}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => hapusStaff(s.id)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={16} />
                                        </button>
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
