"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Home, ShoppingCart, MapPin, LogOut } from "lucide-react"

type User = {
    username: string
    role: string
}

type Alamat = {
    id: number
    label: string
    detail: string
}

function MenuItem({ icon: Icon, label, href }: any) {
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

export default function AlamatPage() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)

    const [label, setLabel] = useState("")
    const [detail, setDetail] = useState("")
    const [alamat, setAlamat] = useState<Alamat[]>([])

    useEffect(() => {
        const storedUser = localStorage.getItem("authUser")
        if (!storedUser) {
            router.push("/login")
            return
        }

        const parsed = JSON.parse(storedUser)
        if (parsed.role !== "user") {
            router.push("/dashboard/admin")
            return
        }

        setUser(parsed)

        const storedAlamat = localStorage.getItem("alamatList")
        if (storedAlamat) {
            setAlamat(JSON.parse(storedAlamat))
        }
    }, [router])

    const simpanAlamat = (e: React.FormEvent) => {
        e.preventDefault()

        const newAlamat: Alamat = {
            id: Date.now(),
            label,
            detail
        }

        const updated = [...alamat, newAlamat]
        setAlamat(updated)
        localStorage.setItem("alamatList", JSON.stringify(updated))

        setLabel("")
        setDetail("")
    }

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading...
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-slate-100">
            {/* SIDEBAR */}
            <aside className="w-72 border-r bg-white px-8 py-10">
                <h1 className="mb-10 text-xl font-bold text-blue-600">
                    LaundryGo
                </h1>

                <nav className="space-y-2">
                    <MenuItem icon={Home} label="Dashboard" href="/dashboard/user" />
                    <MenuItem icon={ShoppingCart} label="Order" href="/dashboard/user/order" />
                    <MenuItem icon={MapPin} label="Alamat" href="/dashboard/user/alamat" />
                </nav>

                <button
                    onClick={() => {
                        localStorage.removeItem("authUser")
                        router.push("/")
                    }}
                    className="mt-10 flex items-center gap-3 text-sm text-red-500"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-12">
                <h2 className="mb-6 text-3xl font-bold">Alamat Saya</h2>

                <form onSubmit={simpanAlamat} className="mb-10 max-w-md space-y-4">
                    <input
                        value={label}
                        onChange={e => setLabel(e.target.value)}
                        placeholder="Rumah / Kos / Kantor"
                        required
                        className="w-full rounded-xl border px-4 py-3"
                    />
                    <textarea
                        value={detail}
                        onChange={e => setDetail(e.target.value)}
                        placeholder="Alamat lengkap"
                        required
                        className="w-full rounded-xl border px-4 py-3"
                    />
                    <button className="rounded-xl bg-blue-600 px-6 py-3 text-white">
                        Simpan Alamat
                    </button>
                </form>

                <div className="space-y-3 max-w-md">
                    {alamat.length === 0 && (
                        <div className="text-sm text-slate-500">
                            Belum ada alamat tersimpan
                        </div>
                    )}

                    {alamat.map(a => (
                        <div key={a.id} className="rounded-xl border bg-white p-4">
                            <p className="font-semibold">{a.label}</p>
                            <p className="text-sm text-slate-500">{a.detail}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}
