'use client'

import { useState } from 'react'

const laundryHistory = [
    { date: '12/01/2026', order: 'LG-00421', service: 'Cuci + Setrika', status: 'Selesai', total: 'Rp 25.000' },
    { date: '10/01/2026', order: 'LG-00412', service: 'Cuci Kering', status: 'Selesai', total: 'Rp 18.000' },
    { date: '08/01/2026', order: 'LG-00398', service: 'Setrika', status: 'Selesai', total: 'Rp 15.000' },
    { date: '05/01/2026', order: 'LG-00374', service: 'Cuci + Setrika', status: 'Selesai', total: 'Rp 27.000' },
    { date: '02/01/2026', order: 'LG-00350', service: 'Cuci Kering', status: 'Selesai', total: 'Rp 20.000' },
    { date: '28/12/2025', order: 'LG-00321', service: 'Cuci + Setrika', status: 'Selesai', total: 'Rp 30.000' },
    { date: '24/12/2025', order: 'LG-00298', service: 'Setrika', status: 'Selesai', total: 'Rp 12.000' },
    { date: '20/12/2025', order: 'LG-00271', service: 'Cuci Kering', status: 'Selesai', total: 'Rp 22.000' },
]

export default function UserDashboardPage() {
    const [search, setSearch] = useState('')

    const filteredHistory = laundryHistory.filter(item => {
        const keyword = search.toLowerCase()
        return (
            item.order.toLowerCase().includes(keyword) ||
            item.service.toLowerCase().includes(keyword) ||
            item.status.toLowerCase().includes(keyword) ||
            item.date.toLowerCase().includes(keyword)
        )
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-100 to-cyan-100 p-6 md:p-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900">
                    Halo, Kevin 👋
                </h2>
                <p className="text-slate-600 mt-1">
                    Selamat datang kembali di LaundryGo
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard title="Order Aktif" value="1" />
                <StatCard title="Order Selesai" value="12" />
                <StatCard title="Total Pengeluaran" value="Rp 320.000" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                    <h3 className="text-lg font-semibold text-slate-900 mb-5">
                        Laundry Aktif
                    </h3>

                    <div className="rounded-xl border p-5 bg-gradient-to-br from-white to-sky-50">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="font-semibold text-slate-900">
                                    No Order : LG-00123
                                </p>
                                <p className="text-sm text-slate-600">
                                    Layanan : Laundry + Setrika
                                </p>
                            </div>

                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600">
                                Sedang Dicuci
                            </span>
                        </div>

                        <p className="text-xs text-slate-500 mt-3">
                            Estimasi selesai hari ini • 18.00
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-slate-900">
                            Riwayat Laundry
                        </h3>

                        <input
                            type="text"
                            placeholder="Cari order, layanan, tanggal, status..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-72 text-sm px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                    </div>

                    <div className="h-80 overflow-y-auto rounded-xl border touch-pan-y">
                        <table className="w-full text-sm">
                            <thead className="sticky top-0 bg-sky-100">
                                <tr className="text-slate-700">
                                    <th className="p-4 text-left font-semibold">Tanggal</th>
                                    <th className="p-4 text-left font-semibold">No Order</th>
                                    <th className="p-4 text-left font-semibold">Layanan</th>
                                    <th className="p-4 text-left font-semibold">Status</th>
                                    <th className="p-4 text-left font-semibold">Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredHistory.map((item, index) => (
                                    <tr
                                        key={index}
                                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-sky-50'} border-t hover:bg-cyan-50 transition`}
                                    >
                                        <td className="p-4">{item.date}</td>
                                        <td className="p-4 font-medium">{item.order}</td>
                                        <td className="p-4">{item.service}</td>
                                        <td className="p-4">
                                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-600">
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-4 font-semibold">{item.total}</td>
                                    </tr>
                                ))}

                                {filteredHistory.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-6 text-center text-slate-500">
                                            Data tidak ditemukan
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

function StatCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="bg-white rounded-2xl p-6 text-center shadow-xl">
            <p className="text-sm text-slate-500">{title}</p>
            <p className="mt-1 text-3xl font-extrabold text-cyan-600">
                {value}
            </p>
        </div>
    )
}

function Footer() {
    return (
        <footer className="mt-16 text-center text-xs text-slate-500">
            © 2026 LaundryGo — Crafted by Mohammad Kevin
        </footer>
    )
}
