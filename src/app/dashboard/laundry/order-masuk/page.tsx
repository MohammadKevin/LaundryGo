'use client'

import { useEffect, useState } from 'react'

type PaymentMethod = 'Cash' | 'QRIS'
type OrderStatus =
    | 'Menunggu Konfirmasi Staff'
    | 'Menunggu Pick Up Kurir'

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

export default function OrderMasukPage() {
    const [orders, setOrders] = useState<LaundryOrder[]>([])

    /* ================= LOAD ================= */
    const loadOrders = () => {
        const stored = localStorage.getItem('laundry_orders')
        const data: LaundryOrder[] = stored ? JSON.parse(stored) : []

        setOrders(
            data.filter(
                (o) => o.status === 'Menunggu Konfirmasi Staff'
            )
        )
    }

    /* ================= REALTIME ================= */
    useEffect(() => {
        loadOrders()

        const onStorage = (e: StorageEvent) => {
            if (e.key === 'laundry_orders') {
                loadOrders()
            }
        }

        const onOrdersUpdated = () => {
            loadOrders()
        }

        window.addEventListener('storage', onStorage)
        window.addEventListener('orders_updated', onOrdersUpdated)

        return () => {
            window.removeEventListener('storage', onStorage)
            window.removeEventListener('orders_updated', onOrdersUpdated)
        }
    }, [])

    /* ================= TERIMA ================= */
    const terimaPesanan = (id: string) => {
        const stored = localStorage.getItem('laundry_orders')
        const allOrders: LaundryOrder[] = stored
            ? JSON.parse(stored)
            : []

        const updated = allOrders.map((o) =>
            o.id === id
                ? { ...o, status: 'Menunggu Pick Up Kurir' }
                : o
        )

        localStorage.setItem(
            'laundry_orders',
            JSON.stringify(updated)
        )

        // 🔥 trigger realtime
        window.dispatchEvent(new Event('orders_updated'))
    }

    return (
        <div className="space-y-8 text-slate-900">

            {/* HEADER */}
            <div className="bg-white rounded-3xl shadow p-6">
                <h1 className="text-3xl font-extrabold text-slate-900">
                    Order Masuk
                </h1>
                <p className="text-slate-600 mt-1">
                    Pesanan baru dari pelanggan
                </p>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-3xl shadow overflow-hidden">
                {orders.length === 0 ? (
                    <div className="py-16 text-center text-slate-600 font-semibold">
                        Belum ada pesanan masuk
                    </div>
                ) : (
                    <table className="w-full text-sm text-slate-800">
                        <thead className="bg-slate-100 text-slate-700">
                            <tr className="font-bold">
                                <th className="px-6 py-4 text-left">
                                    Tanggal
                                </th>
                                <th>No Order</th>
                                <th>Pelanggan</th>
                                <th>Layanan</th>
                                <th>Estimasi</th>
                                <th>Pembayaran</th>
                                <th className="px-6 text-right">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((o) => (
                                <tr
                                    key={o.id}
                                    className="border-t hover:bg-slate-50"
                                >
                                    <td className="px-6 py-4">
                                        {new Date(
                                            o.createdAt
                                        ).toLocaleDateString('id-ID')}
                                    </td>
                                    <td className="font-semibold text-slate-900">
                                        {o.id}
                                    </td>
                                    <td>{o.nama}</td>
                                    <td>{o.layanan}</td>
                                    <td>{o.estimasiBerat} Kg</td>
                                    <td>
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                                            {o.pembayaran}
                                        </span>
                                    </td>
                                    <td className="px-6 text-right">
                                        <button
                                            onClick={() =>
                                                terimaPesanan(o.id)
                                            }
                                            className="px-5 py-2 rounded-xl
                                                       bg-cyan-600 hover:bg-cyan-700
                                                       text-white font-bold"
                                        >
                                            Terima
                                        </button>
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
