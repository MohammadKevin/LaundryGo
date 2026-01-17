'use client'

import { useEffect, useState } from 'react'

type PaymentMethod = 'Cash' | 'QRIS'
type OrderStatus =
    | 'Menunggu Pick Up Kurir'
    | 'Kurir Menuju Lokasi Pickup'

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

export default function PickupKurirPage() {
    const [orders, setOrders] = useState<LaundryOrder[]>([])

    /* ================= LOAD DATA ================= */
    const loadOrders = (): void => {
        const stored = localStorage.getItem('laundry_orders')
        const data: LaundryOrder[] = stored
            ? (JSON.parse(stored) as LaundryOrder[])
            : []

        const pickupOrders = data.filter(
            (o) => o.status === 'Menunggu Pick Up Kurir'
        )

        setOrders(pickupOrders)
    }

    useEffect(() => {
        loadOrders()
        const interval = setInterval(loadOrders, 1000)
        return () => clearInterval(interval)
    }, [])

    /* ================= BERANGKAT PICKUP ================= */
    const handlePickup = (id: string): void => {
        const stored = localStorage.getItem('laundry_orders')
        const allOrders: LaundryOrder[] = stored
            ? (JSON.parse(stored) as LaundryOrder[])
            : []

        const updated = allOrders.map((o) =>
            o.id === id
                ? { ...o, status: 'Kurir Menuju Lokasi Pickup' }
                : o
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
                    Tugas Penjemputan
                </h1>
                <p className="text-slate-600">
                    Pesanan yang harus dijemput oleh kurir
                </p>
            </div>

            {/* LIST */}
            {orders.length === 0 ? (
                <p className="text-slate-500">
                    Tidak ada pesanan pickup
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
                                <span className="text-xs font-bold px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                                    Pickup
                                </span>
                            </div>

                            <p className="text-sm text-slate-700">
                                📍 {o.alamat}
                            </p>

                            <p className="text-sm text-slate-700 mt-1">
                                🏢 Cabang: {o.cabang}
                            </p>

                            <button
                                onClick={() => handlePickup(o.id)}
                                className="w-full mt-4 px-4 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
                            >
                                Berangkat Pickup
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}