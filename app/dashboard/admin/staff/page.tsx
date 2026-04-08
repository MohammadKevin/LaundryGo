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
            className={`flex w-full items-center gap-[12px] px-[16px] py-[12px] text-left text-[15px] transition
            ${active ? "font-semibold text-blue-600" : "text-slate-600 hover:text-slate-900"}`}
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

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(parsed)

        const storedStaff = localStorage.getItem("staffList")
        if (storedStaff) {
            const parsedStaff: Staff[] = JSON.parse(storedStaff)
            setStaff(parsedStaff)
        }

        const storedCabang = localStorage.getItem("cabangList")
        if (storedCabang) {
            const parsedCabang: Cabang[] = JSON.parse(storedCabang)
            setCabangList(parsedCabang.map(c => c.nama))
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
            <div className="flex min-h-screen items-center justify-center bg-[#c9f4ff] text-slate-400">
                Loading...
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-[#ffffff]">
            <aside className="w-[250px] border-r border-[#5290a5] bg-[#37c2f0] p-[24px]">
                <div className="mb-[48px] text-center">
                    <p className="text-[28px] text-[#287c91]">LaundryGo</p>
                    <p className="text-[#0c606e] text-[14px]">Admin Page</p>
                </div>

                <nav className="space-y-[4px]">
                    <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/dashboard/admin" />
                    <SidebarItem icon={Store} label="Cabang" href="/dashboard/admin/branch" />
                    <SidebarItem icon={Users} label="Staff" href="/dashboard/admin/staff" />
                    <SidebarItem icon={BarChart3} label="Laporan" href="/dashboard/admin/laporan" />
                </nav>

                <button
                    onClick={() => {
                        localStorage.removeItem("authUser")
                        router.push("/")
                    }}
                    className="mt-[64px] flex items-center gap-[12px] text-red-500 text-[15px]"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </aside>

            <main className="flex-1 p-[40px]">
                <h1 className="text-[30px] font-semibold text-slate-700">
                    Manajemen Staff
                </h1>
                <p className="mb-[32px] text-slate-500 text-[14px]">
                    Kelola data staff LaundryGo
                </p>

                <div className="grid grid-cols-2 gap-[24px]">
                    <div className="rounded-[16px] bg-white p-[24px]">
                        <h3 className="mb-[16px] flex items-center gap-[8px] text-[16px] font-semibold">
                            <Plus size={16} />
                            Tambah Staff
                        </h3>

                        <form onSubmit={simpanStaff} className="space-y-[16px]">
                            <input value={nama} onChange={e => setNama(e.target.value)} placeholder="Nama Staff" className="w-full rounded-[12px] border px-[14px] py-[10px] text-[14px]" required />
                            <input value={jabatan} onChange={e => setJabatan(e.target.value)} placeholder="Jabatan" className="w-full rounded-[12px] border px-[14px] py-[10px] text-[14px]" required />

                            <select value={cabang} onChange={e => setCabang(e.target.value)} className="w-full rounded-[12px] border px-[14px] py-[10px] text-[14px]" required>
                                <option value="">Pilih Cabang</option>
                                {cabangList.map((c, i) => (
                                    <option key={i} value={c}>{c}</option>
                                ))}
                            </select>

                            <input value={telepon} onChange={e => setTelepon(e.target.value)} placeholder="Telepon" className="w-full rounded-[12px] border px-[14px] py-[10px] text-[14px]" required />

                            <button type="submit" className="w-full rounded-[12px] bg-blue-600 py-[10px] text-[14px] text-white">
                                Simpan Staff
                            </button>
                        </form>
                    </div>

                    <div className="rounded-[16px] bg-white">
                        <div className="border-b px-[20px] py-[14px] text-[15px] font-semibold">
                            Daftar Staff
                        </div>

                        <div className="max-h-[500px] overflow-y-auto">
                            {staff.map(s => (
                                <div key={s.id} className="flex items-center justify-between border-b px-[20px] py-[14px] text-[14px]">
                                    <div>
                                        <p className="font-semibold">{s.nama}</p>
                                        <p className="text-slate-500 text-[12px]">{s.jabatan} • {s.cabang}</p>
                                        <p className="text-slate-400 text-[12px]">{s.telepon}</p>
                                    </div>

                                    <button onClick={() => hapusStaff(s.id)} className="text-red-500">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}