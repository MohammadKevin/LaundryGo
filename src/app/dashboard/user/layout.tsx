import Link from 'next/link'
import { LayoutDashboard, ShoppingBag, LogOut } from 'lucide-react'

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gradient-to-br from-sky-100 to-cyan-200">
            {/* SIDEBAR */}
            <aside className="w-60 bg-gradient-to-b from-cyan-500 to-sky-600 text-white p-6 flex flex-col justify-between shadow-xl">
                <div>
                    {/* LOGO */}
                    <h1 className="text-xl font-extrabold mb-10 tracking-wide">
                        🧺 LaundryGo
                    </h1>

                    {/* NAV */}
                    <nav className="space-y-2 text-sm">
                        <Link
                            href="/dashboard/user"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/20 backdrop-blur font-medium shadow-lg hover:bg-white/30 transition"
                        >
                            <LayoutDashboard size={18} />
                            Dashboard
                        </Link>

                        <Link
                            href="/dashboard/user/order"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition"
                        >
                            <ShoppingBag size={18} />
                            Pesan Laundry
                        </Link>
                    </nav>
                </div>

                {/* LOGOUT */}
                <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/20 text-red-100 hover:bg-red-500/30 transition">
                    <LogOut size={18} />
                    Logout
                </button>
            </aside>

            {/* CONTENT */}
            <main className="flex-1 p-8 text-slate-900">
                {children}
            </main>
        </div>
    )
}