import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[calc(100vh-64px)] flex items-center bg-gradient-to-br from-sky-300 via-sky-400 to-blue-400 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block mb-4 px-4 py-1 bg-white/70 text-blue-600 font-semibold rounded-full text-sm shadow">
              🚀 Laundry Digital Modern
            </span>

            <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow">
              Laundry Jadi <br />
              Lebih <span className="text-blue-900">Mudah</span> <br />
              dengan <span className="text-blue-900">LaundryGo</span>
            </h2>

            <p className="mt-6 text-white/90 max-w-md text-lg">
              Solusi laundry antar jemput dengan sistem tracking online.
              Hemat waktu, proses cepat, dan pelayanan terpercaya.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/login"
                className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-800 hover:scale-105 transition"
              >
                Coba Sekarang
              </Link>

              <Link
                href="#"
                className="px-8 py-3 bg-white/80 text-blue-700 font-semibold rounded-lg shadow hover:bg-white transition"
              >
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="w-80 h-80 bg-white/80 backdrop-blur rounded-3xl shadow-2xl p-8 flex flex-col justify-center gap-4">
              <h3 className="text-xl font-bold text-blue-700 mb-2 text-center">
                Kenapa LaundryGo?
              </h3>

              <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/nendra2.jpeg"
                alt="LaundryGo Preview 1"
                fill
                className="object-cover"
                priority
              />
            </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/nendra2.jpeg"
                alt="LaundryGo Preview 1"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/nendra1.jpeg"
                alt="LaundryGo Preview 2"
                fill
                className="object-cover"
              />
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
