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

type Alamat = {
    id: number
    label: string
    provinsi: string
    kota: string
    kecamatan: string
    kelurahan: string
    detail: string
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

export default function OrderPage() {
    const router = useRouter()

    const [user, setUser] = useState<User | null>(null)
    const [layanan, setLayanan] = useState("")
    const [berat, setBerat] = useState("")
    const [alamat, setAlamat] = useState("")
    const [phone, setPhone] = useState("")
    const [orders, setOrders] = useState<Order[]>([])
    const [alamatList, setAlamatList] = useState<Alamat[]>([])

    useEffect(() => {
        const storedUser = localStorage.getItem("authUser")
        if (!storedUser) {
            router.push("/login")
            return
        }

        const parsed: User = JSON.parse(storedUser)
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

    useEffect(() => {
        const loadAlamat = () => {
            const storedAlamat = localStorage.getItem("alamatList")
            if (storedAlamat) {
                setAlamatList(JSON.parse(storedAlamat))
            } else {
                setAlamatList([])
            }
        }

        loadAlamat()

        window.addEventListener("alamat-updated", loadAlamat)

        return () => {
            window.removeEventListener("alamat-updated", loadAlamat)
        }
    }, [])

    const handlePilihAlamat = (id: number) => {
        const found = alamatList.find(a => a.id === id)
        if (found) {
            const fullAlamat = `${found.label} - ${found.detail}, ${found.kelurahan}, ${found.kecamatan}, ${found.kota}, ${found.provinsi}`
            setAlamat(fullAlamat)
        }
    }

    const buatOrder = (e: React.FormEvent) => {
        e.preventDefault()

        const total = Number(berat) * 7000

        const newOrder: Order = {
            id: Date.now(),
            layanan,
            berat: Number(berat),
            total,
            alamat,
            phone
        }

        const updated = [...orders, newOrder]
        setOrders(updated)
        localStorage.setItem("orderList", JSON.stringify(updated))

        window.dispatchEvent(new Event("order-updated"))

        setLayanan("")
        setBerat("")
        setAlamat("")
        setPhone("")
    }

    if (!user) {
        return <div className="flex min-h-screen items-center justify-center">Loading...</div>
    }

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
                <h2 className="mb-6 text-[38px] text-[#1f6cc4]">
                    Hai, {user.username} 👋
                </h2>

                <div className="flex justify-center">
                    <div className="w-[750px] rounded-2xl border bg-white p-8 shadow">

                        <form onSubmit={buatOrder} className="flex flex-col gap-6">

                            <select value={layanan} onChange={(e) => setLayanan(e.target.value)} className="rounded-xl border px-4 py-3">
                                <option value="">Pilih layanan</option>
                                <option value="cuci">Cuci</option>
                                <option value="setrika">Setrika</option>
                                <option value="cuci-setrika">Cuci + Setrika</option>
                            </select>

                            <input
                                type="number"
                                value={berat}
                                onChange={(e) => setBerat(e.target.value)}
                                className="rounded-xl border px-4 py-3"
                            />

                            <select
                                onChange={(e) => handlePilihAlamat(Number(e.target.value))}
                                className="rounded-xl border px-4 py-3"
                            >
                                <option value="">Pilih Alamat</option>
                                {alamatList.map((a) => (
                                    <option key={a.id} value={a.id}>
                                        {a.label}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Masukkan nomor HP"
                                className="rounded-xl border px-4 py-3"
                            />

                            <button className="bg-blue-600 text-white py-3 rounded-xl">
                                Buat Order
                            </button>

                        </form>

                    </div>
                </div>
            </main>
        </div>
    )
}