import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  title: {
    default: 'ZaynahsPOS | #1 Multi-Platform Cloud POS System & CRM in Pakistan',
    template: '%s | ZaynahsPOS'
  },
  description: 'ZaynahsPOS is a modern, blazing-fast multi-platform POS system with real-time sync, offline capability, barcode scanner, wholesale/retail modes, and advanced business analytics.',
  keywords: ['POS', 'Point of Sale', 'CRM', 'ZaynahsPOS', 'Shop Management System', 'Retail POS', 'Wholesale POS', 'Cloud POS', 'Inventory Management', 'Pakistan POS', 'Best POS for small business', 'Supermarket POS', 'Pharmacy POS', 'Restaurant POS', 'Boutique POS', 'Shoaib Zaynah'],
  authors: [{ name: 'Shoaib Zaynah', url: 'https://shoaibzaynah.com' }],
  creator: 'Shoaib Zaynah',
  publisher: 'ZaynahsPOS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: 'https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/zaynahspos.com.webp',
        href: 'https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/zaynahspos.com.webp',
      }
    ],
    shortcut: 'https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/zaynahspos.com.webp',
    apple: 'https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/zaynahspos.com.webp',
  },
  metadataBase: new URL('https://zaynahspos.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ZaynahsPOS | Lightning-Fast Multi-Platform POS System',
    description: 'Grow your business with ZaynahsPOS. The #1 rated cloud point of sale system with mobile apps, advanced checkout, wholesale/retail modes, and real-time syncing.',
    url: 'https://zaynahspos.com',
    siteName: 'ZaynahsPOS',
    images: [
      {
        url: 'https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/featres%20of%20pos/zaynahspos.com%20pos%20barcode%20scaner%20and%20recipt%20printer.webp', // Must be an absolute URL
        width: 1200,
        height: 630,
        alt: 'ZaynahsPOS Dashboard preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZaynahsPOS | #1 Multi-Platform Cloud POS System',
    description: 'Join 300+ happy users! Supercharge your retail or wholesale business with ZaynahsPOS.',
    creator: '@shoaibzaynah',
    images: ['https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/featres%20of%20pos/zaynahspos.com%20pos%20barcode%20scaner%20and%20recipt%20printer.webp'], // Must be an absolute URL
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-white text-slate-850 dark:bg-brand-dark dark:text-white font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
