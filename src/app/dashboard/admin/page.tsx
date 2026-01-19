'use client'

import { useEffect, useState } from 'react'

type Branch = {
    id: string
    nama: string
    alamat: string
    telepon: string
}

type Order = {
    cabang: string
    totalHarga: number
    status: string
}

export default function AdminDashboardPage() {
    const [branches, setBranches] = useState<Branch[]>([])
    const [nama, setNama] = useState('')
    const [alamat, setAlamat] = useState('')
    const [telepon, setTelepon] = useState('')
    const [editingId, setEditingId] = useState<string | null>(null)

    const [income, setIncome] = useState<Record<string, number>>({})
    const [totalIncome, setTotalIncome] = useState(0)

    const loadBranches = () => {
        setBranches(
            JSON.parse(localStorage.getItem('laundry_branches') || '[]')
        )
    }

    const loadIncome = () => {
        const orders: Order[] = JSON.parse(
            localStorage.getItem('laundry_orders') || '[]'
        )

        const selesai = orders.filter(o => o.status === 'Selesai')

        let total = 0
        const perCabang: Record<string, number> = {}

        selesai.forEach(o => {
            total += o.totalHarga || 0
            perCabang[o.cabang] =
                (perCabang[o.cabang] || 0) + (o.totalHarga || 0)
        })

        setIncome(perCabang)
        setTotalIncome(total)
    }

    useEffect(() => {
        loadBranches()
        loadIncome()
    }, [])

    const handleSave = () => {
        if (!nama || !alamat || !telepon) return alert('Lengkapi data')

        const updated = editingId
            ? branches.map(b =>
                  b.id === editingId
                      ? { ...b, nama, alamat, telepon }
                      : b
              )
            : [
                  ...branches,
                  {
                      id: `CB-${Date.now()}`,
                      nama,
                      alamat,
                      telepon,
                  },
              ]

        localStorage.setItem('laundry_branches', JSON.stringify(updated))
        setBranches(updated)
        resetForm()
    }

    const resetForm = () => {
        setNama('')
        setAlamat('')
        setTelepon('')
        setEditingId(null)
    }

    return (
        <div className="min-h-screen space-y-24 bg-gradient-to-br from-slate-100 via-sky-100 to-indigo-100 p-10">

            {/* HERO */}
            <section className="relative overflow-hidden rounded-[48px] bg-gradient-to-br from-indigo-800 via-blue-700 to-cyan-600 p-16 text-white shadow-[0_40px_120px_-30px_rgba(59,130,246,0.9)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_60%)]" />
                <div className="relative">
                    <span className="inline-block mb-5 rounded-full bg-white/20 px-5 py-2 text-xs font-black tracking-widest uppercase">
                        LaundryGo Admin
                    </span>
                    <h1 className="text-5xl font-black tracking-tight">
                        Admin Dashboard
                    </h1>
                    <p className="mt-4 max-w-2xl text-indigo-100 text-sm leading-relaxed">
                        Kelola cabang dan pantau penghasilan LaundryGo dengan
                        tampilan modern kelas enterprise.
                    </p>
                </div>
            </section>

            {/* CABANG */}
            <section className="rounded-[40px] bg-white/80 backdrop-blur-xl p-14 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.25)] border border-white">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-black text-slate-900">
                        Manajemen Cabang
                    </h2>
                    <div className="h-2 w-32 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
                </div>

                <div className="grid md:grid-cols-3 gap-10 mb-12">
                    <Input label="Nama Cabang" value={nama} onChange={setNama} />
                    <Input label="Alamat Cabang" value={alamat} onChange={setAlamat} />
                    <Input label="No Telepon" value={telepon} onChange={setTelepon} />
                </div>

                <div className="flex gap-5 mb-14">
                    <button
                        onClick={handleSave}
                        className="rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 px-10 py-4 text-sm font-black text-white shadow-[0_15px_40px_-10px_rgba(59,130,246,0.8)] hover:scale-[1.04] active:scale-95 transition"
                    >
                        {editingId ? 'Update Cabang' : 'Tambah Cabang'}
                    </button>

                    {editingId && (
                        <button
                            onClick={resetForm}
                            className="rounded-2xl border-2 border-slate-300 px-10 py-4 text-sm font-bold text-slate-700 hover:bg-slate-100"
                        >
                            Batal
                        </button>
                    )}
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-200 shadow">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-100 text-slate-700">
                            <tr>
                                <th className="p-6 text-left">Nama</th>
                                <th className="p-6 text-left">Alamat</th>
                                <th className="p-6 text-left">Telepon</th>
                                <th className="p-6 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {branches.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-12 text-center text-slate-500">
                                        Belum ada cabang
                                    </td>
                                </tr>
                            ) : (
                                branches.map(b => (
                                    <tr
                                        key={b.id}
                                        className="border-t hover:bg-indigo-50/40 transition"
                                    >
                                        <td className="p-6 font-bold text-slate-900">
                                            {b.nama}
                                        </td>
                                        <td className="p-6 text-slate-700">
                                            {b.alamat}
                                        </td>
                                        <td className="p-6 text-slate-700">
                                            {b.telepon}
                                        </td>
                                        <td className="p-6 text-right space-x-6">
                                            <button className="font-bold text-indigo-600 hover:underline">
                                                Edit
                                            </button>
                                            <button className="font-bold text-red-600 hover:underline">
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* PENGHASILAN */}
            <section className="rounded-[40px] bg-gradient-to-br from-emerald-50 to-white p-14 shadow-[0_25px_80px_-20px_rgba(16,185,129,0.4)] border">
                <h2 className="text-3xl font-black text-slate-900 mb-14">
                    Penghasilan Cabang
                </h2>

                <div className="grid md:grid-cols-3 gap-10 mb-16">
                    {Object.entries(income).map(([cabang, total]) => (
                        <div
                            key={cabang}
                            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 p-10 text-white shadow-[0_25px_70px_-15px_rgba(16,185,129,0.85)]"
                        >
                            <div className="absolute inset-0 bg-white/10" />
                            <p className="relative text-sm font-semibold opacity-90">
                                {cabang}
                            </p>
                            <p className="relative mt-4 text-4xl font-black">
                                Rp {total.toLocaleString('id-ID')}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="rounded-3xl bg-gradient-to-br from-green-600 to-emerald-600 p-12 text-white shadow-[0_30px_90px_-20px_rgba(16,185,129,0.9)]">
                    <p className="text-sm font-bold uppercase tracking-widest opacity-90">
                        Total Penghasilan
                    </p>
                    <p className="mt-2 text-5xl font-black">
                        Rp {totalIncome.toLocaleString('id-ID')}
                    </p>
                </div>
            </section>
        </div>
    )
}

function Input({
    label,
    value,
    onChange,
}: {
    label: string
    value: string
    onChange: (v: string) => void
}) {
    return (
        <div>
            <label className="block mb-2 text-xs font-black text-slate-600 uppercase tracking-widest">
                {label}
            </label>
            <input
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-sm text-slate-900 shadow-inner focus:outline-none focus:ring-4 focus:ring-indigo-500/30"
            />
        </div>
    )
}
