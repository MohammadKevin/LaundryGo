'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Edit3, Plus, Store, Wallet, TrendingUp } from 'lucide-react'

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
        setBranches(JSON.parse(localStorage.getItem('laundry_branches') || '[]'))
    }

    const loadIncome = () => {
        const orders: Order[] = JSON.parse(localStorage.getItem('laundry_orders') || '[]')
        const selesai = orders.filter(o => o.status === 'Selesai')

        let total = 0
        const perCabang: Record<string, number> = {}

        selesai.forEach(o => {
            total += o.totalHarga || 0
            perCabang[o.cabang] = (perCabang[o.cabang] || 0) + (o.totalHarga || 0)
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
            ? branches.map(b => b.id === editingId ? { ...b, nama, alamat, telepon } : b)
            : [...branches, { id: `CB-${Date.now()}`, nama, alamat, telepon }]

        localStorage.setItem('laundry_branches', JSON.stringify(updated))
        setBranches(updated)
        resetForm()
    }

    const handleEdit = (branch: Branch) => {
        setEditingId(branch.id)
        setNama(branch.nama)
        setAlamat(branch.alamat)
        setTelepon(branch.telepon)
        window.scrollTo({ top: 400, behavior: 'smooth' })
    }

    const handleDelete = (id: string) => {
        if (confirm('Hapus cabang ini?')) {
            const updated = branches.filter(b => b.id !== id)
            localStorage.setItem('laundry_branches', JSON.stringify(updated))
            setBranches(updated)
        }
    }

    const resetForm = () => {
        setNama('')
        setAlamat('')
        setTelepon('')
        setEditingId(null)
    }

    return (
        <div className="min-h-screen space-y-16 bg-[#f8fafc] p-6 md:p-12 selection:bg-indigo-100">

            {/* HERO SECTION */}
            <motion.section 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-[40px] bg-slate-900 p-12 text-white shadow-2xl"
            >
                <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-[100px]" />
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="space-y-4">
                        <span className="inline-block rounded-full bg-indigo-500/20 px-4 py-1 text-xs font-bold tracking-widest text-indigo-300 uppercase">
                            Admin System v2.0
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter">Control Center</h1>
                        <p className="max-w-md text-slate-400 font-medium">Monitoring performa cabang dan manajemen infrastruktur LaundryGo dalam satu panel.</p>
                    </div>
                    <div className="flex gap-4">
                        <StatMini label="Total Cabang" value={branches.length} icon={<Store size={20}/>} />
                        <StatMini label="Revenue" value="Growth" icon={<TrendingUp size={20}/>} />
                    </div>
                </div>
            </motion.section>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* FORM MANAJEMEN */}
                <motion.section 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-1 h-fit sticky top-12 space-y-8 rounded-[32px] bg-white p-10 shadow-xl border border-slate-100"
                >
                    <div className="space-y-2">
                        <h2 className="text-2xl font-black text-slate-900 italic">Manage Branch</h2>
                        <div className="h-1 w-12 bg-indigo-600 rounded-full" />
                    </div>

                    <div className="space-y-6">
                        <Input label="Branch Name" value={nama} onChange={setNama} placeholder="LaundryGo Pusat" />
                        <Input label="Location" value={alamat} onChange={setAlamat} placeholder="Jl. Sudirman No. 1" />
                        <Input label="Contact" value={telepon} onChange={setTelepon} placeholder="0812..." />
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={handleSave}
                            className="flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 font-black text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
                        >
                            {editingId ? <Edit3 size={18}/> : <Plus size={18}/>}
                            {editingId ? 'Update Detail' : 'Register Branch'}
                        </button>
                        {editingId && (
                            <button onClick={resetForm} className="text-sm font-bold text-slate-400 hover:text-slate-600 transition">Cancel Editing</button>
                        )}
                    </div>
                </motion.section>

                {/* TABLE CABANG */}
                <motion.section 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 space-y-8 rounded-[32px] bg-white p-10 shadow-xl border border-slate-100"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                                    <th className="pb-6 pl-4">Branch Info</th>
                                    <th className="pb-6">Contact</th>
                                    <th className="pb-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                <AnimatePresence mode='popLayout'>
                                    {branches.map(b => (
                                        <motion.tr 
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            key={b.id} 
                                            className="group transition-colors hover:bg-slate-50/50"
                                        >
                                            <td className="py-6 pl-4">
                                                <div className="font-black text-slate-900">{b.nama}</div>
                                                <div className="text-xs font-medium text-slate-400">{b.alamat}</div>
                                            </td>
                                            <td className="py-6 font-bold text-slate-600 text-sm">{b.telepon}</td>
                                            <td className="py-6 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => handleEdit(b)} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Edit3 size={18}/></button>
                                                    <button onClick={() => handleDelete(b.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={18}/></button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </motion.section>
            </div>

            {/* PENGHASILAN SECTION */}
            <section className="space-y-10">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl"><Wallet /></div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Financial Reports</h2>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    <motion.div 
                        whileHover={{ y: -5 }}
                        className="md:col-span-2 rounded-[32px] bg-gradient-to-br from-emerald-500 to-teal-600 p-10 text-white shadow-xl shadow-emerald-200"
                    >
                        <p className="text-xs font-black uppercase tracking-widest opacity-70">Accumulated Revenue</p>
                        <p className="mt-4 text-6xl font-black tracking-tighter">
                            Rp {totalIncome.toLocaleString('id-ID')}
                        </p>
                    </motion.div>

                    {Object.entries(income).map(([cabang, total], idx) => (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            key={cabang} 
                            className="rounded-[32px] bg-white p-8 shadow-lg border border-slate-50"
                        >
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{cabang}</p>
                            <p className="mt-2 text-2xl font-black text-slate-800 italic">
                                Rp {total.toLocaleString('id-ID')}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    )
}

function StatMini({ label, value, icon }: { label: string, value: string | number, icon: any }) {
    return (
        <div className="flex items-center gap-4 rounded-2xl bg-white/10 px-6 py-4 backdrop-blur-md">
            <div className="text-indigo-300">{icon}</div>
            <div>
                <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">{label}</p>
                <p className="font-black text-white">{value}</p>
            </div>
        </div>
    )
}

function Input({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder: string }) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
            <input
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full rounded-2xl bg-slate-50 border border-transparent px-5 py-4 text-sm font-bold text-slate-800 transition-all focus:bg-white focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-100"
            />
        </div>
    )
}