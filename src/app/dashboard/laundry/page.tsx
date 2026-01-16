'use client'

import { useEffect, useState } from 'react'

type Order = {
    date: string
    order: string
    user: string
    service: string
    weight?: string
    status: string
}

export default function StaffDashboardPage() {
    const [orders, setOrders] = useState<Order[]>([])
    const [masuk, setMasuk] = useState(0)
    const [proses, setProses] = useState(0)
    const [selesai, setSelesai] = useState(0)

    useEffect(() => {
        const sync = () => {
            const incoming = JSON.parse(
                localStorage.getItem('laundry_incoming_orders') || '[]'
            )

            const processing = JSON.parse(
                localStorage.getItem('laundry_process_orders') || '[]'
            )

            const done = JSON.parse(
                localStorage.getItem('laundry_done_orders') || '[]'
            )

            setMasuk(incoming.length)
            setProses(processing.length)
            setSelesai(done.length)

            setOrders(
                incoming.map((o: any) => ({
                    date: o.tanggal,
                    order: o.id,
                    user: o.nama,
                    service: o.layanan,
                    weight: o.estimasiBerat || '-',
                    status: 'Menunggu',
                }))
            )
        }

        sync()
        const interval = setInterval(sync, 500)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="space-y-10">
            <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h2 className="text-3xl font-extrabold text-slate-900">
                    Halo, Staff 👋
                </h2>
                <p className="text-slate-700 mt-1">
                    Selamat bekerja di LaundryGo
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Order Masuk Hari Ini" value={masuk} />
                <StatCard title="Sedang Diproses" value={proses} />
                <StatCard title="Selesai Hari Ini" value={selesai} />
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-xl">
                <h3 className="text-xl font-extrabold text-slate-900 mb-5">
                    Order Masuk
                </h3>

                <div className="hidden md:block h-80 overflow-y-auto rounded-xl border border-slate-300">
                    <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-slate-200">
                            <tr className="text-slate-900">
                                <th className="p-3 text-left font-bold">
                                    Tanggal
                                </th>
                                <th className="p-3 text-left font-bold">
                                    No Order
                                </th>
                                <th className="p-3 text-left font-bold">
                                    Nama User
                                </th>
                                <th className="p-3 text-left font-bold">
                                    Layanan
                                </th>
                                <th className="p-3 text-left font-bold">
                                    Berat
                                </th>
                                <th className="p-3 text-left font-bold">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="p-8 text-center text-slate-600 font-semibold"
                                    >
                                        Tidak ada order masuk
                                    </td>
                                </tr>
                            ) : (
                                orders.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="border-t border-slate-200 hover:bg-slate-100"
                                    >
                                        <td className="p-3 font-medium text-slate-900">
                                            {item.date}
                                        </td>
                                        <td className="p-3 font-bold text-slate-900">
                                            {item.order}
                                        </td>
                                        <td className="p-3 text-slate-900">
                                            {item.user}
                                        </td>
                                        <td className="p-3 text-slate-800">
                                            {item.service}
                                        </td>
                                        <td className="p-3 text-slate-800">
                                            {item.weight}
                                        </td>
                                        <td className="p-3">
                                            <span className="px-3 py-1 text-xs rounded-full bg-amber-200 text-amber-900 font-bold">
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="md:hidden space-y-4">
                    {orders.map((item, index) => (
                        <div
                            key={index}
                            className="border border-slate-300 rounded-xl p-4 bg-white"
                        >
                            <div className="flex justify-between items-center">
                                <p className="font-bold text-slate-900">
                                    {item.order}
                                </p>
                                <span className="text-xs bg-amber-200 text-amber-900 px-2 py-1 rounded-full font-bold">
                                    {item.status}
                                </span>
                            </div>

                            <p className="text-sm text-slate-800 mt-1">
                                {item.user}
                            </p>
                            <p className="text-sm text-slate-800">
                                {item.service}
                            </p>
                            <p className="text-xs text-slate-600 mt-1">
                                {item.date} • {item.weight}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <footer className="text-center text-xs text-slate-600">
                © 2026 LaundryGo — Developed by Mohammad Kevin
            </footer>
        </div>
    )
}

function StatCard({ title, value }: { title: string; value: number }) {
    return (
        <div className="bg-white rounded-3xl p-6 text-center shadow-xl">
            <p className="text-sm font-bold text-slate-700">
                {title}
            </p>
            <p className="mt-2 text-4xl font-extrabold text-cyan-700">
                {value}
            </p>
        </div>
    )
}