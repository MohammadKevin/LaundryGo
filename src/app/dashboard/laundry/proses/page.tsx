'use client'

import { useEffect, useState } from 'react'

type PaymentMethod = 'Cash' | 'QRIS'
type OrderStatus =
    | 'Menunggu Penimbangan'
    | 'Menunggu Pembayaran'
    | 'Menunggu Antrian'

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

    // hasil proses
    beratFinal?: string
    hargaPerKg?: string
    totalHarga?: string
}

export default function ProsesLaundryPage() {
    const [orders, setOrders] = useState<LaundryOrder[]>([])
    const [selected, setSelected] = useState<LaundryOrder | null>(null)

    const [berat, setBerat] = useState<string>('')
    const [hargaPerKg, setHargaPerKg] = useState<string>('7000')
    const [totalHarga, setTotalHarga] = useState<string>('')

    /* ================= HITUNG TOTAL ================= */
    useEffect(() => {
        const b = Number(berat)
        const h = Number(hargaPerKg)
        if (b > 0 && h > 0) setTotalHarga(String(b * h))
        else setTotalHarga('')
    }, [berat, hargaPerKg])

    /* ================= LOAD DATA ================= */
    const loadOrders = (): void => {
        const stored = localStorage.getItem('laundry_orders')
        const data: LaundryOrder[] = stored
            ? (JSON.parse(stored) as LaundryOrder[])
            : []

        const waiting = data.filter(
            (o) => o.status === 'Menunggu Penimbangan'
        )

        setOrders(waiting)
    }

    useEffect(() => {
        loadOrders()
        const interval = setInterval(loadOrders, 1000)
        return () => clearInterval(interval)
    }, [])

    /* ================= SIMPAN PROSES ================= */
    const simpanProses = (): void => {
        if (!selected || !berat || !totalHarga) {
            alert('Lengkapi data penimbangan')
            return
        }

        const stored = localStorage.getItem('laundry_orders')
        const allOrders: LaundryOrder[] = stored
            ? (JSON.parse(stored) as LaundryOrder[])
            : []

        const nextStatus: OrderStatus =
            selected.pembayaran === 'QRIS'
                ? 'Menunggu Pembayaran'
                : 'Menunggu Antrian'

        const updated = allOrders.map((o) =>
            o.id === selected.id
                ? {
                    ...o,
                    beratFinal: berat,
                    hargaPerKg,
                    totalHarga,
                    status: nextStatus,
                }
                : o
        )

        localStorage.setItem(
            'laundry_orders',
            JSON.stringify(updated)
        )

        setSelected(null)
        setBerat('')
        setHargaPerKg('7000')
        setTotalHarga('')

        loadOrders()
    }

    return (
        <div className="space-y-8 text-slate-900">
            {/* HEADER */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
                <h1 className="text-3xl font-extrabold">
                    Proses Laundry
                </h1>
                <p className="text-slate-700 mt-1">
                    Penimbangan dan perhitungan biaya
                </p>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                {orders.length === 0 ? (
                    <div className="py-16 text-center text-slate-600 font-semibold">
                        Tidak ada laundry menunggu proses
                    </div>
                ) : (
                    <table className="w-full text-sm">
                        <thead className="bg-slate-100">
                            <tr className="font-bold">
                                <th className="px-6 py-4 text-left">No Order</th>
                                <th>Nama</th>
                                <th>Layanan</th>
                                <th>Pembayaran</th>
                                <th className="px-6 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((o) => (
                                <tr key={o.id} className="border-t">
                                    <td className="px-6 py-4 font-bold">{o.id}</td>
                                    <td>{o.nama}</td>
                                    <td>{o.layanan}</td>
                                    <td>
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                                            {o.pembayaran}
                                        </span>
                                    </td>
                                    <td className="px-6 text-right">
                                        <button
                                            onClick={() => setSelected(o)}
                                            className="px-5 py-2 rounded-xl bg-cyan-600 text-white font-bold"
                                        >
                                            Proses
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* MODAL */}
            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white w-full max-w-xl rounded-3xl p-8">
                        <h2 className="text-2xl font-extrabold mb-6">
                            Proses Order {selected.id}
                        </h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            <Input
                                label="Berat Final (Kg)"
                                value={berat}
                                onChange={setBerat}
                            />
                            <Input
                                label="Harga per Kg"
                                value={hargaPerKg}
                                onChange={setHargaPerKg}
                            />
                            <Input
                                label="Total Harga"
                                value={totalHarga}
                                disabled
                            />
                        </div>

                        {/* INFO PEMBAYARAN */}
                        <div className="mt-4 text-sm font-semibold text-slate-700">
                            {selected.pembayaran === 'Cash' ? (
                                <p className="text-yellow-700">
                                    💵 Pembayaran dilakukan saat kurir mengantar kembali
                                </p>
                            ) : (
                                <p className="text-green-700">
                                    📱 QRIS akan dikirim ke user untuk pembayaran
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                onClick={() => setSelected(null)}
                                className="px-6 py-3 rounded-xl border font-bold"
                            >
                                Batal
                            </button>
                            <button
                                onClick={simpanProses}
                                className="px-6 py-3 rounded-xl bg-green-600 text-white font-bold"
                            >
                                Simpan & Kirim ke User
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

/* ================= INPUT ================= */
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
            <label className="block mb-1 text-sm font-bold">
                {label}
            </label>
            <input
                type="number"
                value={value}
                disabled={disabled}
                onChange={(e) => onChange?.(e.target.value)}
                className={`w-full rounded-xl border-2 px-4 py-3 ${disabled ? 'bg-slate-100' : 'bg-white'
                    }`}
            />
        </div>
    )
}