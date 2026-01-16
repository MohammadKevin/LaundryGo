export default function SelesaiPage() {
    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">
                    Laundry Selesai
                </h1>
                <p className="text-slate-600">
                    Daftar pesanan laundry yang sudah selesai
                </p>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow p-6">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b text-slate-700">
                            <th className="py-3">Tanggal</th>
                            <th>No Order</th>
                            <th>Nama</th>
                            <th>Layanan</th>
                            <th>Berat</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-600">
                        <tr>
                            <td className="py-3">15/01/2026</td>
                            <td>LG-0119</td>
                            <td>Rina</td>
                            <td>Cuci + Setrika</td>
                            <td>4 Kg</td>
                            <td>
                                <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                                    Selesai
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}