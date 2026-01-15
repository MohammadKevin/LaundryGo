import './globals.css'
import Navbar from '../../components/Navbar'

export const metadata = {
  title: 'LaundryGo',
  description: 'Laundry antar jemput dengan tracking online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main>{children}</main>

        <footer className="bg-white text-center py-4 text-sm text-slate-500">
          © {new Date().getFullYear()} LaundryGo — Developed by <span className="font-semibold">Mohammad Kevin</span>
        </footer>
      </body>
    </html>
  )
}
