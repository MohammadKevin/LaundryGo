'use client'

import { useEffect, useState } from 'react'

type PaymentMethod = 'Cash' | 'QRIS'

type OrderStatus =
    | 'Siap Diantar'
    | 'Diantar ke Pelanggan'
    | 'Selesai'

interface LaundryOrder {
    id: string
    nama: string
    alamat: string
    pembayaran: PaymentMethod
    totalHarga?: string
    status: OrderStatus
}

export default function DeliveryUserPage() {
    const [orders, setOrders] = useState<LaundryOrder[]>([])
    const [paidCash, setPaidCash] = useState<Record<string, boolean>>({})

    /* ================= LOAD DATA ================= */
    const loadOrders = (): void => {
        const stored = localStorage.getItem('laundry_orders')
        const data: LaundryOrder[] = stored
            ? JSON.parse(stored)
            : []

        // Kurir hanya boleh lihat order siap antar / sedang diantar
        setOrders(
            data.filter(
                (o) =>
                    o.status === 'Siap Diantar' ||
                    o.status === 'Diantar ke Pelanggan'
            )
        )
    }

    useEffect(() => {
        loadOrders()
        const interval = setInterval(loadOrders, 1000)
        return () => clearInterval(interval)
    }, [])

    /* ================= UPDATE STATUS ================= */
    const updateStatus = (
        id: string,
        currentStatus: OrderStatus
    ): void => {
        const stored = localStorage.getItem('laundry_orders')
        const data: LaundryOrder[] = stored
            ? JSON.parse(stored)
            : []

        const updated = data.map((o) => {
            if (o.id !== id) return o

            // STEP 1: mulai antar
            if (currentStatus === 'Siap Diantar') {
                return { ...o, status: 'Diantar ke Pelanggan' }
            }

            // STEP 2: selesai
            return { ...o, status: 'Selesai' }
        })

        localStorage.setItem('laundry_orders', JSON.stringify(updated))
        loadOrders()
    }

    return (
        <div className="space-y-8 text-slate-900">
            {/* HEADER */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
                <h1 className="text-3xl font-extrabold">
                    Antar ke Pelanggan
                </h1>
                <p className="text-slate-600 mt-1">
                    Pengantaran laundry yang telah selesai diproses
                </p>
            </div>

            {/* LIST */}
            {orders.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 shadow text-center text-slate-600 font-semibold">
                    Tidak ada pengantaran saat ini
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {orders.map((o) => (
                        <div
                            key={o.id}
                            className="bg-white rounded-2xl shadow p-6 border-l-8 border-green-600"
                        >
                            <div className="flex justify-between mb-2">
                                <span className="font-bold text-green-700">
                                    {o.nama}
                                </span>
                                <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-100 text-green-700">
                                    {o.status}
                                </span>
                            </div>

                            <p className="text-sm text-slate-700">
                                📍 {o.alamat}
                            </p>

                            <p className="text-sm text-slate-700 mt-1">
                                💰 Total: Rp {o.totalHarga}
                            </p>

                            {/* CASH CONFIRMATION */}
                            {o.pembayaran === 'Cash' &&
                                o.status === 'Diantar ke Pelanggan' && (
                                    <label className="flex items-center gap-2 mt-4">
                                        <input
                                            type="checkbox"
                                            checked={!!paidCash[o.id]}
                                            onChange={(e) =>
                                                setPaidCash({
                                                    ...paidCash,
                                                    [o.id]: e.target.checked,
                                                })
                                            }
                                        />
                                        <span className="text-sm font-semibold text-slate-700">
                                            Sudah menerima pembayaran cash
                                        </span>
                                    </label>
                                )}

                            {/* ACTION BUTTON */}
                            <button
                                disabled={
                                    o.pembayaran === 'Cash' &&
                                    o.status === 'Diantar ke Pelanggan' &&
                                    !paidCash[o.id]
                                }
                                onClick={() =>
                                    updateStatus(o.id, o.status)
                                }
                                className={`w-full mt-5 py-3 rounded-xl font-bold text-white transition ${
                                    o.pembayaran === 'Cash' &&
                                    o.status === 'Diantar ke Pelanggan' &&
                                    !paidCash[o.id]
                                        ? 'bg-gray-400'
                                        : o.status === 'Siap Diantar'
                                        ? 'bg-blue-600 hover:bg-blue-700'
                                        : 'bg-green-600 hover:bg-green-700'
                                }`}
                            >
                                {o.status === 'Siap Diantar'
                                    ? 'Mulai Antar'
                                    : 'Selesaikan Order'}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
