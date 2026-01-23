"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ShieldCheck, Zap, MapPin, Star, Quote } from "lucide-react"

export default function HomePage() {
  const reviews = [
    { name: "Andi Pratama", role: "Entrepreneur", text: "Layanan tercepat yang pernah saya coba. Trackingnya sangat akurat!" },
    { name: "Siska Amelia", role: "Ibu Rumah Tangga", text: "Baju anak-anak jadi wangi banget dan rapi. Sangat membantu jadwal saya." },
    { name: "Budi Santoso", role: "Karyawan Swasta", text: "Suka banget sama fitur antar jemputnya. Kurirnya ramah dan tepat waktu." },
    { name: "Dewi Lestari", role: "Fashion Designer", text: "Sangat hati-hati dengan bahan sutra. LaundryGo benar-benar profesional." },
    { name: "Rizky Fauzi", role: "Mahasiswa", text: "Harganya terjangkau untuk kualitas sepremium ini. Aplikasi juga gampang dipake." },
    { name: "Maya Putri", role: "Content Creator", text: "Gak perlu pusing lagi mikirin jemuran kalau hujan. LaundryGo penyelamat!" },
  ];

  return (
    <div className="bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-700 overflow-hidden">
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-10 left-[-5%] w-[30%] h-[30%] bg-sky-400/20 rounded-full blur-[100px] -z-10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8 shadow-sm">
                <Star size={14} className="text-blue-600 fill-blue-600" />
                <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.2em]">Rating 4.9/5 Layanan Terpercaya</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 text-slate-900">
                Laundry Digital <br />
                <span className="text-blue-600 relative">
                  Tanpa Ribet.
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 20" fill="none">
                    <path d="M5 15C70 5 150 5 295 15" stroke="#2563eb" strokeWidth="8" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-500 max-w-lg mb-12 leading-relaxed font-medium">
                Nikmati kemudahan cuci antar-jemput dengan standar kualitas premium. Hemat waktu Anda untuk hal yang lebih penting.
              </p>

              <div className="flex flex-wrap gap-5">
                <Link
                  href="/login"
                  className="px-10 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 hover:-translate-y-1 transition-all shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] flex items-center gap-3"
                >
                  PESAN SEKARANG <ArrowRight size={20} />
                </Link>
                <Link
                  href="#services"
                  className="px-10 py-5 bg-white border-2 border-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center"
                >
                  Lihat Layanan
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 bg-white/40 backdrop-blur-3xl border border-white rounded-[3rem] p-12 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-blue-600" />
                <h3 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Status Laundry</h3>
                <div className="space-y-8">
                  {["Washing", "Drying", "Ironing"].map((step, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="font-bold text-slate-600">{step}</span>
                      <div className={`h-3 w-32 rounded-full ${i === 1 ? "bg-blue-400 animate-pulse" : i === 0 ? "bg-blue-600" : "bg-slate-100"}`} />
                    </div>
                  ))}
                </div>
                <div className="mt-12 p-6 bg-blue-600 rounded-[2rem] text-white flex items-center justify-between shadow-lg">
                    <div>
                      <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Estimasi Selesai</p>
                      <p className="text-2xl font-black">2 Jam Lagi</p>
                    </div>
                    <Zap size={32} className="fill-white" />
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-bounce" />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="services" className="py-32 bg-slate-50 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 text-center md:text-left">
            <div>
              <h2 className="text-blue-600 font-black tracking-widest uppercase text-xs mb-4">Eksklusivitas</h2>
              <p className="text-4xl md:text-5xl font-black tracking-tight">Solusi Terbaik Untuk Anda.</p>
            </div>
            <p className="text-slate-500 max-w-xs font-medium italic border-l-4 border-blue-600 pl-6 hidden md:block">
              "Kami merawat pakaian Anda seperti milik kami sendiri."
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: <Zap size={28} />, title: "Express 12 Jam", desc: "Layanan prioritas untuk kebutuhan mendesak dengan kualitas tetap terjaga." },
              { icon: <ShieldCheck size={28} />, title: "Garansi Kebersihan", desc: "Pengecekan berlapis untuk memastikan tidak ada noda tertinggal." },
              { icon: <MapPin size={28} />, title: "Live Tracking", desc: "Pantau posisi kurir dan status laundry secara real-time dari aplikasi." }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group p-12 bg-white rounded-[3rem] shadow-sm border border-slate-100 hover:border-blue-200 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[1.5rem] flex items-center justify-center mb-10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-blue-600 font-black tracking-widest uppercase text-xs mb-4">Testimonial</h2>
            <p className="text-4xl md:text-5xl font-black tracking-tight">Apa Kata Mereka?</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-sky-50/50 rounded-[2.5rem] border border-sky-100 relative group hover:bg-white hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500"
              >
                <Quote className="absolute top-6 right-8 text-blue-200 group-hover:text-blue-400 transition-colors" size={40} />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 font-medium italic mb-8 relative z-10 leading-relaxed">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-black">
                    {review.name[0]}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm tracking-tight">{review.name}</h4>
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-widest">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-blue-600 rounded-[4rem] p-16 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 relative z-10">Siap Untuk Pakaian <br /> Yang Lebih Bersih?</h2>
              <Link
                href="/register"
                className="inline-block px-12 py-5 bg-white text-blue-600 font-black rounded-full hover:scale-105 transition-transform shadow-xl relative z-10 uppercase tracking-widest text-xs"
              >
                Daftar Sekarang
              </Link>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-slate-100 text-center">
        <h2 className="text-2xl font-black text-blue-600 tracking-tighter mb-4">LaundryGo.</h2>
        <p className="text-slate-400 text-xs font-bold tracking-[0.5em] uppercase">Jakarta &bull; Est 2026 &bull; Premium Care</p>
      </footer>
    </div>
  )
}