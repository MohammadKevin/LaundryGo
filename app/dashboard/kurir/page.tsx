"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type User = {
    username: string
    role: string
}

export default function KurirDashboard() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const storedUser = localStorage.getItem("authUser")

        if (!storedUser) {
            router.push("/login")
            return
        }

        const parsedUser: User = JSON.parse(storedUser)

        if (parsedUser.role !== "kurir") {
            router.push(`/dashboard/${parsedUser.role}`)
            return
        }

        setUser(parsedUser)
    }, [router])

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center text-gray-500">
                Loading kurir dashboard...
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="flex items-center justify-between border-b bg-white px-8 py-4">
                <h1 className="text-xl font-semibold text-gray-800">
                    Kurir Dashboard
                </h1>
                <button
                    onClick={() => {
                        localStorage.removeItem("authUser")
                        router.push("/login")
                    }}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                    Logout
                </button>
            </header>

            {/* Content */}
            <main className="p-8">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Halo, {user.username} 🚚
                    </h2>
                    <p className="text-sm text-gray-500">
                        Anda login sebagai <b>Kurir</b>
                    </p>
                </div>

                {/* Cards */}
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <h3 className="text-sm font-medium text-gray-500">
                            Tugas Hari Ini
                        </h3>
                        <p className="mt-2 text-3xl font-semibold text-gray-800">
                            5
                        </p>
                    </div>

                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <h3 className="text-sm font-medium text-gray-500">
                            Sedang Diantar
                        </h3>
                        <p className="mt-2 text-3xl font-semibold text-gray-800">
                            2
                        </p>
                    </div>

                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <h3 className="text-sm font-medium text-gray-500">
                            Selesai
                        </h3>
                        <p className="mt-2 text-3xl font-semibold text-gray-800">
                            3
                        </p>
                    </div>
                </div>

                {/* Delivery Table */}
                <div className="mt-10 rounded-xl border bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-base font-semibold text-gray-800">
                        Daftar Pengantaran
                    </h3>

                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b text-left text-gray-500">
                                <th className="py-2">Nama</th>
                                <th>Alamat</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="py-2">Andi</td>
                                <td>Jl. Merdeka No.12</td>
                                <td className="text-blue-600">Diantar</td>
                                <td>
                                    <button className="rounded bg-green-600 px-3 py-1 text-xs text-white hover:bg-green-700">
                                        Selesai
                                    </button>
                                </td>
                            </tr>

                            <tr className="border-b">
                                <td className="py-2">Budi</td>
                                <td>Jl. Sudirman No.5</td>
                                <td className="text-yellow-600">Menunggu</td>
                                <td>
                                    <button className="rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700">
                                        Antar
                                    </button>
                                </td>
                            </tr>

                            <tr>
                                <td className="py-2">Siti</td>
                                <td>Jl. Diponegoro No.8</td>
                                <td className="text-green-600">Selesai</td>
                                <td className="text-gray-400 text-xs">-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}
