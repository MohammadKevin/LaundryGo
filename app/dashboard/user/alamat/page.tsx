"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Home, ShoppingCart, MapPin, LogOut } from "lucide-react"

type User = {
    username: string
    role: string
}

type Province = {
    id: string
    name: string
}

type Regency = {
    id: string
    name: string
}

type District = {
    id: string
    name: string
}

type Village = {
    id: string
    name: string
}

type Alamat = {
    id: number
    label: string
    provinsi: string
    kota: string
    kecamatan: string
    kelurahan: string
    detail: string
}

type MenuItemProps = {
    icon: React.ElementType
    label: string
    href: string
}

function MenuItem({ icon: Icon, label, href }: MenuItemProps) {
    const router = useRouter()
    const pathname = usePathname()
    const active = pathname === href

    return (
        <button
            onClick={() => router.push(href)}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${active ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-100"}`}
        >
            <Icon size={18} />
            {label}
        </button>
    )
}

export default function AlamatPage() {
    const router = useRouter()

    const [user, setUser] = useState<User | null>(null)
    const [label, setLabel] = useState("")
    const [detail, setDetail] = useState("")
    const [alamat, setAlamat] = useState<Alamat[]>([])

    const [provinces, setProvinces] = useState<Province[]>([])
    const [regencies, setRegencies] = useState<Regency[]>([])
    const [districts, setDistricts] = useState<District[]>([])
    const [villages, setVillages] = useState<Village[]>([])

    const [provinceId, setProvinceId] = useState("")
    const [regencyId, setRegencyId] = useState("")
    const [districtId, setDistrictId] = useState("")
    const [villageId, setVillageId] = useState("")

    const [provinceName, setProvinceName] = useState("")
    const [regencyName, setRegencyName] = useState("")
    const [districtName, setDistrictName] = useState("")
    const [villageName, setVillageName] = useState("")

    useEffect(() => {
        const storedUser = localStorage.getItem("authUser")
        if (!storedUser) {
            router.push("/login")
            return
        }

        const parsed: User = JSON.parse(storedUser)

        if (parsed.role !== "user") {
            router.push("/dashboard/admin")
            return
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(parsed)

        const storedAlamat = localStorage.getItem("alamatList")
        if (storedAlamat) {
            setAlamat(JSON.parse(storedAlamat))
        }
    }, [router])

    useEffect(() => {
        fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
            .then((res) => res.json())
            .then((data: Province[]) => setProvinces(data))
    }, [])

    useEffect(() => {
        if (!provinceId) return

        fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`)
            .then((res) => res.json())
            .then((data: Regency[]) => setRegencies(data))

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRegencyId("")
        setDistrictId("")
        setVillageId("")
        setDistricts([])
        setVillages([])
    }, [provinceId])

    useEffect(() => {
        if (!regencyId) return

        fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regencyId}.json`)
            .then((res) => res.json())
            .then((data: District[]) => setDistricts(data))

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDistrictId("")
        setVillageId("")
        setVillages([])
    }, [regencyId])

    useEffect(() => {
        if (!districtId) return

        fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json`)
            .then((res) => res.json())
            .then((data: Village[]) => setVillages(data))

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setVillageId("")
    }, [districtId])

    const simpanAlamat = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newAlamat: Alamat = {
            id: Date.now(),
            label,
            provinsi: provinceName,
            kota: regencyName,
            kecamatan: districtName,
            kelurahan: villageName,
            detail
        }

        const updated = [...alamat, newAlamat]
        setAlamat(updated)
        localStorage.setItem("alamatList", JSON.stringify(updated))
        window.dispatchEvent(new Event("alamat-updated"))

        setLabel("")
        setDetail("")
        setProvinceId("")
        setRegencyId("")
        setDistrictId("")
        setVillageId("")
    }

    const hapus = (id: number) => {
        const filtered = alamat.filter((a) => a.id !== id)
        setAlamat(filtered)
        localStorage.setItem("alamatList", JSON.stringify(filtered))
        window.dispatchEvent(new Event("alamat-updated"))
    }

    if (!user) {
        return <div className="flex min-h-screen items-center justify-center">Loading...</div>
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
            <aside className="w-72 border-r bg-white px-8 py-10">
                <h1 className="mb-10 text-xl font-bold text-blue-600">LaundryGo</h1>

                <nav className="space-y-2">
                    <MenuItem icon={Home} label="Dashboard" href="/dashboard/user" />
                    <MenuItem icon={ShoppingCart} label="Order" href="/dashboard/user/order" />
                    <MenuItem icon={MapPin} label="Alamat" href="/dashboard/user/alamat" />
                </nav>

                <button
                    onClick={() => {
                        localStorage.removeItem("authUser")
                        router.push("/")
                    }}
                    className="mt-10 flex items-center gap-3 text-sm text-red-500"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </aside>

            <main className="flex-1 p-12">

                <h2 className="text-3xl font-semibold text-slate-800">
                    Kelola Alamat
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">

                    <form onSubmit={simpanAlamat} className="flex flex-col gap-4 bg-white p-6 rounded-2xl border">

                        <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label" className="border p-2 rounded" />

                        <select value={provinceId} onChange={(e) => {
                            const p = provinces.find(x => x.id === e.target.value)
                            setProvinceId(e.target.value)
                            setProvinceName(p?.name || "")
                        }}>
                            <option value="">Provinsi</option>
                            {provinces.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>

                        <select value={regencyId} disabled={!provinceId} onChange={(e) => {
                            const r = regencies.find(x => x.id === e.target.value)
                            setRegencyId(e.target.value)
                            setRegencyName(r?.name || "")
                        }}>
                            <option value="">Kota</option>
                            {regencies.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                        </select>

                        <select value={districtId} disabled={!regencyId} onChange={(e) => {
                            const d = districts.find(x => x.id === e.target.value)
                            setDistrictId(e.target.value)
                            setDistrictName(d?.name || "")
                        }}>
                            <option value="">Kecamatan</option>
                            {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>

                        <select value={villageId} disabled={!districtId} onChange={(e) => {
                            const v = villages.find(x => x.id === e.target.value)
                            setVillageId(e.target.value)
                            setVillageName(v?.name || "")
                        }}>
                            <option value="">Kelurahan</option>
                            {villages.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                        </select>

                        <textarea value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="Detail alamat" />

                        <button className="bg-blue-600 text-white py-2 rounded">Simpan</button>
                    </form>

                    <div className="space-y-4">
                        {alamat.map(a => (
                            <div key={a.id} className="border p-4 rounded-xl">
                                <div>{a.label}</div>
                                <div className="text-sm">{a.provinsi}, {a.kota}, {a.kecamatan}, {a.kelurahan}</div>
                                <button onClick={() => hapus(a.id)} className="text-red-500 text-sm mt-2">Hapus</button>
                            </div>
                        ))}
                    </div>

                </div>
            </main>
        </div>
    )
}