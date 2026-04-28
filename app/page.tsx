"use client"

import { motion } from "framer-motion"
import { JSX } from "react"
import Link from "next/link"

type NavItem = {
  label: string
  href: string
}

type Feature = {
  title: string
  description: string
  icon: string
}

const navItems: NavItem[] = [
  { label: "Home", href: "#" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" }
]

const features: Feature[] = [
  {
    title: "Order Tracking",
    description: "Pantau status laundry secara real-time dengan sistem notifikasi pintar.",
    icon: "🫧"
  },
  {
    title: "Customer Management",
    description: "Database pelanggan tersusun rapi untuk program loyalitas bisnis Anda.",
    icon: "✨"
  },
  {
    title: "Auto Pricing",
    description: "Kalkulasi harga otomatis yang akurat sesuai kategori layanan.",
    icon: "☁️"
  },
  {
    title: "Smart Reports",
    description: "Pantau grafik keuntungan harian dengan tampilan yang mudah dipahami.",
    icon: "💎"
  }
]

export default function Home(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#F0F9FF] text-slate-800 selection:bg-sky-200">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] left-[20%] h-[500px] w-[500px] rounded-full bg-sky-300/30 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] h-[400px] w-[400px] rounded-full bg-white blur-[100px]" />
      </div>

      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  )
}

function Navbar(): JSX.Element {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-5xl px-4"
    >
      <div className="flex items-center justify-between rounded-full border border-white/40 bg-white/60 px-6 py-3 shadow-sm backdrop-blur-xl">
        <h1 className="text-xl font-bold tracking-tight text-sky-600">
          Laundry<span className="text-sky-400">Go</span>
        </h1>

        <div className="hidden gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-slate-500 transition hover:text-sky-500"
            >
              {item.label}
            </a>
          ))}
        </div>

        <Link href="/login">
          <button className="rounded-full bg-sky-500 px-5 py-2 text-sm font-bold text-white transition hover:bg-sky-600 hover:shadow-lg active:scale-95">
            Mulai
          </button>
        </Link>
      </div>
    </motion.nav>
  )
}

function Hero(): JSX.Element {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 pt-20">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 inline-block rounded-full bg-sky-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-600"
        >
          Bersih • Cepat • Profesional
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900 md:text-7xl"
        >
          Kelola Laundry Jadi <br />
          <span className="text-sky-500">Seringan Awan</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mx-auto mt-8 max-w-2xl text-lg text-slate-600 md:text-xl"
        >
          Sistem manajemen laundry modern yang didesain untuk kenyamanan pemilik dan kepuasan pelanggan. Segala urusan bisnis dalam satu genggaman.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button className="w-full rounded-2xl bg-sky-500 px-8 py-4 font-bold text-white shadow-[0_10px_20px_-5px_rgba(14,165,233,0.4)] transition hover:-translate-y-1 hover:bg-sky-600 sm:w-auto">
            Daftar Sekarang
          </button>
          <button className="w-full rounded-2xl bg-white px-8 py-4 font-bold text-sky-600 shadow-sm transition hover:bg-sky-50 sm:w-auto">
            Pelajari Fitur
          </button>
        </motion.div>
      </div>
    </section>
  )
}

function Features(): JSX.Element {
  return (
    <section id="features" className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Dibuat untuk Efisiensi</h2>
          <div className="mt-2 h-1 w-20 bg-sky-400 mx-auto rounded-full" />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="group relative rounded-[2rem] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition hover:shadow-xl hover:shadow-sky-200/50"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-3xl group-hover:bg-sky-500 group-hover:animate-bounce">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA(): JSX.Element {
  return (
    <section className="px-6 py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-[3rem] bg-sky-500 px-8 py-16 text-center text-white"
      >
        <div className="absolute top-0 right-0 h-32 w-32 translate-x-10 -translate-y-10 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-0 left-0 h-32 w-32 -translate-x-10 translate-y-10 rounded-full bg-sky-300/20 blur-2xl" />

        <div className="relative z-10">
          <h2 className="text-3xl font-bold md:text-5xl">Ganti Cara Lama Sekarang</h2>
          <p className="mx-auto mt-6 max-w-lg text-sky-50">
            Nikmati kemudahan mengelola ribuan transaksi dalam satu aplikasi yang intuitif.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 rounded-2xl bg-white px-10 py-4 font-extrabold text-sky-600 transition hover:bg-sky-50"
          >
            Mulai Gratis 14 Hari
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}

function Footer(): JSX.Element {
  return (
    <footer className="bg-white px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
        <div>
          <h1 className="text-xl font-bold text-sky-600">LaundryGoKu</h1>
          <p className="mt-2 text-sm text-slate-400 italic">&quot;Making laundry business lighter than air.&quot;</p>
        </div>
        <div className="flex gap-10 text-sm font-semibold text-slate-500">
          <a href="#" className="hover:text-sky-500 transition">Instagram</a>
          <a href="#" className="hover:text-sky-500 transition">Twitter</a>
          <a href="#" className="hover:text-sky-500 transition">Support</a>
        </div>
        <p className="text-xs text-slate-400">
          © 2026 LaundryGo Cloud System.
        </p>
      </div>
    </footer>
  )
}