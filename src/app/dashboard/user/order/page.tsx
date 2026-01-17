'use client'

import { useState } from 'react'

type PaymentMethod = 'Cash' | 'QRIS'
type OrderStatus = 'Menunggu Konfirmasi Staff'

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

export default function UserOrderPage() {
    const [cabang, setCabang] = useState<string>('')
    const [layanan, setLayanan] = useState<string>('')
    const [estimasiBerat, setEstimasiBerat] = useState<string>('')
    const [pembayaran, setPembayaran] =
        useState<PaymentMethod>('Cash')

    const handleSubmit = (): void => {
        if (!cabang || !layanan || !estimasiBerat) {
            alert('Lengkapi data pesanan')
            return
        }

        const stored = localStorage.getItem('laundry_orders')
        const orders: LaundryOrder[] = stored
            ? (JSON.parse(stored) as LaundryOrder[])
            : []

        const newOrder: LaundryOrder = {
            id: `LG-${Date.now()}`,
            nama: 'Kevin',
            alamat: 'Jl. Melati No. 10',
            cabang,
            layanan,
            estimasiBerat,
            pembayaran,
            status: 'Menunggu Konfirmasi Staff',
            createdAt: new Date().toISOString(),
        }

        localStorage.setItem(
            'laundry_orders',
            JSON.stringify([...orders, newOrder])
        )

        alert('Pesanan berhasil dikirim')

        setCabang('')
        setLayanan('')
        setEstimasiBerat('')
        setPembayaran('Cash')
    }

    return (
        <div className="max-w-xl bg-white p-8 rounded-3xl shadow-lg space-y-6 ml-8 mt-8">
            <h1 className="text-2xl font-extrabold text-slate-800">
                Pesan Laundry
            </h1>

            <div className="space-y-1">
                <label className="text-sm font-medium text-slate-600">
                    Cabang Laundry
                </label>
                <input
                    className="w-full px-4 py-3 border rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Contoh: LaundryGo Sukamaju"
                    value={cabang}
                    onChange={(e) => setCabang(e.target.value)}
                />
            </div>

            <div className="space-y-1">
                <label className="text-sm font-medium text-slate-600">
                    Layanan
                </label>
                <select
                    className="w-full px-4 py-3 border rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={layanan}
                    onChange={(e) => setLayanan(e.target.value)}
                >
                    <option value="">Pilih Layanan</option>
                    <option value="Cuci + Lipat">Cuci + Lipat</option>
                    <option value="Cuci + Setrika">Cuci + Setrika</option>
                    <option value="Setrika Saja">Setrika Saja</option>
                </select>
            </div>

            <div className="space-y-1">
                <label className="text-sm font-medium text-slate-600">
                    Estimasi Berat (Kg)
                </label>
                <input
                    type="number"
                    className="w-full px-4 py-3 border rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Contoh: 3"
                    value={estimasiBerat}
                    onChange={(e) => setEstimasiBerat(e.target.value)}
                />
            </div>

            <div className="space-y-1">
                <label className="text-sm font-medium text-slate-600">
                    Metode Pembayaran
                </label>
                <select
                    className="w-full px-4 py-3 border rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={pembayaran}
                    onChange={(e) =>
                        setPembayaran(e.target.value as PaymentMethod)
                    }
                >
                    <option value="Cash">Cash</option>
                    <option value="QRIS">QRIS</option>
                </select>
            </div>

            <button
                onClick={handleSubmit}
                className="w-full py-3 rounded-xl bg-cyan-600 text-white font-bold hover:bg-cyan-700 transition"
            >
                Kirim Pesanan
            </button>
        </div>
    )
}