"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Home, ShoppingCart, MapPin, LogOut } from "lucide-react"
import { div } from "framer-motion/client"

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

        // eslint-disable-next-line react-hooks/set-state-in-effect
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

    function setAlamat(value: string): void {
        throw new Error("Function not implemented.")
    }

    function setPhone(value: string): void {
        throw new Error("Function not implemented.")
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

            <main className="flex-1 p-12">
                <h2 className="mb-6 text-[38px] text-[#1f6cc4]">
                    Hai, {user.username} 👋
                </h2>
                <p className="mb-10 text-[18px] text-slate-500">
                    Silahkan buat order di bawah ini
                </p>

                <div className="flex min-h-[90px] items-center justify-center">
                    <div className="w-[750px] rounded-2xl border border-gray-200 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] shadow-gray-100">
                        <h3 className="mb-6 text-[23px] font-semibold text-[#1f6cc4] text-center">
                            Form Order Laundry
                        </h3>

                        <form onSubmit={buatOrder} className="flex flex-col gap-6">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Layanan
                                </label>
                                <select
                                    value={layanan}
                                    onChange={(e) => setLayanan(e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                                >
                                    <option value="">Pilih layanan</option>
                                    <option value="cuci">Cuci</option>
                                    <option value="setrika">Setrika</option>
                                    <option value="cuci-setrika">Cuci + Setrika</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Berat (kg)
                                </label>
                                <input
                                    type="number"
                                    placeholder="Masukkan berat laundry"
                                    value={berat}
                                    onChange={(e) => setBerat(e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Alamat
                                </label>
                                <select
                                    value={""}
                                    onChange={(e) => setAlamat(e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                                >
                                    <option value="">Pilih Alamat</option>
                                    <option value="alamat">Jl. Jend. Sudirman No. 1 Kota Kediri</option>
                                    <option value="alamat2">Jl. Diponegoro No. 10 Kota Kediri</option>
                                    <option value="alamat3">Jl. Merdeka No. 5 Kota Kediri</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Phone
                                </label>
                                <select
                                    value={""}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                                >
                                    <option value="">Pilih Phone</option>
                                    <option value="phone1">08123456789</option>
                                    <option value="phone2">08987654321</option>
                                    <option value="phone3">08781234567</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="self-end rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition"
                            >
                                Buat Order
                            </button>
                        </form>
                    </div>
                </div>
            </main >
        </div>
    )
}
