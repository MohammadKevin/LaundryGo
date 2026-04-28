"use client"

import { JSX, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard, ShoppingBag, MapPin, History, Menu as MenuIcon, ChevronLeft,
  Plus, Clock, CreditCard, Star, ChevronRight,
  Store, Info, Truck, Minus, Trash2, QrCode, X, Home
} from "lucide-react"

type CustomerMenu = "dashboard" | "order" | "address" | "history"

interface Address {
  id: number
  label: string
  detail: string
}

export default function CustomerPage(): JSX.Element {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [activeMenu, setActiveMenu] = useState<CustomerMenu>("dashboard")

  const [addresses, setAddresses] = useState<Address[]>([
    { id: 1, label: "Rumah Utama", detail: "Jl. Merdeka No. 1, Lowokwaru, Malang" },
    { id: 2, label: "Kantor", detail: "Gedung Biru Lt. 2, Gubeng, Surabaya" }
  ])

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} activeMenu={activeMenu} setMenu={setActiveMenu} />

      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 flex items-center justify-between bg-white/80 px-8 py-4 backdrop-blur-md border-b border-slate-100">
          <div>
            <h1 className="text-xl font-bold text-slate-900 capitalize">{activeMenu}</h1>
            <p className="text-xs text-slate-400">Panel Pelanggan LaundryGoKu</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <p className="text-xs font-black text-slate-800">Budi Santoso</p>
              <p className="text-[10px] text-emerald-500 font-bold">Saldo: Rp 50.000</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold shadow-lg shadow-sky-100">BS</div>
          </div>
        </header>

        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeMenu === "dashboard" && <CustomerDashboard setMenu={setActiveMenu} />}
              {activeMenu === "order" && <AddOrderPage addresses={addresses} />}
              {activeMenu === "address" && <AddressPage addresses={addresses} setAddresses={setAddresses} />}
              {activeMenu === "history" && <OrderHistory />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

interface SidebarProps {
  collapsed: boolean
  setCollapsed: (v: boolean) => void
  activeMenu: CustomerMenu
  setMenu: (m: CustomerMenu) => void
}

function Sidebar({ collapsed, setCollapsed, activeMenu, setMenu }: SidebarProps): JSX.Element {
  const menuItems: { id: CustomerMenu; label: string; icon: JSX.Element }[] = [
    { id: "dashboard", label: "Beranda", icon: <LayoutDashboard size={20} /> },
    { id: "order", label: "Pesan Laundry", icon: <ShoppingBag size={20} /> },
    { id: "address", label: "Alamat Saya", icon: <MapPin size={20} /> },
    { id: "history", label: "Riwayat Pesanan", icon: <History size={20} /> },
  ]

  return (
    <motion.div animate={{ width: collapsed ? 80 : 280 }} className="relative flex flex-col bg-white border-r border-slate-100 p-4 shadow-sm">
      <div className="flex items-center justify-between px-2 mb-10 mt-2">
        {!collapsed && <h1 className="text-2xl font-black text-sky-600 tracking-tighter">LaundryGoKu</h1>}
        <button onClick={() => setCollapsed(!collapsed)} className="p-2 rounded-xl hover:bg-slate-50 text-slate-400">
          {collapsed ? <MenuIcon size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button key={item.id} onClick={() => setMenu(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group ${activeMenu === item.id ? "bg-sky-500 text-white shadow-lg shadow-sky-200" : "text-slate-500 hover:bg-slate-50"}`}
          >
            <span>{item.icon}</span>
            {!collapsed && <span className="font-semibold text-sm">{item.label}</span>}
          </button>
        ))}
      </nav>
    </motion.div>
  )
}

function CustomerDashboard({ setMenu }: { setMenu: (m: CustomerMenu) => void }) {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-sky-100">
        <div className="relative z-10">
          <h2 className="text-2xl font-black mb-2">Pakaian Kotor Menumpuk?</h2>
          <p className="text-sky-100 text-sm mb-6 max-w-xs">Pesan layanan kami sekarang, kurir akan menjemput langsung ke lokasimu!</p>
          <button onClick={() => setMenu("order")} className="bg-white text-sky-600 font-black px-6 py-3 rounded-xl text-xs hover:scale-105 transition-transform">MULAI ORDER</button>
        </div>
        <ShoppingBag className="absolute right-[-20px] bottom-[-20px] text-white/10 w-64 h-64 rotate-12" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="font-black text-slate-800 flex items-center gap-2 mb-6"><Clock size={18} className="text-sky-500" /> Pesanan Terakhir</h3>
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
            <div>
              <p className="text-xs font-black text-slate-800">Cuci Setrika Reguler</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Order #1022 • 12 Apr</p>
            </div>
            <span className="bg-emerald-100 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">Selesai</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function AddOrderPage({ addresses }: { addresses: Address[] }): JSX.Element {
  const [step, setStep] = useState(1)
  const [showQRModal, setShowQRModal] = useState(false)
  const [orderData, setOrderData] = useState({
    branch: "", service: "", serviceType: "", quantity: 1, pricePerUnit: 0,
    addressId: addresses[0]?.id || 0, payment: "COD"
  })

  const branches = [
    { id: "b1", name: "Cabang Malang", distance: "0.8 km", loc: "Lowokwaru" },
    { id: "b2", name: "Cabang Surabaya", distance: "2.4 km", loc: "Gubeng" },
  ]

  const services = [
    { id: "s1", name: "Cuci Setrika", price: 10000, unit: "kg" },
    { id: "s2", name: "Cuci Kering", price: 7500, unit: "kg" },
    { id: "s3", name: "Cuci Satuan", price: 25000, unit: "pcs" },
  ]

  const totalPrice = orderData.quantity * orderData.pricePerUnit

  const handleFinalConfirm = () => {
    if (orderData.payment === "QRIS") {
      setShowQRModal(true)
    } else {
      alert("Pesanan COD Berhasil Dibuat!")
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-10 flex items-center justify-between px-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-black transition-all ${step >= s ? "bg-sky-500 text-white shadow-lg shadow-sky-200" : "bg-white text-slate-300"}`}>{s}</div>
            {s < 3 && <div className={`h-1 w-12 md:w-20 rounded-full ${step > s ? "bg-sky-500" : "bg-slate-200"}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h2 className="text-xl font-black text-slate-800 mb-6 text-center md:text-left">Pilih Cabang Terdekat</h2>
              <div className="grid gap-4">
                {branches.map((b) => (
                  <button key={b.id} onClick={() => { setOrderData({ ...orderData, branch: b.name }); setStep(2); }}
                    className="flex items-center justify-between p-6 rounded-3xl border-2 border-slate-50 hover:border-sky-500 bg-white transition-all group"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className="h-12 w-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all"><Store size={24} /></div>
                      <div>
                        <p className="text-sm font-black text-slate-800">{b.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{b.loc} • {b.distance}</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-sky-500" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <button onClick={() => setStep(1)} className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-1 hover:text-sky-500 transition-all"><ChevronLeft size={14} /> Kembali</button>
              <h2 className="text-xl font-black text-slate-800 mb-6">Layanan & Berat</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {services.map((s) => (
                  <button key={s.id} onClick={() => setOrderData({ ...orderData, service: s.name, pricePerUnit: s.price, serviceType: s.unit })}
                    className={`p-5 rounded-3xl border-2 text-left transition-all ${orderData.service === s.name ? "border-sky-500 bg-sky-50" : "border-slate-50 bg-white"}`}
                  >
                    <p className="text-xs font-black text-slate-800 mb-1">{s.name}</p>
                    <p className="text-[10px] text-sky-600 font-black">Rp {s.price.toLocaleString()}/{s.unit}</p>
                  </button>
                ))}
              </div>

              {orderData.service && (
                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between">
                  <p className="text-xs font-black text-slate-800">Estimasi Jumlah ({orderData.serviceType})</p>
                  <div className="flex items-center gap-6">
                    <button onClick={() => setOrderData({ ...orderData, quantity: Math.max(1, orderData.quantity - 1) })} className="h-10 w-10 bg-white rounded-xl shadow-sm text-sky-500 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all"><Minus size={18} /></button>
                    <p className="text-xl font-black text-slate-800 min-w-[30px] text-center">{orderData.quantity}</p>
                    <button onClick={() => setOrderData({ ...orderData, quantity: orderData.quantity + 1 })} className="h-10 w-10 bg-white rounded-xl shadow-sm text-sky-500 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all"><Plus size={18} /></button>
                  </div>
                </div>
              )}
              <button disabled={!orderData.service} onClick={() => setStep(3)} className="w-full bg-sky-500 text-white font-black py-4 rounded-2xl mt-8 disabled:bg-slate-100 transition-all shadow-lg shadow-sky-100">KONFIRMASI DETAIL</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h3 className="font-black text-slate-800 flex items-center gap-2 mb-6"><MapPin size={18} className="text-sky-500" /> Lokasi Penjemputan</h3>
                <select
                  value={orderData.addressId}
                  onChange={(e) => setOrderData({ ...orderData, addressId: parseInt(e.target.value) })}
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-sky-500 transition-all cursor-pointer"
                >
                  {addresses.map(a => (
                    <option key={a.id} value={a.id}>{a.label} - {a.detail.substring(0, 40)}...</option>
                  ))}
                </select>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h3 className="font-black text-slate-800 flex items-center gap-2 mb-6"><CreditCard size={18} className="text-sky-500" /> Metode Pembayaran</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: "COD", label: "Tunai / COD", icon: <CreditCard size={16} /> },
                    { id: "QRIS", label: "QRIS / Digital", icon: <QrCode size={16} /> }
                  ].map(m => (
                    <button key={m.id} onClick={() => setOrderData({ ...orderData, payment: m.id })}
                      className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${orderData.payment === m.id ? "border-sky-500 bg-sky-50 text-sky-600 font-bold" : "border-slate-50 text-slate-400"}`}
                    >
                      {m.icon} <span className="text-[11px] font-black uppercase tracking-tighter">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 sticky top-28">
                <h3 className="font-black text-slate-800 mb-6">Ringkasan Tagihan</h3>
                <div className="space-y-4 mb-8 text-xs font-bold">
                  <div className="flex justify-between text-slate-400"><span>Layanan</span><span className="text-slate-800">{orderData.service}</span></div>
                  <div className="flex justify-between text-slate-400"><span>Jumlah</span><span className="text-slate-800">{orderData.quantity} {orderData.serviceType}</span></div>
                  <div className="flex justify-between text-emerald-500"><span>Antar-Jemput</span><span>GRATIS</span></div>
                  <div className="pt-4 border-t border-dashed flex justify-between text-lg text-sky-600 font-black"><span>Total</span><span>Rp {totalPrice.toLocaleString()}</span></div>
                </div>
                <button onClick={handleFinalConfirm} className="w-full bg-sky-500 text-white font-black py-5 rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:bg-sky-600 transition-all">
                  <Truck size={20} /> JEMPUT SEKARANG
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showQRModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowQRModal(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white rounded-[3rem] p-8 max-w-sm w-full text-center shadow-2xl">
              <button onClick={() => setShowQRModal(false)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-800 transition-colors"><X size={24} /></button>

              <div className="mb-6">
                <div className="h-12 w-12 bg-sky-50 text-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-4"><QrCode size={24} /></div>
                <h3 className="text-xl font-black text-slate-800">Scan QRIS</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Selesaikan Pembayaran</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-[2rem] border-2 border-dashed border-slate-200 mb-6 overflow-hidden">
                <img
                  src="/qris-laundry.jpg"
                  alt="Scan QRIS LaundryGoKu"
                  className="w-full h-auto rounded-xl shadow-sm mx-auto"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/400x500?text=Scan+QRIS+LaundryGoKu";
                  }}
                />
              </div>

              <div className="bg-sky-50 p-4 rounded-2xl mb-6">
                <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest mb-1">Total Tagihan</p>
                <p className="text-2xl font-black text-sky-700">Rp {totalPrice.toLocaleString()}</p>
              </div>

              <button onClick={() => { alert("Pembayaran Terdeteksi! Pesanan segera diproses."); setShowQRModal(false); }}
                className="w-full bg-slate-800 text-white font-black py-4 rounded-2xl text-xs hover:bg-black transition-all mb-4">
                KONFIRMASI PEMBAYARAN
              </button>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Verifikasi otomatis oleh sistem</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface AddressPageProps {
  addresses: Address[]
  setAddresses: (a: Address[]) => void
}

function AddressPage({ addresses, setAddresses }: AddressPageProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm h-fit sticky top-28">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-sky-50 text-sky-500 rounded-xl"><Plus size={20} /></div>
          <h2 className="text-xl font-black text-slate-800">Tambah Alamat</h2>
        </div>
        <div className="space-y-4">
          <input className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm outline-none font-bold" placeholder="Label Alamat (Rumah/Kantor)" />
          <textarea className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm outline-none font-bold h-24" placeholder="Detail Alamat Lengkap" />
          <button className="w-full bg-sky-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-sky-100">Simpan Alamat</button>
        </div>
      </div>
      <div className="lg:col-span-7 space-y-4">
        <h2 className="text-xl font-black text-slate-800 mb-6 px-2">Alamat Tersimpan</h2>
        {addresses.map((a) => (
          <div key={a.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all">
            <div className="flex gap-4">
              <div className="h-12 w-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-sky-500 transition-colors"><Home size={24} /></div>
              <div>
                <p className="font-black text-slate-800 text-sm leading-tight">{a.label}</p>
                <p className="text-[11px] text-slate-400 font-medium mt-1 leading-relaxed">{a.detail}</p>
              </div>
            </div>
            <button className="text-slate-200 hover:text-red-500 p-2 transition-colors"><Trash2 size={20} /></button>
          </div>
        ))}
      </div>
    </div>
  )
}

function OrderHistory() {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
      <h2 className="text-xl font-black text-slate-800 mb-8">Riwayat Pesanan</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <th className="px-4 py-2">ID & Tanggal</th>
              <th className="px-4 py-2">Layanan</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-slate-50/50 hover:bg-white transition-all group">
              <td className="px-4 py-5 rounded-l-[1.5rem] text-[11px] font-bold text-slate-500 italic">#1022 - 12 Apr</td>
              <td className="px-4 py-5 text-xs font-black text-slate-700">Cuci Setrika Reguler</td>
              <td className="px-4 py-5 text-xs font-black text-sky-600">Rp 50.000</td>
              <td className="px-4 py-5 rounded-r-[1.5rem] text-[10px] font-black text-emerald-500 uppercase">Selesai</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}