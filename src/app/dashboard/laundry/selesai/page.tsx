'use client'

import { useEffect, useState } from 'react'

type PaymentMethod = 'Cash' | 'QRIS'
type OrderStatus =
    | 'Menunggu Antrian'
    | 'Sedang Dicuci'
    | 'Sedang Dikeringkan'
    | 'Sedang Disetrika'
    | 'Siap Diantar'

interface LaundryOrder {
    id: string
    nama: string
    alamat: string
    cabang: string
    layanan: string
    estimasiBerat: string
    pembayaran: PaymentMethod
    status: OrderStatus
    createdAt: string

    beratFinal?: string
    hargaPerKg?: string
    totalHarga?: string
}

const STATUS_FLOW: OrderStatus[] = [
    'Menunggu Antrian',
    'Sedang Dicuci',
    'Sedang Dikeringkan',
    'Sedang Disetrika',
    'Siap Diantar',
]

export default function ProsesFisikLaundryPage() {
    const [orders, setOrders] = useState<LaundryOrder[]>([])

    /* ================= LOAD ================= */
    const loadOrders = (): void => {
        const stored = localStorage.getItem('laundry_orders')
        const data: LaundryOrder[] = stored
            ? (JSON.parse(stored) as LaundryOrder[])
            : []

        const active = data.filter((o) =>
            STATUS_FLOW.includes(o.status)
        )

        setOrders(active)
    }

    useEffect(() => {
        loadOrders()
        const interval = setInterval(loadOrders, 1000)
        return () => clearInterval(interval)
    }, [])

    /* ================= NEXT STATUS ================= */
    const nextStatus = (status: OrderStatus): OrderStatus => {
        const idx = STATUS_FLOW.indexOf(status)
        return STATUS_FLOW[Math.min(idx + 1, STATUS_FLOW.length - 1)]
    }

    /* ================= UPDATE ================= */
    const updateStatus = (id: string): void => {
        const stored = localStorage.getItem('laundry_orders')
        const allOrders: LaundryOrder[] = stored
            ? (JSON.parse(stored) as LaundryOrder[])
            : []

        const updated = allOrders.map((o) =>
            o.id === id
                ? { ...o, status: nextStatus(o.status) }
                : o
        )

        localStorage.setItem(
            'laundry_orders',
            JSON.stringify(updated)
        )

        loadOrders()
    }

    return (
        <div className="space-y-8 text-slate-900">
            {/* HEADER */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
                <h1 className="text-3xl font-extrabold">
                    Proses Laundry
                </h1>
                <p className="text-slate-700 mt-1">
                    Proses cuci hingga siap diantar
                </p>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                {orders.length === 0 ? (
                    <div className="py-16 text-center text-slate-600 font-semibold">
                        Tidak ada laundry dalam proses
                    </div>
                ) : (
                    <table className="w-full text-sm">
                        <thead className="bg-slate-100">
                            <tr className="font-bold">
                                <th className="px-6 py-4 text-left">No Order</th>
                                <th>Nama</th>
                                <th>Layanan</th>
                                <th>Status</th>
                                <th className="px-6 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((o) => (
                                <tr key={o.id} className="border-t">
                                    <td className="px-6 py-4 font-bold">
                                        {o.id}
                                    </td>
                                    <td>{o.nama}</td>
                                    <td>{o.layanan}</td>
                                    <td>
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                                            {o.status}
                                        </span>
                                    </td>
                                    <td className="px-6 text-right">
                                        {o.status !== 'Siap Diantar' && (
                                            <button
                                                onClick={() => updateStatus(o.id)}
                                                className="px-5 py-2 rounded-xl bg-green-600 text-white font-bold"
                                            >
                                                Lanjutkan
                                            </button>
                                        )}
                                        {o.status === 'Siap Diantar' && (
                                            <span className="text-green-600 font-bold">
                                                ✔ Siap
                                            </span>
                                        )}
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