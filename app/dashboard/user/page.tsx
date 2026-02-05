"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Home, ShoppingCart, MapPin, LogOut } from "lucide-react"

type User = {
    username: string
    role: string
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

export default function UserDashboard() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const stored = localStorage.getItem("authUser")
        if (!stored) {
            router.push("/login")
            return
        }

        const parsed = JSON.parse(stored)
        if (parsed.role !== "user") {
            router.push("/dashboard/admin")
            return
        }

        setUser(parsed)
    }, [router])

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
                <h2 className="text-3xl font-bold">Halo, {user.username}</h2>
                <p className="mt-2 text-slate-500">
                    Selamat datang di LaundryGo, silakan buat order laundry kamu
                </p>
            </main>
        </div>
    )
}
