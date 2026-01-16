'use client'

import { useEffect, useState } from 'react'

type ProcessOrder = {
    noAntrian: string
    noOrder: string
    nama: string
    layanan: string
    berat: string
    jumlah: string
    totalHarga: string
    status: string
}

export default function ProsesLaundryPage() {
    const [orders, setOrders] = useState<ProcessOrder[]>([])

    // LOAD DATA DARI LOCALSTORAGE
    useEffect(() => {
        const data = JSON.parse(
            localStorage.getItem('laundry_process_orders') || '[]'
        )
        setOrders(data)
    }, [])

    // UPDATE STATUS
    const updateStatus = (index: number, status: string) => {
        const updated = [...orders]
        updated[index].status = status

        setOrders(updated)
        localStorage.setItem(
            'laundry_process_orders',
            JSON.stringify(updated)
        )
    }

    // PINDAH KE SELESAI
    const markAsDone = (index: number) => {
        const doneOrder = orders[index]

        const selesai =
            JSON.parse(localStorage.getItem('laundry_done_orders') || '[]')

        localStorage.setItem(
            'laundry_done_orders',
            JSON.stringify([...selesai, { ...doneOrder, status: 'Selesai' }])
        )

        const updated = orders.filter((_, i) => i !== index)
        setOrders(updated)
        localStorage.setItem(
            'laundry_process_orders',
            JSON.stringify(updated)
        )
    }

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">
                    Proses Laundry
                </h1>
                <p className="text-slate-600">
                    Pesanan yang sedang dicuci atau disetrika
                </p>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow p-6">
                {orders.length === 0 ? (
                    <p className="text-slate-500">
                        Tidak ada laundry yang sedang diproses
                    </p>
                ) : (
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b text-slate-700">
                                <th className="py-3">No Antrian</th>
                                <th>No Order</th>
                                <th>Nama</th>
                                <th>Layanan</th>
                                <th>Berat</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>

                        <tbody className="text-slate-600">
                            {orders.map((o, i) => (
                                <tr key={i} className="border-b">
                                    <td className="py-3 font-bold">{o.noAntrian}</td>
                                    <td>{o.noOrder}</td>
                                    <td>{o.nama}</td>
                                    <td>{o.layanan}</td>
                                    <td>{o.berat} Kg</td>
                                    <td>
                                        <select
                                            value={o.status}
                                            onChange={(e) =>
                                                updateStatus(i, e.target.value)
                                            }
                                            className="px-3 py-2 rounded-lg border"
                                        >
                                            <option>Menunggu Antrian</option>
                                            <option>Sedang Dicuci</option>
                                            <option>Sedang Disetrika</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => markAsDone(i)}
                                            className="text-green-600 font-medium hover:underline"
                                        >
                                            Tandai Selesai
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