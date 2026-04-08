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
    alamat: string
    phone: string
}

type MenuItemProps = {
    icon: React.ElementType
    label: string
    href: string
}

function MenuItem({ icon: Icon, label, href }: MenuItemProps) {
    const router = useRouter()
    const pathname = usePathname()
    const active = pathname === href

    return (
        <button
            onClick={() => router.push(href)}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${active ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-100"}`}
        >
            <Icon size={18} />
            {label}
        </button>
    )
}

export default function UserDashboard() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [orders, setOrders] = useState<Order[]>([])

    useEffect(() => {
        const stored = localStorage.getItem("authUser")
        if (!stored) {
            router.push("/login")
            return
        }

        const parsed: User = JSON.parse(stored)
        if (parsed.role !== "user") {
            router.push("/dashboard/admin")
            return
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(parsed)

        const loadOrders = () => {
            const storedOrders = localStorage.getItem("orderList")
            if (storedOrders) {
                setOrders(JSON.parse(storedOrders))
            } else {
                setOrders([])
            }
        }

        loadOrders()
        window.addEventListener("order-updated", loadOrders)

        return () => {
            window.removeEventListener("order-updated", loadOrders)
        }
    }, [router])

    if (!user) {
        return <div className="flex min-h-screen items-center justify-center">Loading...</div>
    }

    const totalOrder = orders.length
    const totalHarga = orders.reduce((acc, o) => acc + o.total, 0)

    return (
        <div className="flex min-h-screen bg-slate-100">
            <aside className="w-72 border-r bg-white px-8 py-10">
                <h1 className="mb-10 text-xl font-bold text-blue-600">LaundryGo</h1>

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

            <main className="flex-1 p-12">
                <h2 className="text-3xl font-bold">Halo, {user.username}</h2>
                <p className="mt-2 text-slate-500">
                    Selamat datang di LaundryGo, silakan buat order laundry kamu
                </p>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-gray-800">Order Aktif</h3>
                        </div>

                        <p className="mt-3 text-2xl font-bold text-gray-900">
                            {totalOrder} Order
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-gray-800">Total Pengeluaran</h3>
                        </div>

                        <p className="mt-3 text-2xl font-bold text-gray-900">
                            Rp {totalHarga}
                        </p>
                    </div>

                </div>

                <div className="mt-20 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">
                        Riwayat Order
                    </h3>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="border-b bg-gray-50 text-left text-gray-600">
                                    <th className="px-4 py-3">No</th>
                                    <th className="px-4 py-3">Layanan</th>
                                    <th className="px-4 py-3">Berat</th>
                                    <th className="px-4 py-3">Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                                            Belum ada riwayat order.
                                        </td>
                                    </tr>
                                ) : (
                                    orders.map((o, i) => (
                                        <tr key={o.id} className="border-b">
                                            <td className="px-4 py-3">{i + 1}</td>
                                            <td className="px-4 py-3">{o.layanan}</td>
                                            <td className="px-4 py-3">{o.berat} kg</td>
                                            <td className="px-4 py-3">Rp {o.total}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}