import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'NestVT — UVM Student Housing',
    template: '%s | NestVT',
  },
  description: 'Find your perfect off-campus apartment near the University of Vermont. NestVT connects UVM students with verified Burlington housing — tours, lease review, and coordinator support included.',
  keywords: ['UVM housing', 'Burlington Vermont apartments', 'UVM off-campus housing', 'University of Vermont rentals'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nestvt.com',
    siteName: 'NestVT',
    title: 'NestVT — UVM Student Housing',
    description: 'Find your perfect off-campus apartment near the University of Vermont.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans antialiased bg-bg-base text-text-primary">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
