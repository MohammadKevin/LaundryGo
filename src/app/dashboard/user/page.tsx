export default function UserDashboard() {
    return (
        <div className="min-h-[calc(100vh-64px)] bg-sky-100 p-10">
            <h1 className="text-3xl font-bold text-blue-700">
                Dashboard User
            </h1>

            <p className="mt-2 text-slate-600">
                Selamat datang di LaundryGo 👋
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="font-semibold text-slate-700">Laundry Aktif</h2>
                    <p className="text-3xl font-bold text-blue-600 mt-2">1</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="font-semibold text-slate-700">Dalam Proses</h2>
                    <p className="text-3xl font-bold text-yellow-500 mt-2">1</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="font-semibold text-slate-700">Selesai</h2>
                    <p className="text-3xl font-bold text-green-600 mt-2">3</p>
                </div>
            </div>
        </div>
    )
}