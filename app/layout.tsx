import './globals.css'
import type { Metadata } from 'next'
import { getSiteInfo } from './libs/microcms'
import { Header } from './components/layouts/Header'
import { Footer } from './components/layouts/Footer'

export async function generateMetadata(): Promise<Metadata> {
  const siteInfo = await getSiteInfo()
  return {
    title: siteInfo.site_title,
    description: siteInfo.description,
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const siteInfo = await getSiteInfo()
  return (
    <html lang='ja' data-theme='light'>
      <body className='flex flex-col min-h-screen'>
        <Header siteInfo={siteInfo} />
        <main className='flex-1 flex flex-col items-center justify-start py-8 lg:py-12'>
          {children}
        </main>
        <Footer siteInfo={siteInfo} />
      </body>
    </html>
  )
}
