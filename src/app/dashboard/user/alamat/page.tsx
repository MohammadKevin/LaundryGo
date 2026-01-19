'use client'

import { useEffect, useState } from 'react'
import { MapPin, Phone, User, Plus, Trash2, Pencil } from 'lucide-react'

interface Alamat {
    id: number
    nama: string
    phone: string
    alamat: string
}

const STORAGE_KEY = 'user_addresses'

export default function AlamatSayaPage() {
    const [alamatList, setAlamatList] = useState<Alamat[]>([])
    const [form, setForm] = useState<Alamat>({
        id: 0,
        nama: '',
        phone: '',
        alamat: '',
    })
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            setAlamatList(JSON.parse(stored))
        } else {
            const initial: Alamat[] = [
                {
                    id: 1,
                    nama: 'Danendra',
                    phone: '081234567890',
                    alamat:
                        'Jl. Soekarno Hatta No. 25, Kel. Tlogomas, Kec. Lowokwaru, Kota Malang',
                },
                {
                    id: 2,
                    nama: 'Pradipta Daniswara',
                    phone: '081234567891',
                    alamat:
                        'Jl. Soekarno Hatta No. 98, Kel. Tlogomas, Kec. Lowokwaru, Kota Malang',
                },
            ]
            setAlamatList(initial)
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(initial)
            )
        }
    }, [])

    const syncStorage = (data: Alamat[]) => {
        setAlamatList(data)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }

    const resetForm = () => {
        setForm({ id: 0, nama: '', phone: '', alamat: '' })
        setIsEditing(false)
    }

    const handleSave = () => {
        if (!form.nama || !form.phone || !form.alamat) {
            alert('Lengkapi data alamat')
            return
        }

        if (isEditing) {
            const updated = alamatList.map((a) =>
                a.id === form.id ? form : a
            )
            syncStorage(updated)
        } else {
            const newData = [
                ...alamatList,
                { ...form, id: Date.now() },
            ]
            syncStorage(newData)
        }

        resetForm()
    }

    const handleEdit = (alamat: Alamat) => {
        setForm(alamat)
        setIsEditing(true)
    }

    const handleDelete = (id: number) => {
        const filtered = alamatList.filter((a) => a.id !== id)
        syncStorage(filtered)
    }

    return (
        <div className="min-h-screen bg-slate-100 p-6">
            <div className="max-w-3xl mx-auto space-y-6">

                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Alamat Saya
                    </h1>
                    <p className="text-slate-600">
                        Kelola alamat untuk penjemputan laundry
                    </p>
                </div>
                {alamatList.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-2xl shadow p-6 space-y-4"
                    >
                        <div className="flex items-center gap-3">
                            <User className="text-blue-600" />
                            <div>
                                <p className="text-sm text-slate-500">
                                    Nama Penerima
                                </p>
                                <p className="font-semibold text-slate-900">
                                    {item.nama}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Phone className="text-blue-600" />
                            <div>
                                <p className="text-sm text-slate-500">
                                    Nomor Telepon
                                </p>
                                <p className="font-semibold text-slate-900">
                                    {item.phone}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <MapPin className="text-blue-600 mt-1" />
                            <div>
                                <p className="text-sm text-slate-500">
                                    Alamat Lengkap
                                </p>
                                <p className="font-semibold text-slate-900">
                                    {item.alamat}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                onClick={() => handleEdit(item)}
                                className="flex items-center gap-1 px-4 py-2
                                        rounded-xl bg-yellow-500 text-white
                                        hover:bg-yellow-600"
                            >
                                <Pencil size={16} /> Edit
                            </button>

                            <button
                                onClick={() => handleDelete(item.id)}
                                className="flex items-center gap-1 px-4 py-2
                                        rounded-xl bg-red-600 text-white
                                        hover:bg-red-700"
                            >
                                <Trash2 size={16} /> Hapus
                            </button>
                        </div>
                    </div>
                ))}

                <div className="bg-white rounded-2xl shadow p-6 space-y-4">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Plus /> {isEditing ? 'Edit Alamat' : 'Tambah Alamat'}
                    </h2>

                    <input
                        type="text"
                        placeholder="Nama Penerima"
                        className="w-full px-4 py-3 rounded-xl border text-slate-900"
                        value={form.nama}
                        onChange={(e) =>
                            setForm({ ...form, nama: e.target.value })
                        }
                    />

                    <input
                        type="tel"
                        placeholder="Nomor Telepon"
                        className="w-full px-4 py-3 rounded-xl border text-slate-900"
                        value={form.phone}
                        onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                        }
                    />

                    <textarea
                        placeholder="Alamat Lengkap"
                        className="w-full px-4 py-3 rounded-xl border resize-none text-slate-900"
                        rows={3}
                        value={form.alamat}
                        onChange={(e) =>
                            setForm({ ...form, alamat: e.target.value })
                        }
                    />

                    <div className="flex justify-end gap-3">
                        {isEditing && (
                            <button
                                onClick={resetForm}
                                className="px-4 py-2 rounded-xl bg-slate-300"
                            >
                                Batal
                            </button>
                        )}

                        <button
                            onClick={handleSave}
                            className="px-5 py-2 rounded-xl bg-blue-600
                                    text-white font-semibold hover:bg-blue-700"
                        >
                            Simpan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
