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
    <html lang='ja'>
      <body>
        <Header siteInfo={siteInfo} />
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
          {children}
        </main>
        <Footer siteInfo={siteInfo} />
      </body>
    </html>
  )
}
