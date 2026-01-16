'use client'

import Link from 'next/link'

export default function StaffLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex bg-sky-200">
            <aside className="w-64 bg-sky-100 border-r flex flex-col justify-between">
                <div>
                    <div className="p-6 text-xl font-bold text-blue-600">
                        LaundryGo
                    </div>

                    <nav className="px-4 space-y-2">
                        <SidebarItem label="Dashboard"  active />
                        <SidebarItem label="Order Masuk"/>
                        <SidebarItem label="Proses Laundry" />
                        <SidebarItem label="Selesai" />
                    </nav>
                </div>

                <div className="p-4">
                    <button className="w-full text-sm bg-red-100 text-red-600 py-2 rounded-lg">
                        Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    )
}

function SidebarItem({ label, active }: { label: string; active?: boolean }) {
    return (
        <Link
            href="#"
            className={`block px-4 py-2 rounded-lg text-sm font-medium transition
                ${active
                    ? 'bg-blue-500 text-white'
                    : 'text-slate-700 hover:bg-blue-100'
                }`}
        >
            {label}
        </Link>
    )
}
