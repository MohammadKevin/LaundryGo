'use client'

import { useEffect, useState } from 'react'

type PaymentMethod = 'Cash' | 'QRIS'

interface Alamat {
    id: number
    nama: string
    phone: string
    alamat: string
}

interface Branch {
    id: string
    nama: string
    alamat: string
    telepon: string
}

export default function UserOrderPage() {
    const [alamatList, setAlamatList] = useState<Alamat[]>([])
    const [branches, setBranches] = useState<Branch[]>([])

    const [alamatDipilih, setAlamatDipilih] = useState('')
    const [cabang, setCabang] = useState('')
    const [layanan, setLayanan] = useState('')
    const [estimasiBerat, setEstimasiBerat] = useState('')
    const [pembayaran, setPembayaran] =
        useState<PaymentMethod>('Cash')

    useEffect(() => {
        const a = localStorage.getItem('user_addresses')
        const b = localStorage.getItem('laundry_branches')
        if (a) setAlamatList(JSON.parse(a))
        if (b) setBranches(JSON.parse(b))
    }, [])

    const handleSubmit = () => {
        if (!alamatDipilih || !cabang || !layanan || !estimasiBerat) {
            alert('Lengkapi data')
            return
        }

        const alamat = alamatList.find(
            (a) => String(a.id) === alamatDipilih
        )

        if (!alamat) return

        const stored = localStorage.getItem('laundry_orders')
        const orders = stored ? JSON.parse(stored) : []

        const newOrder = {
            id: `LG-${Date.now()}`,
            nama: 'Kevin',
            alamat,
            cabang,
            layanan,
            estimasiBerat,
            pembayaran,
            status: 'Menunggu Pick Up Kurir',
            createdAt: new Date().toISOString(),
        }

        localStorage.setItem(
            'laundry_orders',
            JSON.stringify([...orders, newOrder])
        )

        window.dispatchEvent(new Event('orders_updated'))

        alert('Pesanan berhasil dikirim')

        setAlamatDipilih('')
        setCabang('')
        setLayanan('')
        setEstimasiBerat('')
        setPembayaran('Cash')
    }

    return (
        <div className="min-h-screen bg-slate-100 flex justify-center p-6 text-slate-900">
            <div className="w-full max-w-xl bg-white p-8 rounded-3xl shadow space-y-6">

                <h1 className="text-2xl font-extrabold text-slate-900">
                    Pesan Laundry
                </h1>

                {/* ALAMAT */}
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700">
                        Alamat Penjemputan
                    </label>
                    <select
                        className="w-full p-3 border rounded-xl text-slate-900 bg-white
                                   focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        value={alamatDipilih}
                        onChange={(e) => setAlamatDipilih(e.target.value)}
                    >
                        <option value="">Pilih Alamat</option>
                        {alamatList.map((a) => (
                            <option key={a.id} value={a.id}>
                                {a.nama} — {a.alamat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* CABANG */}
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700">
                        Cabang Laundry
                    </label>
                    <select
                        className="w-full p-3 border rounded-xl text-slate-900 bg-white
                                   focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        value={cabang}
                        onChange={(e) => setCabang(e.target.value)}
                    >
                        <option value="">Pilih Cabang</option>
                        {branches.map((b) => (
                            <option key={b.id} value={b.nama}>
                                {b.nama} — {b.alamat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* LAYANAN */}
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700">
                        Layanan
                    </label>
                    <select
                        className="w-full p-3 border rounded-xl text-slate-900 bg-white
                                   focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        value={layanan}
                        onChange={(e) => setLayanan(e.target.value)}
                    >
                        <option value="">Pilih Layanan</option>
                        <option value="Cuci + Lipat">Cuci + Lipat</option>
                        <option value="Cuci + Setrika">Cuci + Setrika</option>
                        <option value="Setrika Saja">Setrika Saja</option>
                    </select>
                </div>

                {/* BERAT */}
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700">
                        Estimasi Berat (Kg)
                    </label>
                    <input
                        type="number"
                        min={1}
                        className="w-full p-3 border rounded-xl text-slate-900
                                   focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        value={estimasiBerat}
                        onChange={(e) =>
                            setEstimasiBerat(e.target.value)
                        }
                    />
                </div>

                {/* PEMBAYARAN */}
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700">
                        Metode Pembayaran
                    </label>
                    <select
                        className="w-full p-3 border rounded-xl text-slate-900 bg-white
                                   focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                    className="w-full bg-cyan-600 hover:bg-cyan-700
                               text-white font-bold py-3 rounded-xl"
                >
                    Kirim Pesanan
                </button>
            </div>
        </div>
    )
}
