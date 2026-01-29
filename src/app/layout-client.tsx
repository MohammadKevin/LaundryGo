'use client'

import { usePathname } from 'next/navigation'
import Navbar from '../../components/Navbar'

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isDashboard = pathname.startsWith('/dashboard')

  return (
    <>
      {!isDashboard && <Navbar />}

      <main className={!isDashboard ? 'min-h-[calc(100vh-64px)]' : ''}>
        {children}
      </main>

      {!isDashboard && (
        <footer className="bg-white text-center py-4 text-sm text-slate-500">
          © {new Date().getFullYear()} LaundryGo — Developed by{' '}
          <span className="font-semibold">LaundryGo - Kevin - Danendra - Pradipta</span>
        </footer>
      )}
    </>
  )
}
