'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
    LayoutDashboard,
    ShoppingBag,
    LogOut,
    Menu,
    X,
} from 'lucide-react'

export default function UserLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleLogout = () => {
        router.push('http://localhost:3000/')
    }

    return (
        <div className="min-h-screen bg-slate-100">
            <header className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white px-4 py-3 shadow flex items-center justify-between">
                <button onClick={() => setOpen(true)}>
                    <Menu />
                </button>
                <span className="text-lg font-extrabold text-cyan-600">
                    LaundryGo
                </span>
            </header>

            <div className="flex min-h-screen pt-14 md:pt-0">
                <aside className="hidden md:flex w-64 bg-gradient-to-b from-cyan-500 to-sky-600 text-white p-6 flex-col shadow-xl">
                    <div className="mb-10 text-2xl font-extrabold tracking-wide">
                        LaundryGo
                    </div>

                    <SidebarContent />

                    <button
                        onClick={handleLogout}
                        className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/20 text-red-100 hover:bg-red-500/30 transition"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </aside>

                {open && (
                    <>
                        <div
                            className="fixed inset-0 bg-black/40 z-40"
                            onClick={() => setOpen(false)}
                        />

                        <aside className="fixed z-50 top-0 left-0 h-full w-64 bg-gradient-to-b from-cyan-500 to-sky-600 text-white p-6 flex flex-col shadow-xl">
                            <div className="flex items-center justify-between mb-10">
                                <span className="text-xl font-extrabold">
                                    LaundryGo
                                </span>
                                <button onClick={() => setOpen(false)}>
                                    <X />
                                </button>
                            </div>

                            <SidebarContent close={() => setOpen(false)} />

                            <button
                                onClick={handleLogout}
                                className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/20 text-red-100 hover:bg-red-500/30 transition"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </aside>
                    </>
                )}

                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}

function SidebarContent({ close }: { close?: () => void }) {
    return (
        <nav className="space-y-2 text-sm">
            <Link
                href="/dashboard/user"
                onClick={close}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/20 font-medium"
            >
                <LayoutDashboard size={18} />
                Dashboard
            </Link>

            <Link
                href="/dashboard/user/order"
                onClick={close}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition"
            >
                <ShoppingBag size={18} />
                Pesan Laundry
            </Link>

            <Link
                href="/dashboard/user/alamat"
                onClick={close}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition"
            >
                <Menu size={18} />
                Alamat Saya
            </Link>
        </nav>
    )
}