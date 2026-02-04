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

        setUser(parsedUser)

        const storedCabang = localStorage.getItem("cabangList")
        if (storedCabang) {
            const normalized = JSON.parse(storedCabang).map((c: any) => ({
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

        setLayananList([
            ...layananList,
            {
                id: Date.now(),
                nama: layananNama,
                harga: Number(layananHarga)
            }
        ])

        setLayananNama("")
        setLayananHarga("")
    }

    const hapusLayanan = (id: number) => {
        setLayananList(layananList.filter(l => l.id !== id))
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
                <h2 className="mb-6 text-3xl font-bold">Manajemen Cabang</h2>

                <div className="mb-10 rounded-2xl border bg-white p-6 space-y-6">
                    <h3 className="flex items-center gap-2 font-bold">
                        <Plus size={18} />
                        Tambah Cabang
                    </h3>

                    <form onSubmit={simpanCabang} className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-3">
                            <input value={nama} onChange={e => setNama(e.target.value)} placeholder="Nama Cabang" required className="rounded-xl border px-4 py-3 text-sm" />
                            <input value={telepon} onChange={e => setTelepon(e.target.value)} placeholder="Telepon" required className="rounded-xl border px-4 py-3 text-sm" />
                            <input value={alamat} onChange={e => setAlamat(e.target.value)} placeholder="Alamat" required className="rounded-xl border px-4 py-3 text-sm md:col-span-3" />
                        </div>

                        <div className="rounded-xl border p-4 space-y-4">
                            <p className="font-semibold">Layanan</p>

                            <div className="flex gap-3">
                                <input value={layananNama} onChange={e => setLayananNama(e.target.value)} placeholder="Cuci + Kering" className="flex-1 rounded-xl border px-4 py-2 text-sm" />
                                <input value={layananHarga} onChange={e => setLayananHarga(e.target.value)} placeholder="Harga" type="number" className="w-40 rounded-xl border px-4 py-2 text-sm" />
                                <button type="button" onClick={tambahLayanan} className="rounded-xl bg-slate-900 px-4 text-white">
                                    +
                                </button>
                            </div>

                            <div className="space-y-2">
                                {layananList.map(l => (
                                    <div key={l.id} className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2 text-sm">
                                        <span>{l.nama} — Rp {l.harga.toLocaleString()}</span>
                                        <button type="button" onClick={() => hapusLayanan(l.id)} className="text-red-500">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="w-full rounded-xl bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700">
                            Simpan Cabang
                        </button>
                    </form>
                </div>

                <div className="rounded-2xl border bg-white">
                    <div className="border-b p-6 font-bold">Daftar Cabang</div>
                    <div className="divide-y">
                        {cabang.map(c => (
                            <div key={c.id} className="p-6 space-y-2">
                                <p className="font-semibold">{c.nama}</p>
                                <p className="text-sm text-slate-500">{c.alamat} • {c.telepon}</p>
                                <ul className="mt-2 list-disc pl-5 text-sm">
                                    {(c.layanan || []).map(l => (
                                        <li key={l.id}>
                                            {l.nama} — Rp {l.harga.toLocaleString()}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}
