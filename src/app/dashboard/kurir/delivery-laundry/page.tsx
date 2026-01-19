'use client'

import { useEffect, useState } from 'react'

type PaymentMethod = 'Cash' | 'QRIS'

type OrderStatus =
    | 'Kurir Menuju Lokasi Pickup'
    | 'Dalam Perjalanan ke Laundry'
    | 'Menunggu Penimbangan'

interface Alamat {
    id: number
    nama: string
    phone: string
    alamat: string
}

interface LaundryOrder {
    id: string
    alamat: Alamat
    cabang: string
    layanan: string
    estimasiBerat: string
    pembayaran: PaymentMethod
    status: OrderStatus
    createdAt: string
}

export default function DeliveryToLaundryPage() {
    const [orders, setOrders] = useState<LaundryOrder[]>([])

    const loadOrders = () => {
        const stored = localStorage.getItem('laundry_orders')
        const data: LaundryOrder[] = stored
            ? JSON.parse(stored)
            : []

        setOrders(
            data.filter(
                (o) =>
                    o.status === 'Kurir Menuju Lokasi Pickup' ||
                    o.status === 'Dalam Perjalanan ke Laundry'
            )
        )
    }

    useEffect(() => {
        loadOrders()
        const i = setInterval(loadOrders, 1000)
        return () => clearInterval(i)
    }, [])

    const updateStatus = (id: string, status: OrderStatus) => {
        const stored = localStorage.getItem('laundry_orders')
        if (!stored) return

        const allOrders: LaundryOrder[] = JSON.parse(stored)

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
                                    {o.alamat.nama}
                                </span>
                                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                                    Delivery
                                </span>
                            </div>

                            <p className="text-sm text-slate-700">
                                📞 {o.alamat.phone}
                            </p>

                            <p className="text-sm text-slate-700 mt-1">
                                📍 {o.alamat.alamat}
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
