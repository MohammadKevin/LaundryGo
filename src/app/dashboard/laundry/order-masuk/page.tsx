export default function OrderMasukPage() {
    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">
                    Order Masuk
                </h1>
                <p className="text-slate-600">
                    Daftar pesanan laundry yang baru masuk
                </p>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow p-6">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b text-slate-700">
                            <th className="py-3">Tanggal</th>
                            <th>No Order</th>
                            <th>Nama Pelanggan</th>
                            <th>Layanan</th>
                            <th>Berat</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-600">
                        <tr className="border-b">
                            <td className="py-3">16/01/2026</td>
                            <td>LG-0123</td>
                            <td>Kevin</td>
                            <td>Cuci + Setrika</td>
                            <td>3.5 Kg</td>
                            <td>
                                <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
                                    Menunggu
                                </span>
                            </td>
                            <td>
                                <button className="text-cyan-600 font-medium hover:underline">
                                    Proses
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}