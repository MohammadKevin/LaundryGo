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
        <div className="space-y-10 text-slate-900">
            {/* HEADER */}
            <div>
                <h2 className="text-2xl font-bold text-slate-900">
                    Halo, Staff 👋
                </h2>
                <p className="text-slate-700">
                    Selamat bekerja di LaundryGo
                </p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Order Masuk Hari Ini" value="8" />
                <StatCard title="Sedang Diproses" value="5" />
                <StatCard title="Selesai Hari Ini" value="3" />
            </div>

            {/* TABLE / CARD */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-semibold text-lg text-slate-900 mb-4">
                    Order Masuk
                </h3>

                {/* DESKTOP TABLE */}
                <div className="hidden md:block h-80 overflow-y-auto rounded-xl border border-slate-200">
                    <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-slate-100">
                            <tr className="text-slate-800">
                                <th className="p-3 text-left font-semibold">Tanggal</th>
                                <th className="p-3 text-left font-semibold">No Order</th>
                                <th className="p-3 text-left font-semibold">Nama User</th>
                                <th className="p-3 text-left font-semibold">Layanan</th>
                                <th className="p-3 text-left font-semibold">Berat</th>
                                <th className="p-3 text-left font-semibold">Status</th>
                                <th className="p-3 text-left font-semibold">Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((item, index) => (
                                <tr
                                    key={index}
                                    className="border-t border-slate-200 hover:bg-slate-50"
                                >
                                    <td className="p-3 text-slate-800">
                                        {item.date}
                                    </td>
                                    <td className="p-3 font-medium text-slate-900">
                                        {item.order}
                                    </td>
                                    <td className="p-3 text-slate-800">
                                        {item.user}
                                    </td>
                                    <td className="p-3 text-slate-800">
                                        {item.service}
                                    </td>
                                    <td className="p-3 text-slate-800">
                                        {item.weight}
                                    </td>
                                    <td className="p-3">
                                        <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 font-semibold">
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <button className="text-xs px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* MOBILE CARD */}
                <div className="md:hidden space-y-4">
                    {orders.map((item, index) => (
                        <div
                            key={index}
                            className="border border-slate-200 rounded-xl p-4 bg-white"
                        >
                            <div className="flex justify-between items-center mb-1">
                                <p className="font-semibold text-slate-900">
                                    {item.order}
                                </p>
                                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">
                                    {item.status}
                                </span>
                            </div>

                            <p className="text-sm text-slate-800">
                                {item.user}
                            </p>
                            <p className="text-sm text-slate-800">
                                {item.service}
                            </p>
                            <p className="text-xs text-slate-600 mt-1">
                                {item.date} • {item.weight}
                            </p>

                            <button className="mt-4 w-full text-sm py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                                Update Status
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* FOOTER */}
            <footer className="text-center text-xs text-slate-600">
                © 2026 LaundryGo — Developed by Mohammad Kevin
            </footer>
        </div>
    )
}

function StatCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <p className="text-sm text-slate-700 font-medium">
                {title}
            </p>
            <p className="mt-1 text-3xl font-extrabold text-cyan-700">
                {value}
            </p>
        </div>
    )
}
