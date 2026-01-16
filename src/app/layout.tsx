import './globals.css'

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
      <body className="bg-sky-100">
        {children}
      </body>
    </html>
  )
}