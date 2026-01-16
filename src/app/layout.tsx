import './globals.css'
import LayoutClient from './layout-client'

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
      <body className="bg-sky-200">
        <LayoutClient>
          {children}
        </LayoutClient>
      </body>
    </html>
  )
}
