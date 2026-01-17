'use client'

import { useEffect, useState } from 'react'

type CourierTaskStatus =
    | 'Menunggu Pick Up Kurir'
    | 'Dalam Perjalanan ke Laundry'
    | 'Siap Diantar'

type CourierTask = {
    id: string
    status: CourierTaskStatus
}

export default function KurirDashboardPage() {
    const [pickup, setPickup] = useState(0)
    const [toLaundry, setToLaundry] = useState(0)
    const [toUser, setToUser] = useState(0)

    useEffect(() => {
        const sync = () => {
            const tasks: CourierTask[] = JSON.parse(
                localStorage.getItem('laundry_courier_tasks') || '[]'
            )

            setPickup(
                tasks.filter(
                    (t) => t.status === 'Menunggu Pick Up Kurir'
                ).length
            )

            setToLaundry(
                tasks.filter(
                    (t) =>
                        t.status ===
                        'Dalam Perjalanan ke Laundry'
                ).length
            )

            setToUser(
                tasks.filter(
                    (t) => t.status === 'Siap Diantar'
                ).length
            )
        }

        sync()
        const interval = setInterval(sync, 800)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="space-y-10 text-slate-900">
            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900">
                    Halo, Kurir 👋
                </h1>
                <p className="text-slate-700 font-medium">
                    Ringkasan tugas kamu hari ini
                </p>
            </div>

            {/* STAT */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Penjemputan"
                    value={pickup}
                    badge="bg-amber-100 text-amber-700"
                />
                <StatCard
                    title="Antar ke Laundry"
                    value={toLaundry}
                    badge="bg-blue-100 text-blue-700"
                />
                <StatCard
                    title="Antar ke Pelanggan"
                    value={toUser}
                    badge="bg-green-100 text-green-700"
                />
            </div>

            {/* INFO */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
                <h2 className="font-extrabold text-slate-900 mb-3">
                    Catatan Penting
                </h2>
                <ul className="text-sm text-slate-700 font-medium list-disc ml-5 space-y-2">
                    <li>Ambil pakaian sesuai alamat pelanggan</li>
                    <li>Update status setelah setiap proses</li>
                    <li>Pastikan pakaian dikirim ke cabang yang benar</li>
                </ul>
            </div>
        </div>
    )
}

function StatCard({
    title,
    value,
    badge,
}: {
    title: string
    value: number
    badge: string
}) {
    return (
        <div className="bg-white rounded-3xl shadow-xl p-6">
            <p className="text-sm font-semibold text-slate-700">
                {title}
            </p>
            <div
                className={`inline-flex mt-4 px-6 py-2 rounded-full text-3xl font-extrabold ${badge}`}
            >
                {value}
            </div>
        </div>
    )
}
