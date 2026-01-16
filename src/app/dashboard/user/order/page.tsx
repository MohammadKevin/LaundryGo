'use client'

import { useState } from 'react'

export default function UserOrderPage() {
    const [cabang, setCabang] = useState('')
    const [layanan, setLayanan] = useState('')
    const [berat, setBerat] = useState('')
    const [pembayaran, setPembayaran] = useState('Cash')

    const handleSubmit = () => {
        if (!cabang || !layanan || !berat) {
            alert('Lengkapi data terlebih dahulu')
            return
        }

        const existing = JSON.parse(
            localStorage.getItem('laundry_incoming_orders') || '[]'
        )

        const newOrder = {
            id: `LG-${Date.now()}`,
            tanggal: new Date().toLocaleDateString('id-ID'),
            nama: 'Kevin',
            cabang,
            layanan,
            estimasiBerat: berat,
            pembayaran,
            status: 'Menunggu Konfirmasi',
        }

        localStorage.setItem(
            'laundry_incoming_orders',
            JSON.stringify([...existing, newOrder])
        )

        alert('Pesanan berhasil dikirim ke laundry')

        setCabang('')
        setLayanan('')
        setBerat('')
        setPembayaran('Cash')
    }

    const inputClass =
        'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500'

    return (
        <div className="max-w-xl space-y-6 bg-white p-6 rounded-2xl shadow">
            <h1 className="text-2xl font-extrabold text-slate-900">
                Pesan Laundry
            </h1>

            <input
                value={cabang}
                onChange={(e) => setCabang(e.target.value)}
                placeholder="Cabang Laundry"
                className={inputClass}
            />

            <select
                value={layanan}
                onChange={(e) => setLayanan(e.target.value)}
                className={inputClass}
            >
                <option value="">Pilih Layanan</option>
                <option>Cuci + Lipat</option>
                <option>Cuci + Setrika</option>
                <option>Setrika Saja</option>
            </select>

            <input
                value={berat}
                onChange={(e) => setBerat(e.target.value)}
                placeholder="Perkiraan Berat (Kg)"
                type="number"
                className={inputClass}
            />

            <select
                value={pembayaran}
                onChange={(e) => setPembayaran(e.target.value)}
                className={inputClass}
            >
                <option>Cash</option>
                <option>QRIS</option>
            </select>

            <button
                onClick={handleSubmit}
                className="w-full rounded-xl bg-cyan-600 py-3 font-bold text-white hover:bg-cyan-700 transition"
            >
                Kirim Pesanan
            </button>
        </div>
    )
}