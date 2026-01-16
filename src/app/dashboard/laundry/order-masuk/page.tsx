'use client'

import { useEffect, useState } from 'react'

type IncomingOrder = {
    id: string
    tanggal: string
    nama: string
    cabang: string
    layanan: string
    estimasiBerat: string
    pembayaran: string
}

export default function OrderMasukPage() {
    const [orders, setOrders] = useState<IncomingOrder[]>([])
    const [selected, setSelected] = useState<IncomingOrder | null>(null)

    const [berat, setBerat] = useState('')
    const [jumlah, setJumlah] = useState('')
    const [hargaPerKg, setHargaPerKg] = useState('7000')
    const [totalHarga, setTotalHarga] = useState('')

    useEffect(() => {
        const b = Number(berat)
        const h = Number(hargaPerKg)
        if (b > 0 && h > 0) setTotalHarga(String(b * h))
        else setTotalHarga('')
    }, [berat, hargaPerKg])

    const loadOrders = () => {
        const data = JSON.parse(
            localStorage.getItem('laundry_incoming_orders') || '[]'
        )
        setOrders(data)
    }

    useEffect(() => {
        loadOrders()
        const interval = setInterval(loadOrders, 500)
        return () => clearInterval(interval)
    }, [])

    const simpanProses = () => {
        if (!selected || !berat) {
            alert('Lengkapi data terlebih dahulu')
            return
        }

        const proses =
            JSON.parse(localStorage.getItem('laundry_process_orders') || '[]')

        const noAntrian = `A-${String(proses.length + 1).padStart(3, '0')}`

        const newProses = {
            noAntrian,
            noOrder: selected.id,
            nama: selected.nama,
            layanan: selected.layanan,
            berat,
            jumlah,
            totalHarga,
            status: 'Menunggu Antrian',
        }

        localStorage.setItem(
            'laundry_process_orders',
            JSON.stringify([...proses, newProses])
        )

        const updated = orders.filter((o) => o.id !== selected.id)
        setOrders(updated)
        localStorage.setItem(
            'laundry_incoming_orders',
            JSON.stringify(updated)
        )

        setSelected(null)
        setBerat('')
        setJumlah('')
        setHargaPerKg('7000')
        setTotalHarga('')
    }

    return (
        <div className="space-y-8 text-slate-900">
            <div className="bg-white rounded-3xl shadow-xl p-6">
                <h1 className="text-3xl font-extrabold text-slate-900">
                    Order Masuk
                </h1>
                <p className="text-slate-700 mt-1">
                    Daftar pesanan laundry yang baru masuk
                </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                {orders.length === 0 ? (
                    <div className="py-16 text-center text-slate-600 font-semibold">
                        Belum ada pesanan masuk
                    </div>
                ) : (
                    <table className="w-full text-sm text-slate-900">
                        <thead className="bg-slate-100">
                            <tr className="font-bold">
                                <th className="px-6 py-4 text-left">Tanggal</th>
                                <th className="text-left">No Order</th>
                                <th className="text-left">Pelanggan</th>
                                <th className="text-left">Layanan</th>
                                <th className="text-left">Berat</th>
                                <th className="text-left">Pembayaran</th>
                                <th className="px-6 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((o) => (
                                <tr
                                    key={o.id}
                                    className="border-t hover:bg-slate-50 transition"
                                >
                                    <td className="px-6 py-4 font-medium">
                                        {o.tanggal}
                                    </td>
                                    <td className="font-semibold">
                                        {o.id}
                                    </td>
                                    <td className="font-medium">
                                        {o.nama}
                                    </td>
                                    <td>{o.layanan}</td>
                                    <td>{o.estimasiBerat} Kg</td>
                                    <td>
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                                            {o.pembayaran}
                                        </span>
                                    </td>
                                    <td className="px-6 text-right">
                                        <button
                                            onClick={() => setSelected(o)}
                                            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 text-white font-bold"
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

            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white w-full max-w-xl rounded-3xl p-8 text-slate-900">
                        <h2 className="text-2xl font-extrabold mb-6">
                            Proses Order {selected.id}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Berat Total (Kg)" value={berat} onChange={setBerat} />
                            <Input label="Jumlah Pakaian" value={jumlah} onChange={setJumlah} />
                            <Input label="Harga per Kg" value={hargaPerKg} onChange={setHargaPerKg} />
                            <Input label="Total Harga" value={totalHarga} disabled />
                        </div>

                        <div className="flex justify-end gap-3 mt-10">
                            <button
                                onClick={() => setSelected(null)}
                                className="px-6 py-3 rounded-xl border font-bold text-slate-700"
                            >
                                Batal
                            </button>
                            <button
                                onClick={simpanProses}
                                className="px-6 py-3 rounded-xl bg-green-600 text-white font-bold"
                            >
                                Simpan & Proses
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function Input({
    label,
    value,
    onChange,
    disabled,
}: {
    label: string
    value: string
    onChange?: (v: string) => void
    disabled?: boolean
}) {
    return (
        <div>
            <label className="block mb-1 text-sm font-bold text-slate-800">
                {label}
            </label>
            <input
                type="number"
                value={value}
                disabled={disabled}
                onChange={(e) => onChange?.(e.target.value)}
                className={`w-full rounded-xl border-2 px-4 py-3 font-medium text-slate-900 ${
                    disabled
                        ? 'bg-slate-100'
                        : 'bg-white focus:ring-2 focus:ring-cyan-400'
                }`}
            />
        </div>
    )
}
