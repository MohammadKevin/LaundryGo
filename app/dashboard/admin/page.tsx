"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type User = {
    username: string
    role: string
}

export default function AdminDashboard() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const storedUser = localStorage.getItem("authUser")

        if (!storedUser) {
            router.push("/login")
            return
        }

        const parsedUser: User = JSON.parse(storedUser)

        if (parsedUser.role !== "admin") {
            router.push("/dashboard/user")
            return
        }

        setUser(parsedUser)
    }, [router])

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center text-gray-500">
                Loading admin dashboard...
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="flex items-center justify-between border-b bg-white px-8 py-4">
                <h1 className="text-xl font-semibold text-gray-800">
                    Admin Dashboard
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

            <main className="p-8">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Selamat datang, {user.username}
                    </h2>
                    <p className="text-sm text-gray-500">
                        Anda login sebagai <b>Admin</b>
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <h3 className="text-sm font-medium text-gray-500">
                            Total Users
                        </h3>
                        <p className="mt-2 text-3xl font-semibold text-gray-800">
                            128
                        </p>
                    </div>

                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <h3 className="text-sm font-medium text-gray-500">
                            Total Staff
                        </h3>
                        <p className="mt-2 text-3xl font-semibold text-gray-800">
                            12
                        </p>
                    </div>

                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <h3 className="text-sm font-medium text-gray-500">
                            Total Orders
                        </h3>
                        <p className="mt-2 text-3xl font-semibold text-gray-800">
                            342
                        </p>
                    </div>
                </div>

                <div className="mt-10 rounded-xl border bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-base font-semibold text-gray-800">
                        Data Pengguna (Dummy)
                    </h3>

                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b text-left text-gray-500">
                                <th className="py-2">Username</th>
                                <th>Role</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="py-2">kevin</td>
                                <td>admin</td>
                                <td className="text-green-600">Aktif</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2">dipta</td>
                                <td>staff</td>
                                <td className="text-green-600">Aktif</td>
                            </tr>
                            <tr>
                                <td className="py-2">gibran</td>
                                <td>user</td>
                                <td className="text-gray-500">Aktif</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}
