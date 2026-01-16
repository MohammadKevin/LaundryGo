'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const QRIS_IMAGE_URL =
    'https://drive.google.com/thumbnail?id=1rI76H05EJYZSGk9nu7jM9-DHDzKoHyCG&sz=w400'

export default function PesanLaundryPage() {
    const router = useRouter()

    const [cabang, setCabang] = useState('')
    const [layanan, setLayanan] = useState('')
    const [berat, setBerat] = useState('')
    const [catatan, setCatatan] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState('')

    const orderNumber = `LG-${Date.now().toString().slice(-6)}`

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setShowModal(true)
    }

    const handleConfirm = () => {
        setShowModal(false)
        router.push('/dashboard/user')
    }

    return (
        <div className="max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900">
                    Pesan Laundry
                </h1>
                <p className="text-slate-500 mt-1">
                    Isi detail pesanan laundry kamu dengan jelas
                </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8">
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-slate-700">
                            Cabang
                        </label>
                        <select
                            required
                            value={cabang}
                            onChange={(e) => setCabang(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:ring-2 focus:ring-cyan-500 outline-none"
                        >
                            <option value="">Pilih Cabang</option>
                            <option>LaundryGo Lowokwaru</option>
                            <option>LaundryGo Sukun</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-semibold text-slate-700">
                            Layanan
                        </label>
                        <select
                            required
                            value={layanan}
                            onChange={(e) => setLayanan(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:ring-2 focus:ring-cyan-500 outline-none"
                        >
                            <option value="">Pilih Layanan</option>
                            <option>Laundry + Kering + Lipat</option>
                            <option>Laundry + Kering + Setrika</option>
                            <option>Setrika Saja</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-semibold text-slate-700">
                            Berat (Kg)
                        </label>
                        <input
                            type="number"
                            min="1"
                            step="0.5"
                            required
                            value={berat}
                            onChange={(e) => setBerat(e.target.value)}
                            placeholder="Contoh: 3.5"
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:ring-2 focus:ring-cyan-500 outline-none"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-2 text-sm font-semibold text-slate-700">
                            Catatan
                        </label>
                        <textarea
                            value={catatan}
                            onChange={(e) => setCatatan(e.target.value)}
                            rows={4}
                            placeholder="Contoh: jangan dicampur pakaian putih"
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:ring-2 focus:ring-cyan-500 outline-none"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 py-4 text-white font-bold text-lg hover:opacity-90 transition"
                        >
                            Pesan Sekarang
                        </button>
                    </div>
                </form>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
                        <h2 className="text-xl font-extrabold text-slate-900">
                            Detail Pesanan
                        </h2>

                        <p className="text-sm text-slate-500 mb-4">
                            Nomor Order:{' '}
                            <span className="font-semibold text-slate-800">
                                {orderNumber}
                            </span>
                        </p>

                        <div className="space-y-2 text-sm">
                            <DetailRow label="Cabang" value={cabang} />
                            <DetailRow label="Layanan" value={layanan} />
                            <DetailRow label="Berat" value={`${berat} Kg`} />
                            <DetailRow label="Catatan" value={catatan || '-'} />
                        </div>

                        <div className="mt-5">
                            <label className="block mb-2 text-sm font-semibold text-slate-800">
                                Metode Pembayaran
                            </label>
                            <select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:ring-2 focus:ring-cyan-500 outline-none"
                            >
                                <option value="">Pilih Metode</option>
                                <option value="QRIS">QRIS (Bayar Sekarang)</option>
                                <option value="CASH">
                                    Cash (Bayar saat diantar)
                                </option>
                            </select>
                        </div>

                        {paymentMethod === 'QRIS' && (
                            <div className="mt-6 flex flex-col items-center">
                                <p className="text-sm font-semibold text-slate-700 mb-4">
                                    Scan QRIS di bawah untuk melakukan pembayaran
                                </p>

                                <div className="w-92 h-92 bg-white rounded-3xl shadow-md flex items-center justify-center border">
                                    <img
                                        src="/qris.png"
                                        alt="QRIS"
                                        className="w-90 h-80 object-contain"
                                    />
                                </div>
                            </div>
                        )}
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 rounded-xl border border-slate-300 py-3 font-semibold text-slate-700 hover:bg-slate-100 transition"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleConfirm}
                                disabled={!paymentMethod}
                                className="flex-1 rounded-xl bg-cyan-600 py-3 font-semibold text-white hover:bg-cyan-700 transition disabled:opacity-50"
                            >
                                Konfirmasi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function DetailRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between bg-slate-50 rounded-lg px-4 py-2">
            <span className="text-slate-600">{label}</span>
            <span className="font-semibold text-slate-900 text-right max-w-[60%]">
                {value}
            </span>
        </div>
    )
}
