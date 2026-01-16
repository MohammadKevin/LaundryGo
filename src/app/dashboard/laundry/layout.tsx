'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'

export default function LaundryLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()

    const handleLogout = () => {
        router.push('/')
    }

    const menus = [
        {
            label: 'Dashboard',
            href: '/dashboard/laundry',
        },
        {
            label: 'Order Masuk',
            href: '/dashboard/laundry/order-masuk',
        },
        {
            label: 'Proses Laundry',
            href: '/dashboard/laundry/proses',
        },
        {
            label: 'Selesai',
            href: '/dashboard/laundry/selesai',
        },
    ]

    return (
        <div className="h-screen bg-sky-200 overflow-hidden">
            {/* MOBILE HEADER */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white px-4 py-3 shadow flex items-center justify-between">
                <button onClick={() => setOpen(true)}>
                    <Menu />
                </button>
                <span className="font-extrabold tracking-wide text-cyan-600">
                    LaundryGo
                </span>
            </header>

            <div className="flex h-full pt-14 md:pt-0">
                {/* DESKTOP SIDEBAR */}
                <aside className="hidden md:flex w-64 bg-gradient-to-b from-cyan-400 to-blue-600 text-white flex-col">
                    <div className="px-6 py-6 text-2xl font-extrabold tracking-wide border-b border-white/20">
                        LaundryGo
                    </div>

                    <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
                        {menus.map((menu) => (
                            <SidebarItem
                                key={menu.href}
                                label={menu.label}
                                href={menu.href}
                                active={pathname === menu.href}
                            />
                        ))}
                    </nav>

                    <div className="p-4 border-t border-white/20">
                        <button
                            onClick={handleLogout}
                            className="w-full px-4 py-3 rounded-xl bg-blue-700/60 hover:bg-blue-700 transition font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </aside>

                {/* MOBILE SIDEBAR */}
                {open && (
                    <>
                        <div
                            className="fixed inset-0 bg-black/40 z-40"
                            onClick={() => setOpen(false)}
                        />

                        <aside className="fixed z-50 top-0 left-0 h-full w-64 bg-gradient-to-b from-cyan-400 to-blue-600 text-white flex flex-col">
                            <div className="px-6 py-6 flex items-center justify-between text-xl font-extrabold border-b border-white/20">
                                LaundryGo
                                <button onClick={() => setOpen(false)}>
                                    <X />
                                </button>
                            </div>

                            <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
                                {menus.map((menu) => (
                                    <SidebarItem
                                        key={menu.href}
                                        label={menu.label}
                                        href={menu.href}
                                        active={pathname === menu.href}
                                        onClick={() => setOpen(false)}
                                    />
                                ))}
                            </nav>

                            <div className="p-4 border-t border-white/20">
                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-3 rounded-xl bg-blue-700/60 hover:bg-blue-700 transition font-medium"
                                >
                                    Logout
                                </button>
                            </div>
                        </aside>
                    </>
                )}

                {/* CONTENT */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}

function SidebarItem({
    label,
    href,
    active,
    onClick,
}: {
    label: string
    href: string
    active?: boolean
    onClick?: () => void
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`block px-4 py-3 rounded-xl font-medium transition ${
                active
                    ? 'bg-white/20 text-white'
                    : 'text-white hover:bg-white/15'
            }`}
        >
            {label}
        </Link>
    )
}
