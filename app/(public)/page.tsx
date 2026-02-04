"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Truck, Clock, Shirt, ShieldCheck, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function LandingPage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative container mx-auto px-6 py-20 lg:py-32 grid md:grid-cols-2 gap-12 items-center">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -z-10" />

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold text-blue-700 bg-blue-50 rounded-full border border-blue-100">
            🚀 Solusi Laundry No. 1 di Kandat
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-slate-900">
            Laundry Modern, <br />
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
              Praktis & Terpercaya
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-lg">
            LaundryGo membantu kamu mencuci pakaian dengan teknologi modern.
            Cukup pesan lewat aplikasi, kami jemput, dan antar kembali dalam keadaan bersih sempurna.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="../../app/REGISTER/page.tsx">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 shadow-lg shadow-blue-200 transition-all active:scale-95">
                Daftar Sekarang <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="../../app/LOGIN/page.tsx">
              <Button size="lg" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                Masuk ke Akun
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-blue-100 rounded-3xl -z-10" />
          <img
            src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?q=80&w=2071"
            className="rounded-3xl shadow-2xl object-cover h-[500px] w-full"
            alt="Laundry Service"
          />
        </motion.div>
      </section>

      <section className="bg-blue-50/50 py-24 border-y border-blue-100">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Kenapa Pilih LaundryGo?
            </h2>
            <p className="text-slate-500">
              Layanan laundry profesional dengan standar hotel berbintang untuk pakaian sehari-hari Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <Feature
              icon={<Truck className="w-6 h-6" />}
              title="Antar Jemput"
              desc="Kurir siap menjemput pakaianmu tepat waktu."
            />
            <Feature
              icon={<Clock className="w-6 h-6" />}
              title="Selesai Cepat"
              desc="Layanan kilat 2.5 jam selesai dengan rapi."
            />
            <Feature
              icon={<Shirt className="w-6 h-6" />}
              title="Wangi & Steril"
              desc="Deterjen premium dan pewangi tahan lama."
            />
            <Feature
              icon={<ShieldCheck className="w-6 h-6" />}
              title="Garansi Aman"
              desc="Jaminan keamanan pakaian dari hilang/rusak."
            />
          </div>
        </div>  
      </section>

      <section className="container mx-auto px-6 py-20">
        <div className="bg-blue-600 rounded-[2.5rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-200">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />

          <h2 className="relative z-10 text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Siap Hidup Lebih Praktis?
          </h2>
          <p className="relative z-10 text-blue-100 text-lg mb-10 max-w-xl mx-auto opacity-90">
            Gunakan LaundryGo sekarang dan nikmati kemudahan laundry modern tanpa harus keluar rumah.
          </p>

          <div className="relative z-10">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-12 py-7 text-lg rounded-2xl shadow-xl transition-transform active:scale-95">
                Mulai Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* <section className="container mx-auto px-6 pb-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Our Team
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Tim profesional di balik berjalannya LaundryGo, yang siap memberikan layanan terbaik untuk Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <BACard
            name="Mohammad Kevin Arif Rudianto"
            role="Website Developer"
            image="/nendra1.jpeg"
          />
          <BACard
            name="Muhammad Raffi"
            role="Operational Manager"
            image="/nendra1.jpeg"
          />
          <BACard
            name="Dewangga Firmansyah"
            role="Content & Marketing"
            image="/nendra1.jpeg"
          />
          <div className="md:col-span-3 flex justify-center gap-8">
            <div className="w-full max-w-sm">
              <BACard
                name="Danendra Athallah Indiarto"
                role="Content & Marketing"
                image="/nendra1.jpeg"
              />
            </div>

            <div className="w-full max-w-sm">
              <BACard
                name="Pradipta Daniswara"
                role="Content & Marketing"
                image="/nendra1.jpeg"
              />
            </div>
          </div>

        </div>
      </section> */}
    </main>
  )
}

function Feature({
  icon,
  title,
  desc
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white p-8 rounded-3xl shadow-sm border border-blue-50 text-center hover:shadow-xl hover:shadow-blue-200/40 transition-all duration-300"
    >
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </motion.div>
  )
}

function BACard({
  name,
  role,
  image
}: {
  name: string
  role: string
  image: string
}) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-blue-50 hover:shadow-xl hover:shadow-blue-200/40 transition-all"
    >
      <img
        src={image}
        alt={name}
        className="h-72 w-full object-cover"
      />

      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-slate-900">{name}</h3>
        <p className="text-sm text-blue-600 font-medium mt-1">{role}</p>

        <p className="text-sm text-slate-500 mt-4 leading-relaxed">
          “LaundryGo bikin hidup aku jauh lebih praktis. Tinggal pesan, beres!”
        </p>
      </div>
    </motion.div>
  )
}