export default function Navbar() {
    return (
        <nav className="bg-white h-16 flex items-center justify-between px-12 shadow-sm">
            <h1 className="text-2xl font-extrabold text-blue-600 tracking-tight">
                LaundryGo
            </h1>

            <div className="flex items-center gap-3">
                <button className="px-4 py-2 text-blue-600 border border-blue-400 rounded-md hover:bg-blue-50 transition">
                    Login
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    Register
                </button>
            </div>
        </nav>
    )
}