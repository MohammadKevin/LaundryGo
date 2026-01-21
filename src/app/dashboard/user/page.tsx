'use client'

import { useEffect, useState } from 'react'

type PaymentMethod = 'Cash' | 'QRIS'

type OrderStatus =
    | 'Menunggu Konfirmasi Staff'
    | 'Menunggu Pick Up Kurir'
    | 'Kurir Menuju Lokasi Pickup'
    | 'Dalam Perjalanan ke Laundry'
    | 'Menunggu Penimbangan'
    | 'Menunggu Pembayaran'
    | 'Menunggu Antrian'
    | 'Sedang Dicuci'
    | 'Sedang Dikeringkan'
    | 'Sedang Disetrika'
    | 'Siap Diantar'
    | 'Diantar ke Pelanggan'
    | 'Selesai'

interface LaundryOrder {
    id: string
    nama: string
    alamat: any
    cabang: string
    layanan: string
    estimasiBerat: string
    pembayaran: PaymentMethod
    status: OrderStatus
    createdAt: string
    totalHarga?: string
}

const formatDate = (date?: string) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('id-ID')
}

export default function UserDashboardPage() {
    const userName = 'Kevin'
    const [orders, setOrders] = useState<LaundryOrder[]>([])
    const [qrisOrder, setQrisOrder] = useState<LaundryOrder | null>(null)

    const loadOrders = () => {
        const stored = localStorage.getItem('laundry_orders')
        const data: LaundryOrder[] = stored ? JSON.parse(stored) : []
        setOrders(data.filter((o) => o.nama === userName))
    }

    useEffect(() => {
        loadOrders()

        const onStorage = (e: StorageEvent) => {
            if (e.key === 'laundry_orders') loadOrders()
        }

        const onOrdersUpdated = () => loadOrders()

        window.addEventListener('storage', onStorage)
        window.addEventListener('orders_updated', onOrdersUpdated)

        return () => {
            window.removeEventListener('storage', onStorage)
            window.removeEventListener('orders_updated', onOrdersUpdated)
        }
    }, [])

    const bayarQris = (id: string) => {
        const stored = localStorage.getItem('laundry_orders')
        const data: LaundryOrder[] = stored ? JSON.parse(stored) : []

        const updated = data.map((o) =>
            o.id === id ? { ...o, status: 'Menunggu Antrian' } : o
        )

        localStorage.setItem('laundry_orders', JSON.stringify(updated))
        window.dispatchEvent(new Event('orders_updated'))

        setQrisOrder(null)
        alert('Pembayaran berhasil')
    }

    return (
        <div className="space-y-10 text-slate-900">

            {/* HEADER */}
            <div className="bg-gradient-to-r from-cyan-700 to-sky-800 rounded-3xl p-8 text-white">
                <h1 className="text-3xl font-extrabold">
                    Halo, {userName} 👋
                </h1>
                <p className="text-cyan-100">
                    Pantau status laundry kamu
                </p>
            </div>

            {/* AKTIF */}
            <section>
                <h2 className="text-xl font-extrabold mb-4 text-slate-900">
                    Laundry Aktif
                </h2>

                {orders.filter((o) => o.status !== 'Selesai').length === 0 ? (
                    <div className="bg-white p-6 rounded-xl shadow text-slate-700">
                        Tidak ada laundry aktif
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {orders
                            .filter((o) => o.status !== 'Selesai')
                            .map((o) => (
                                <div
                                    key={o.id}
                                    className="bg-white rounded-2xl p-6 shadow border-l-8 border-cyan-600 text-slate-800"
                                >
                                    <div className="flex justify-between">
                                        <span className="font-bold text-cyan-700">
                                            {o.id}
                                        </span>
                                        <span className="text-xs text-slate-500">
                                            {formatDate(o.createdAt)}
                                        </span>
                                    </div>

                                    <p className="mt-2 font-medium">
                                        {o.layanan}
                                    </p>

                                    <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                                        {o.status}
                                    </span>

                                    {o.totalHarga && (
                                        <p className="mt-3 font-semibold text-slate-900">
                                            Total: Rp {o.totalHarga}
                                        </p>
                                    )}

                                    {o.status === 'Menunggu Pembayaran' && (
                                        <button
                                            onClick={() => setQrisOrder(o)}
                                            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-xl"
                                        >
                                            Bayar QRIS
                                        </button>
                                    )}
                                </div>
                            ))}
                    </div>
                )}
            </section>

            {/* RIWAYAT */}
            <section>
                <h2 className="text-xl font-extrabold mb-4 text-slate-900">
                    Riwayat Laundry
                </h2>

                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <table className="w-full text-sm text-slate-700">
                        <thead className="bg-slate-100 text-slate-800">
                            <tr>
                                <th className="px-6 py-3 text-left">
                                    No Order
                                </th>
                                <th>Layanan</th>
                                <th>Tanggal</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders
                                .filter((o) => o.status === 'Selesai')
                                .map((o) => (
                                    <tr key={o.id} className="border-t">
                                        <td className="px-6 py-3 font-bold text-slate-900">
                                            {o.id}
                                        </td>
                                        <td>{o.layanan}</td>
                                        <td>{formatDate(o.createdAt)}</td>
                                        <td>{o.totalHarga}</td>
                                        <td>
                                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold">
                                                Selesai
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* MODAL QRIS */}
            {qrisOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <div className="bg-white rounded-3xl p-8 w-full max-w-md text-center text-slate-900">
                        <h2 className="text-xl font-extrabold mb-4">
                            Bayar dengan QRIS
                        </h2>

                        <img
                            src="/qris.png"
                            className="mx-auto w-64 mb-4"
                        />

                        <p className="font-semibold mb-6">
                            Total: Rp {qrisOrder.totalHarga}
                        </p>

                        <button
                            onClick={() => bayarQris(qrisOrder.id)}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl"
                        >
                            Saya Sudah Bayar
                        </button>

                        <button
                            onClick={() => setQrisOrder(null)}
                            className="mt-3 w-full py-2 font-semibold text-slate-600"
                        >
                            Batal
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
