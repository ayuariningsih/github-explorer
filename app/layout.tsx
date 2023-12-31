import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Github Explorer - Integrated with Github API',
  description: 'Integrated with Github API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <body className="relative">
        {children}
      </body>
    </html>
  )
}
