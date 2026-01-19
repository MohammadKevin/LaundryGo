'use client'

import { useEffect, useState } from 'react'

type PaymentMethod = 'Cash' | 'QRIS'
type OrderStatus = 'Menunggu Konfirmasi Staff'

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

export default function UserOrderPage() {
    const [alamatList, setAlamatList] = useState<Alamat[]>([])
    const [alamatDipilih, setAlamatDipilih] = useState<string>('')

    const [cabang, setCabang] = useState('')
    const [layanan, setLayanan] = useState('')
    const [estimasiBerat, setEstimasiBerat] = useState('')
    const [pembayaran, setPembayaran] =
        useState<PaymentMethod>('Cash')

    useEffect(() => {
        const stored = localStorage.getItem('user_addresses')
        if (stored) {
            setAlamatList(JSON.parse(stored))
        }
    }, [])

    const handleSubmit = () => {
        if (
            !alamatDipilih ||
            !cabang ||
            !layanan ||
            !estimasiBerat
        ) {
            alert('Lengkapi data pesanan dan pilih alamat')
            return
        }

        const alamat = alamatList.find(
            (a) => String(a.id) === alamatDipilih
        )

        if (!alamat) {
            alert('Alamat tidak valid')
            return
        }

        const stored = localStorage.getItem('laundry_orders')
        const orders: LaundryOrder[] = stored
            ? JSON.parse(stored)
            : []

        const newOrder: LaundryOrder = {
            id: `LG-${Date.now()}`,
            alamat,
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

        setAlamatDipilih('')
        setCabang('')
        setLayanan('')
        setEstimasiBerat('')
        setPembayaran('Cash')
    }

    return (
        <div className="min-h-screen bg-slate-100 flex justify-center p-6">
            <div className="w-full max-w-xl bg-white p-8 rounded-3xl shadow-lg space-y-6">

                <h1 className="text-2xl font-extrabold text-slate-800">
                    Pesan Laundry
                </h1>

                {/* PILIH ALAMAT */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-600">
                        Alamat Penjemputan
                    </label>

                    {alamatList.length === 0 && (
                        <p className="text-sm text-red-500">
                            Kamu belum punya alamat. Tambahkan alamat
                            terlebih dahulu.
                        </p>
                    )}

                    <select
                        className="w-full px-4 py-3 border rounded-xl
                                   text-slate-800 bg-white
                                   focus:outline-none focus:ring-2
                                   focus:ring-cyan-500"
                        value={alamatDipilih}
                        onChange={(e) =>
                            setAlamatDipilih(e.target.value)
                        }
                        disabled={alamatList.length === 0}
                    >
                        <option value="">Pilih Alamat</option>
                        {alamatList.map((a) => (
                            <option
                                key={a.id}
                                value={String(a.id)}
                            >
                                {a.nama} — {a.alamat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* CABANG */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-600">
                        Cabang Laundry
                    </label>
                    <input
                        className="w-full px-4 py-3 border rounded-xl
                                   text-slate-800
                                   focus:outline-none focus:ring-2
                                   focus:ring-cyan-500"
                        placeholder="Contoh: LaundryGo Lowokwaru"
                        value={cabang}
                        onChange={(e) => setCabang(e.target.value)}
                    />
                </div>

                {/* LAYANAN */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-600">
                        Layanan
                    </label>
                    <select
                        className="w-full px-4 py-3 border rounded-xl
                                   text-slate-800 bg-white
                                   focus:outline-none focus:ring-2
                                   focus:ring-cyan-500"
                        value={layanan}
                        onChange={(e) =>
                            setLayanan(e.target.value)
                        }
                    >
                        <option value="">Pilih Layanan</option>
                        <option value="Cuci + Lipat">
                            Cuci + Lipat
                        </option>
                        <option value="Cuci + Setrika">
                            Cuci + Setrika
                        </option>
                        <option value="Setrika Saja">
                            Setrika Saja
                        </option>
                    </select>
                </div>

                {/* BERAT */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-600">
                        Estimasi Berat (Kg)
                    </label>
                    <input
                        type="number"
                        min={1}
                        className="w-full px-4 py-3 border rounded-xl
                                   text-slate-800
                                   focus:outline-none focus:ring-2
                                   focus:ring-cyan-500"
                        placeholder="Contoh: 3"
                        value={estimasiBerat}
                        onChange={(e) =>
                            setEstimasiBerat(e.target.value)
                        }
                    />
                </div>

                {/* PEMBAYARAN */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-600">
                        Metode Pembayaran
                    </label>
                    <select
                        className="w-full px-4 py-3 border rounded-xl
                                   text-slate-800 bg-white
                                   focus:outline-none focus:ring-2
                                   focus:ring-cyan-500"
                        value={pembayaran}
                        onChange={(e) =>
                            setPembayaran(
                                e.target.value as PaymentMethod
                            )
                        }
                    >
                        <option value="Cash">Cash</option>
                        <option value="QRIS">QRIS</option>
                    </select>
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full py-3 rounded-xl bg-cyan-600
                               text-white font-bold
                               hover:bg-cyan-700 transition"
                >
                    Kirim Pesanan
                </button>
            </div>
        </div>
    )
}