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

type Layanan = {
    id: number
    nama: string
    harga: number
}

type Cabang = {
    id: number
    nama: string
    alamat: string
    telepon: string
    layanan: Layanan[]
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

export default function BranchDashboard() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)

    const [nama, setNama] = useState("")
    const [alamat, setAlamat] = useState("")
    const [telepon, setTelepon] = useState("")

    const [layananNama, setLayananNama] = useState("")
    const [layananHarga, setLayananHarga] = useState("")
    const [layananList, setLayananList] = useState<Layanan[]>([])

    const [cabang, setCabang] = useState<Cabang[]>([])

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

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(parsedUser)

        const storedCabang = localStorage.getItem("cabangList")
        if (storedCabang) {
            const parsed = JSON.parse(storedCabang) as Cabang[]
            const normalized = parsed.map((c) => ({
                id: c.id,
                nama: c.nama,
                alamat: c.alamat,
                telepon: c.telepon,
                layanan: Array.isArray(c.layanan) ? c.layanan : []
            }))
            setCabang(normalized)
        }
    }, [router])

    const tambahLayanan = () => {
        if (!layananNama || !layananHarga) return

        const newItem: Layanan = {
            id: Date.now(),
            nama: layananNama,
            harga: Number(layananHarga)
        }

        setLayananList((prev) => [...prev, newItem])
        setLayananNama("")
        setLayananHarga("")
    }

    const hapusLayanan = (id: number) => {
        setLayananList((prev) => prev.filter((l) => l.id !== id))
    }

    const simpanCabang = (e: React.FormEvent) => {
        e.preventDefault()
        if (layananList.length === 0) return

        const newCabang: Cabang = {
            id: Date.now(),
            nama,
            alamat,
            telepon,
            layanan: layananList
        }

        const updated = [...cabang, newCabang]
        setCabang(updated)
        localStorage.setItem("cabangList", JSON.stringify(updated))
        window.dispatchEvent(new Event("cabang-updated"))

        setNama("")
        setAlamat("")
        setTelepon("")
        setLayananList([])
    }

    const hapusCabang = (id: number) => {
        const filtered = cabang.filter(c => c.id !== id)
        setCabang(filtered)
        localStorage.setItem("cabangList", JSON.stringify(filtered))
        window.dispatchEvent(new Event("cabang-updated"))
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
                    Manajemen Cabang
                </h1>
                <p className="mb-[32px] text-slate-500 text-[14px]">
                    Kelola data cabang dan layanan LaundryGo
                </p>

                <div className="grid grid-cols-2 gap-[24px] mb-[40px]">
                    <div className="rounded-[16px] bg-white p-[24px]">
                        <h3 className="mb-[16px] flex items-center gap-[8px] text-[16px] font-semibold">
                            <Plus size={16} />
                            Tambah Cabang
                        </h3>

                        <form onSubmit={simpanCabang} className="space-y-[16px]">
                            <input value={nama} onChange={e => setNama(e.target.value)} placeholder="Nama Cabang" className="w-full rounded-[12px] border px-[14px] py-[10px] text-[14px]" required />
                            <input value={telepon} onChange={e => setTelepon(e.target.value)} placeholder="Telepon" className="w-full rounded-[12px] border px-[14px] py-[10px] text-[14px]" required />
                            <input value={alamat} onChange={e => setAlamat(e.target.value)} placeholder="Alamat" className="w-full rounded-[12px] border px-[14px] py-[10px] text-[14px]" required />

                            <div className="rounded-[12px] border p-[16px] space-y-[12px]">
                                <p className="text-[14px] font-medium">Layanan</p>

                                <div className="flex gap-[8px]">
                                    <input value={layananNama} onChange={e => setLayananNama(e.target.value)} placeholder="Nama layanan" className="flex-1 rounded-[10px] border px-[10px] py-[8px] text-[13px]" />
                                    <input value={layananHarga} onChange={e => setLayananHarga(e.target.value)} placeholder="Harga" type="number" className="w-[120px] rounded-[10px] border px-[10px] py-[8px] text-[13px]" />
                                    <button type="button" onClick={tambahLayanan} className="rounded-[10px] bg-slate-900 px-[12px] text-white">
                                        +
                                    </button>
                                </div>

                                <div className="space-y-[6px]">
                                    {layananList.map(l => (
                                        <div key={l.id} className="flex items-center justify-between rounded-[10px] bg-slate-50 px-[10px] py-[8px] text-[13px]">
                                            <span>{l.nama} — Rp {l.harga.toLocaleString()}</span>
                                            <button type="button" onClick={() => hapusLayanan(l.id)} className="text-red-500">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button type="submit" className="w-full rounded-[12px] bg-blue-600 py-[10px] text-[14px] text-white">
                                Simpan Cabang
                            </button>
                        </form>
                    </div>

                    <div className="rounded-[16px] bg-white">
                        <div className="border-b px-[20px] py-[14px] text-[15px] font-semibold">
                            Daftar Cabang
                        </div>

                        <div className="max-h-[500px] overflow-y-auto">
                            {cabang.map(c => (
                                <div key={c.id} className="flex items-start justify-between border-b px-[20px] py-[14px] text-[14px]">
                                    <div>
                                        <p className="font-semibold">{c.nama}</p>
                                        <p className="text-slate-500 text-[12px]">{c.alamat}</p>
                                        <p className="text-slate-400 text-[12px]">{c.telepon}</p>

                                        <ul className="mt-[6px] text-[13px]">
                                            {c.layanan.map(l => (
                                                <li key={l.id}>
                                                    {l.nama} — Rp {l.harga.toLocaleString()}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <button
                                        onClick={() => {
                                            if (confirm("Yakin hapus cabang ini?")) {
                                                hapusCabang(c.id)
                                            }
                                        }}
                                        className="text-red-500 hover:text-red-700"
                                    >
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