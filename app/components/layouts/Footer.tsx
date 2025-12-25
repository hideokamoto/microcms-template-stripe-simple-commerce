import { SiteInfo } from '@/app/libs/microcms'
import Link from 'next/link'

export function Footer({ siteInfo }: { siteInfo: SiteInfo }) {
  const currentYear = new Date().getFullYear()
  return (
    <footer className='footer footer-center p-8 bg-base-200 text-base-content border-t border-base-300 mt-auto'>
      <div className='max-w-7xl mx-auto w-full'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
          <div>
            <h3 className='font-bold text-lg mb-4 text-primary'>サイト情報</h3>
            <p className='text-base-content/80 break-words'>{siteInfo.description}</p>
          </div>
          <div>
            <h3 className='font-bold text-lg mb-4 text-primary'>ナビゲーション</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='/' className='link link-hover text-base-content/80 hover:text-primary'>
                  ホーム
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='font-bold text-lg mb-4 text-primary'>お問い合わせ</h3>
            <p className='text-base-content/80'>
              ご質問やお問い合わせはお気軽にご連絡ください。
            </p>
          </div>
        </div>
        <div className='divider'></div>
        <div className='text-center text-base-content/60'>
          <p>Copyright © {currentYear} - All right reserved by Hidetaka Okamoto</p>
        </div>
      </div>
    </footer>
  )
}
