'use client'

import { useState } from 'react'

const laundryHistory = [
    { date: '12/01/2026', order: 'LG-00421', service: 'Cuci + Setrika', status: 'Selesai', total: 'Rp 25.000' },
    { date: '10/01/2026', order: 'LG-00412', service: 'Cuci Kering', status: 'Selesai', total: 'Rp 18.000' },
]

export default function UserDashboardPage() {
    const [search, setSearch] = useState('')

    const filtered = laundryHistory.filter(item =>
        Object.values(item).join(' ').toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    Halo, Kevin 👋
                </h2>
                <p className="text-slate-700">
                    Selamat datang kembali di LaundryGo
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard title="Order Aktif" value="1" />
                <StatCard title="Order Selesai" value="12" />
                <StatCard title="Total Pengeluaran" value="Rp 320.000" />
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">
                        Riwayat Laundry
                    </h3>

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari riwayat..."
                        className="w-full md:w-72 px-3 py-2 border rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>

                <div className="hidden md:block overflow-x-auto border rounded-xl">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-100 text-slate-900">
                            <tr>
                                <th className="p-3 text-left">Tanggal</th>
                                <th className="p-3 text-left">No Order</th>
                                <th className="p-3 text-left">Layanan</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((item, i) => (
                                <tr key={i} className="border-t">
                                    <td className="p-3 text-slate-800">{item.date}</td>
                                    <td className="p-3 font-medium text-slate-900">{item.order}</td>
                                    <td className="p-3 text-slate-800">{item.service}</td>
                                    <td className="p-3 text-green-600 font-semibold">{item.status}</td>
                                    <td className="p-3 font-semibold text-slate-900">{item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="md:hidden space-y-3">
                    {filtered.map((item, i) => (
                        <div key={i} className="border rounded-xl p-4">
                            <p className="font-semibold text-slate-900">{item.order}</p>
                            <p className="text-sm text-slate-700">{item.service}</p>
                            <p className="text-xs text-slate-500">{item.date}</p>
                            <div className="flex justify-between mt-2">
                                <span className="text-green-600 font-semibold">{item.status}</span>
                                <span className="font-semibold text-slate-900">{item.total}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function StatCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-sm text-slate-600">{title}</p>
            <p className="text-2xl font-bold text-cyan-600">{value}</p>
        </div>
    )
}
