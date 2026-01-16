'use client'

import { useEffect, useState } from 'react'

type DoneOrder = {
    noAntrian: string
    noOrder: string
    nama: string
    layanan: string
    berat: string
    jumlah: string
    totalHarga: string
    status: string
}

export default function SelesaiPage() {
    const [orders, setOrders] = useState<DoneOrder[]>([])

    useEffect(() => {
        const data = JSON.parse(
            localStorage.getItem('laundry_done_orders') || '[]'
        )
        setOrders(data)
    }, [])

    return (
        <div className="space-y-8">
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-8 text-white shadow-xl">
                <h1 className="text-3xl font-extrabold">
                    Laundry Selesai
                </h1>
                <p className="text-emerald-50 mt-1">
                    Riwayat pesanan laundry yang telah selesai diproses
                </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                {orders.length === 0 ? (
                    <div className="py-20 text-center">
                        <p className="text-slate-500 font-semibold">
                            Belum ada laundry yang selesai
                        </p>
                    </div>
                ) : (
                    <table className="w-full text-sm">
                        <thead className="bg-slate-100">
                            <tr className="text-slate-800">
                                <th className="px-6 py-4 text-left font-bold">
                                    No Antrian
                                </th>
                                <th className="text-left font-bold">No Order</th>
                                <th className="text-left font-bold">Pelanggan</th>
                                <th className="text-left font-bold">Layanan</th>
                                <th className="text-left font-bold">Berat</th>
                                <th className="text-left font-bold">Total</th>
                                <th className="text-left font-bold">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((o, i) => (
                                <tr
                                    key={i}
                                    className="border-t hover:bg-slate-50 transition"
                                >
                                    <td className="px-6 py-4 font-extrabold text-slate-900">
                                        {o.noAntrian}
                                    </td>
                                    <td className="font-semibold text-slate-900">
                                        {o.noOrder}
                                    </td>
                                    <td className="text-slate-900">{o.nama}</td>
                                    <td className="text-slate-900">{o.layanan}</td>
                                    <td className="text-slate-700">{o.berat} Kg</td>
                                    <td className="font-bold text-slate-900">
                                        Rp {o.totalHarga}
                                    </td>
                                    <td>
                                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-extrabold bg-green-100 text-green-700">
                                            {o.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}