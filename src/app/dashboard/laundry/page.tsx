'use client'

const orders = [
    {
        date: '12/01/2026',
        order: 'LG-0123',
        user: 'Budi',
        service: 'Cuci + Setrika',
        weight: '3.5 Kg',
        status: 'Menunggu',
    },
]

export default function StaffDashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-900">
                    Halo, Staff 👋
                </h2>
                <p className="text-slate-600">
                    Selamat bekerja di LaundryGo
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Order Masuk Hari Ini" value="8" />
                <StatCard title="Sedang Diproses" value="5" />
                <StatCard title="Selesai Hari Ini" value="3" />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-semibold text-slate-900 mb-4">
                    Order Masuk
                </h3>

                <div className="h-80 overflow-y-auto rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-sky-100">
                            <tr className="text-slate-700">
                                <th className="p-3 text-left">Tanggal</th>
                                <th className="p-3 text-left">No Order</th>
                                <th className="p-3 text-left">Nama User</th>
                                <th className="p-3 text-left">Layanan</th>
                                <th className="p-3 text-left">Berat</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((item, index) => (
                                <tr
                                    key={index}
                                    className="border-t hover:bg-sky-50 transition"
                                >
                                    <td className="p-3">{item.date}</td>
                                    <td className="p-3 font-medium">{item.order}</td>
                                    <td className="p-3">{item.user}</td>
                                    <td className="p-3">{item.service}</td>
                                    <td className="p-3">{item.weight}</td>
                                    <td className="p-3">
                                        <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 font-medium">
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <button className="text-xs px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <footer className="text-center text-xs text-slate-500">
                © 2026 LaundryGo — Developed by Mohammad Kevin
            </footer>
        </div>
    )
}

function StatCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <p className="text-sm text-slate-500">{title}</p>
            <p className="mt-1 text-3xl font-extrabold text-cyan-600">
                {value}
            </p>
        </div>
    )
}
