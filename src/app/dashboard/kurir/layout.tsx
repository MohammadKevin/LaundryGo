'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import {
    Menu,
    X,
    LayoutDashboard,
    Package,
    Truck,
    LogOut,
} from 'lucide-react'

export default function KurirLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    const logout = () => {
        router.push('/')
    }

    return (
        <div className="h-screen bg-slate-100 overflow-hidden">
            {/* MOBILE HEADER */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white h-14 px-4 shadow flex items-center justify-between">
                <button onClick={() => setOpen(true)}>
                    <Menu />
                </button>
                <span className="font-extrabold text-cyan-600">
                    LaundryGo Kurir
                </span>
            </header>

            <div className="flex h-full">
                {/* SIDEBAR DESKTOP */}
                <aside className="hidden md:flex w-64 bg-gradient-to-b from-cyan-600 to-sky-700 text-white flex-col">
                    <div className="h-16 flex items-center px-6 text-xl font-extrabold border-b border-white/20">
                        LaundryGo Kurir
                    </div>

                    <nav className="flex-1 px-3 py-6 space-y-1 text-sm">
                        <SidebarItem
                            href="/dashboard/kurir"
                            label="Dashboard"
                            icon={<LayoutDashboard size={18} />}
                            active={pathname === '/dashboard/kurir'}
                        />
                        <SidebarItem
                            href="/dashboard/kurir/pickup"
                            label="Penjemputan"
                            icon={<Package size={18} />}
                            active={pathname === '/dashboard/kurir/pickup'}
                        />
                        <SidebarItem
                            href="/dashboard/kurir/delivery-laundry"
                            label="Antar ke Laundry"
                            icon={<Truck size={18} />}
                            active={
                                pathname ===
                                '/dashboard/kurir/delivery-laundry'
                            }
                        />
                        <SidebarItem
                            href="/dashboard/kurir/delivery-user"
                            label="Antar ke Pelanggan"
                            icon={<Package size={18} />}
                            active={
                                pathname ===
                                '/dashboard/kurir/delivery-user'
                            }
                        />
                    </nav>

                    <div className="p-4 border-t border-white/20">
                        <button
                            onClick={logout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/90 hover:bg-red-600 transition font-bold"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </aside>

                {/* MOBILE SIDEBAR */}
                {open && (
                    <>
                        <div
                            className="fixed inset-0 bg-black/50 z-40"
                            onClick={() => setOpen(false)}
                        />

                        <aside className="fixed z-50 top-0 left-0 h-full w-64 bg-gradient-to-b from-cyan-600 to-sky-700 text-white flex flex-col">
                            <div className="h-16 flex items-center justify-between px-6 text-lg font-extrabold border-b border-white/20">
                                LaundryGo Kurir
                                <button onClick={() => setOpen(false)}>
                                    <X />
                                </button>
                            </div>

                            <nav className="flex-1 px-3 py-6 space-y-1 text-sm">
                                <SidebarItem
                                    href="/dashboard/kurir"
                                    label="Dashboard"
                                    icon={<LayoutDashboard size={18} />}
                                    active={pathname === '/dashboard/kurir'}
                                    onClick={() => setOpen(false)}
                                />
                                <SidebarItem
                                    href="/dashboard/kurir/pickup"
                                    label="Penjemputan"
                                    icon={<Package size={18} />}
                                    active={
                                        pathname ===
                                        '/dashboard/kurir/pickup'
                                    }
                                    onClick={() => setOpen(false)}
                                />
                                <SidebarItem
                                    href="/dashboard/kurir/delivery-laundry"
                                    label="Antar ke Laundry"
                                    icon={<Truck size={18} />}
                                    active={
                                        pathname ===
                                        '/dashboard/kurir/delivery-laundry'
                                    }
                                    onClick={() => setOpen(false)}
                                />
                                <SidebarItem
                                    href="/dashboard/kurir/delivery-user"
                                    label="Antar ke Pelanggan"
                                    icon={<Package size={18} />}
                                    active={
                                        pathname ===
                                        '/dashboard/kurir/delivery-user'
                                    }
                                    onClick={() => setOpen(false)}
                                />
                            </nav>

                            <div className="p-4 border-t border-white/20">
                                <button
                                    onClick={logout}
                                    className="w-full px-4 py-3 rounded-xl bg-red-500/90 font-bold"
                                >
                                    Logout
                                </button>
                            </div>
                        </aside>
                    </>
                )}

                {/* MAIN CONTENT */}
                <main className="flex-1 overflow-y-auto pt-16 md:pt-0 p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}

function SidebarItem({
    href,
    label,
    icon,
    active,
    onClick,
}: {
    href: string
    label: string
    icon: React.ReactNode
    active?: boolean
    onClick?: () => void
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition ${
                active
                    ? 'bg-white/25 text-white'
                    : 'hover:bg-white/15'
            }`}
        >
            {icon}
            <span>{label}</span>
        </Link>
    )
}
