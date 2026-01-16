'use client'

import { useEffect, useState } from 'react'

type Order = {
    noAntrian: string
    noOrder: string
    nama: string
    layanan: string
    berat: string
    totalHarga: string
    status: string
}

export default function UserDashboardPage() {
    const [activeOrders, setActiveOrders] = useState<Order[]>([])
    const [historyOrders, setHistoryOrders] = useState<Order[]>([])

    const userName = 'Kevin'

    useEffect(() => {
        const sync = () => {
            const process: Order[] = JSON.parse(
                localStorage.getItem('laundry_process_orders') || '[]'
            ).filter((o: Order) => o.nama === userName)

            const done: Order[] = JSON.parse(
                localStorage.getItem('laundry_done_orders') || '[]'
            ).filter((o: Order) => o.nama === userName)

            setActiveOrders(process)
            setHistoryOrders(done)
        }

        sync()
        const interval = setInterval(sync, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="space-y-12 text-slate-900">
            {/* HEADER */}
            <div className="bg-gradient-to-r from-cyan-600 to-sky-700 rounded-3xl p-8 text-white shadow-xl">
                <h1 className="text-3xl font-extrabold">
                    Halo, {userName} 👋
                </h1>
                <p className="text-cyan-100 mt-1 font-medium">
                    Pantau status laundry kamu secara realtime
                </p>
            </div>

            {/* LAUNDRY AKTIF */}
            <section>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-5">
                    Laundry Aktif
                </h2>

                {activeOrders.length === 0 ? (
                    <div className="bg-white rounded-2xl p-6 shadow text-slate-600 font-medium">
                        Tidak ada laundry yang sedang diproses
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {activeOrders.map((o, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-3xl shadow-xl p-6 border-l-8 border-cyan-600"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xl font-extrabold text-cyan-700">
                                        {o.noAntrian}
                                    </span>
                                    <span className="text-sm font-medium text-slate-600">
                                        {o.noOrder}
                                    </span>
                                </div>

                                <p className="font-extrabold text-slate-900 text-lg">
                                    {o.layanan}
                                </p>

                                <div className="mt-2 space-y-1 text-sm font-medium text-slate-700">
                                    <p>Berat: {o.berat} Kg</p>
                                    <p>Total: Rp {o.totalHarga}</p>
                                </div>

                                <span className="inline-block mt-5 px-4 py-1 rounded-full text-sm font-extrabold bg-blue-100 text-blue-700">
                                    {o.status}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* RIWAYAT */}
            <section>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-5">
                    Riwayat Laundry
                </h2>

                {historyOrders.length === 0 ? (
                    <div className="bg-white rounded-2xl p-6 shadow text-slate-600 font-medium">
                        Belum ada riwayat laundry
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                        <table className="w-full text-sm text-slate-900">
                            <thead className="bg-slate-100">
                                <tr className="font-bold">
                                    <th className="px-6 py-4 text-left">
                                        No Antrian
                                    </th>
                                    <th className="text-left">No Order</th>
                                    <th className="text-left">Layanan</th>
                                    <th className="text-left">Berat</th>
                                    <th className="text-left">Total</th>
                                    <th className="text-left">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {historyOrders.map((o, i) => (
                                    <tr
                                        key={i}
                                        className="border-t hover:bg-slate-50 transition"
                                    >
                                        <td className="px-6 py-4 font-extrabold text-slate-900">
                                            {o.noAntrian}
                                        </td>
                                        <td className="font-semibold">
                                            {o.noOrder}
                                        </td>
                                        <td className="font-medium">
                                            {o.layanan}
                                        </td>
                                        <td className="font-medium">
                                            {o.berat} Kg
                                        </td>
                                        <td className="font-extrabold">
                                            Rp {o.totalHarga}
                                        </td>
                                        <td>
                                            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-green-100 text-green-700">
                                                {o.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    )
}
