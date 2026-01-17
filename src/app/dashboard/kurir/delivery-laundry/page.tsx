'use client'

import { useEffect, useState } from 'react'

type PaymentMethod = 'Cash' | 'QRIS'
type OrderStatus =
    | 'Kurir Menuju Lokasi Pickup'
    | 'Dalam Perjalanan ke Laundry'
    | 'Menunggu Penimbangan'

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
}

export default function DeliveryToLaundryPage() {
    const [orders, setOrders] = useState<LaundryOrder[]>([])

    /* ================= LOAD ================= */
    const loadOrders = (): void => {
        const stored = localStorage.getItem('laundry_orders')
        const data: LaundryOrder[] = stored
            ? (JSON.parse(stored) as LaundryOrder[])
            : []

        const active = data.filter(
            (o) =>
                o.status === 'Kurir Menuju Lokasi Pickup' ||
                o.status === 'Dalam Perjalanan ke Laundry'
        )

        setOrders(active)
    }

    useEffect(() => {
        loadOrders()
        const interval = setInterval(loadOrders, 1000)
        return () => clearInterval(interval)
    }, [])

    /* ================= UPDATE STATUS ================= */
    const updateStatus = (
        id: string,
        status: OrderStatus
    ): void => {
        const stored = localStorage.getItem('laundry_orders')
        const allOrders: LaundryOrder[] = stored
            ? (JSON.parse(stored) as LaundryOrder[])
            : []

        const updated = allOrders.map((o) =>
            o.id === id ? { ...o, status } : o
        )

        localStorage.setItem(
            'laundry_orders',
            JSON.stringify(updated)
        )

        loadOrders()
    }

    return (
        <div className="space-y-8">
            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900">
                    Antar ke Laundry
                </h1>
                <p className="text-slate-600">
                    Proses pengantaran pakaian ke laundry
                </p>
            </div>

            {/* LIST */}
            {orders.length === 0 ? (
                <p className="text-slate-500">
                    Tidak ada pengantaran aktif
                </p>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {orders.map((o) => (
                        <div
                            key={o.id}
                            className="bg-white rounded-2xl shadow p-6"
                        >
                            <div className="flex justify-between mb-2">
                                <span className="font-bold text-cyan-600">
                                    {o.nama}
                                </span>
                                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                                    Delivery
                                </span>
                            </div>

                            <p className="text-sm text-slate-700">
                                📍 {o.alamat}
                            </p>

                            <p className="text-sm text-slate-700 mt-1">
                                🏢 Cabang: {o.cabang}
                            </p>

                            {/* ACTION */}
                            {o.status === 'Kurir Menuju Lokasi Pickup' && (
                                <button
                                    onClick={() =>
                                        updateStatus(
                                            o.id,
                                            'Dalam Perjalanan ke Laundry'
                                        )
                                    }
                                    className="w-full mt-4 px-4 py-3 rounded-xl bg-green-600 text-white font-bold"
                                >
                                    Pakaian Sudah Dijemput
                                </button>
                            )}

                            {o.status === 'Dalam Perjalanan ke Laundry' && (
                                <button
                                    onClick={() =>
                                        updateStatus(
                                            o.id,
                                            'Menunggu Penimbangan'
                                        )
                                    }
                                    className="w-full mt-4 px-4 py-3 rounded-xl bg-indigo-600 text-white font-bold"
                                >
                                    Sampai di Laundry
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}