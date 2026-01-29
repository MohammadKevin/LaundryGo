"use client"

import Link from "next/link"
import { motion, useScroll, useSpring } from "framer-motion"
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  MapPin,
  Star,
  Quote,
  Users,
  Clock,
  Award,
  Truck,
  Shirt,
  CheckCircle,
  TrendingUp
} from "lucide-react"

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const reviews = [
    { name: "Andi Pratama", role: "Entrepreneur", text: "Layanan cepat dan transparan. Sangat membantu." },
    { name: "Siska Amelia", role: "Ibu Rumah Tangga", text: "Cucian rapi dan wangi, konsisten setiap kali." },
    { name: "Budi Santoso", role: "Karyawan", text: "Antar jemput tepat waktu dan profesional." },
    { name: "Dewi Lestari", role: "Designer", text: "Aman untuk bahan sensitif." },
    { name: "Rizky Fauzi", role: "Mahasiswa", text: "Harga masuk akal, kualitas bagus." },
    { name: "Maya Putri", role: "Creator", text: "Praktis untuk jadwal padat." }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <div className="bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-600">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50" style={{ scaleX }} />

      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2" />
        
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6 cursor-default"
              >
                <TrendingUp size={14} className="text-blue-600" />
                <span className="text-xs font-bold text-blue-700 tracking-wide uppercase">
                  Digital Laundry #1 di Malang
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-6">
                Laundry <span className="text-blue-600 relative inline-block">
                  Digital
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="#2563eb" strokeWidth="2" fill="transparent" />
                  </svg>
                </span>
                <br /> Lebih Praktis.
              </h1>

              <p className="text-slate-500 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
                Solusi cuci baju tanpa keluar rumah. Pesan via aplikasi, kurir kami jemput,
                dan pakaian Anda kembali bersih dalam sekejap.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href="/login"
                  className="group px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                >
                  Pesan Sekarang
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#services"
                  className="px-8 py-4 border-2 border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all text-center"
                >
                  Lihat Layanan
                </Link>
              </div>

              <div className="flex gap-8 items-center border-t border-slate-100 pt-8">
                <div>
                  <p className="text-2xl font-black text-slate-900">4.9/5</p>
                  <div className="flex text-yellow-400 gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                </div>
                <div className="h-10 w-[1px] bg-slate-200" />
                <p className="text-sm text-slate-500 font-medium">
                  Bergabung dengan <span className="text-slate-900 font-bold">2.000+</span> pelanggan setia setiap bulannya.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-blue-600/5 -rotate-3 rounded-[3rem]" />
              <div className="relative bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[3rem] p-12 shadow-2xl shadow-slate-200/50">
                <h3 className="text-2xl font-black mb-10 flex items-center gap-3">
                  <div className="w-2 h-8 bg-blue-600 rounded-full" />
                  Alur LaundryGo
                </h3>

                <div className="space-y-12">
                  {[
                    { icon: <Truck />, title: "Kurir Datang", desc: "Penjemputan sesuai slot waktu pilihanmu." },
                    { icon: <Shirt />, title: "Pencucian Premium", desc: "Deterjen ramah lingkungan & setrika uap." },
                    { icon: <CheckCircle />, title: "Delivery", desc: "Baju wangi diantar sampai depan pintu." }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 10 }}
                      className="flex gap-6 group cursor-default"
                    >
                      <div className="relative">
                        <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200 z-10 relative">
                          {item.icon}
                        </div>
                        {i !== 2 && <div className="absolute top-14 left-1/2 -translate-x-1/2 w-[2px] h-12 bg-slate-100" />}
                      </div>
                      <div>
                        <p className="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors">{item.title}</p>
                        <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="services" className="py-32 bg-slate-50/50">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <p className="text-blue-600 font-black text-xs tracking-[0.2em] mb-4">KEUNGGULAN KAMI</p>
            <h2 className="text-4xl md:text-5xl font-black mb-20 tracking-tight">Standard Baru Laundry Masa Kini</h2>

            <div className="grid md:grid-cols-3 gap-8 text-left">
              {[
                { icon: <Zap />, title: "Super Express", desc: "Selesai dalam 12 jam. Cocok untuk jadwal padat." },
                { icon: <ShieldCheck />, title: "Garansi Higienis", desc: "1 mesin untuk 1 pelanggan. Tidak dicampur." },
                { icon: <MapPin />, title: "Live Tracking", desc: "Pantau status cucianmu detik demi detik via app." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-8">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-4 text-slate-900">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="text-left">
              <p className="text-blue-600 font-black text-xs tracking-[0.2em] mb-4 uppercase">KATA MEREKA</p>
              <h2 className="text-4xl font-black tracking-tight">Rating 4.9 dari Ribuan User</h2>
            </div>
            <Link href="#" className="text-blue-600 font-bold hover:underline flex items-center gap-2">
              Lihat semua review <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 border border-slate-100 rounded-3xl bg-white hover:bg-blue-600 transition-colors duration-500 relative"
              >
                <Quote className="text-blue-200 group-hover:text-blue-400 mb-6 transition-colors" size={40} />
                <p className="text-slate-600 group-hover:text-white mb-8 italic leading-relaxed transition-colors tracking-tight">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-4 border-t border-slate-50 pt-6 group-hover:border-blue-500 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-blue-600">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="font-bold group-hover:text-white transition-colors">{review.name}</p>
                    <p className="text-xs text-slate-400 group-hover:text-blue-200 transition-colors">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="container mx-auto max-w-6xl py-20 bg-slate-900 rounded-[3rem] text-white text-center relative overflow-hidden shadow-2xl shadow-blue-900/20"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/20 blur-3xl -translate-x-1/2 -translate-y-1/2 rounded-full" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">
              Mulai Hidup Lebih <br /> <span className="text-blue-400">Produktif & Santai</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto font-medium">
              Dapatkan diskon 20% untuk pesanan pertamamu hari ini.
            </p>
            <Link
              href="/register"
              className="inline-block px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all"
            >
              Daftar Sekarang
            </Link>
          </div>
        </motion.div>
      </section>

      <footer className="py-20 border-t border-slate-100">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
             <p className="text-2xl font-black text-blue-600 mb-6">LaundryGo.</p>
             <p className="text-slate-500 max-w-xs leading-relaxed">
               Membawa kemudahan teknologi ke dalam kebutuhan rumah tangga Anda. 
               Kualitas premium, harga terjangkau.
             </p>
          </div>
          <div>
            <p className="font-bold mb-6">Layanan</p>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><Link href="#" className="hover:text-blue-600">Cuci Kering</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Cuci Setrika</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Laundry Sepatu</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-bold mb-6">Kontak</p>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li>Papar Nyeni, Jawa Timur</li>
              <li>kevin@laundrygo.com</li>
              <li><a href="https://wa.me/6282334027274">+6282334027274</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400 font-medium">
            Part of SMK Telkom Malang Projects.
          </p>
          <div className="flex gap-6 text-xs text-slate-400 font-bold uppercase tracking-widest">
            <Link href="#" className="hover:text-blue-600 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}