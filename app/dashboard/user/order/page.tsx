"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Home, ShoppingCart, MapPin, LogOut } from "lucide-react"

type User = {
    username: string
    role: string
}

type Order = {
    id: number
    layanan: string
    berat: number
    total: number
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

export default function OrderPage() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)

    const [layanan, setLayanan] = useState("")
    const [berat, setBerat] = useState("")
    const [orders, setOrders] = useState<Order[]>([])

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

        const storedOrders = localStorage.getItem("orderList")
        if (storedOrders) {
            setOrders(JSON.parse(storedOrders))
        }
    }, [router])

    const buatOrder = (e: React.FormEvent) => {
        e.preventDefault()

        const total = Number(berat) * 7000

        const newOrder: Order = {
            id: Date.now(),
            layanan,
            berat: Number(berat),
            total
        }

        const updated = [...orders, newOrder]
        setOrders(updated)
        localStorage.setItem("orderList", JSON.stringify(updated))
        window.dispatchEvent(new Event("order-updated"))

        setLayanan("")
        setBerat("")
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
                <h2 className="mb-6 text-3xl font-bold">Order Laundry</h2>

                <form onSubmit={buatOrder} className="mb-10 max-w-md space-y-4">
                    <input
                        value={layanan}
                        onChange={e => setLayanan(e.target.value)}
                        placeholder="Layanan (Cuci + Kering)"
                        required
                        className="w-full rounded-xl border px-4 py-3"
                    />
                    <input
                        type="number"
                        value={berat}
                        onChange={e => setBerat(e.target.value)}
                        placeholder="Berat (kg)"
                        required
                        className="w-full rounded-xl border px-4 py-3"
                    />
                    <button className="rounded-xl bg-blue-600 px-6 py-3 text-white">
                        Buat Order
                    </button>
                </form>

                <div className="rounded-xl border bg-white">
                    <div className="border-b p-4 font-semibold">
                        Riwayat Order
                    </div>

                    {orders.length === 0 && (
                        <div className="p-4 text-sm text-slate-500">
                            Belum ada order
                        </div>
                    )}

                    {orders.map(o => (
                        <div key={o.id} className="border-t p-4">
                            <p className="font-medium">{o.layanan}</p>
                            <p className="text-sm text-slate-500">
                                {o.berat} kg • Rp {o.total.toLocaleString("id-ID")}
                            </p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}
