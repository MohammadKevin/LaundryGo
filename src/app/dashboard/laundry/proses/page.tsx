export default function ProsesLaundryPage() {
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
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b text-slate-700">
                            <th className="py-3">No Order</th>
                            <th>Nama</th>
                            <th>Layanan</th>
                            <th>Berat</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-600">
                        <tr className="border-b">
                            <td className="py-3">LG-0123</td>
                            <td>Kevin</td>
                            <td>Cuci + Setrika</td>
                            <td>3.5 Kg</td>
                            <td>
                                <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                                    Sedang Dicuci
                                </span>
                            </td>
                            <td>
                                <button className="text-green-600 font-medium hover:underline">
                                    Tandai Selesai
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}