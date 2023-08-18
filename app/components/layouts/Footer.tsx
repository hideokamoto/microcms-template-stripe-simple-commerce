import { SiteInfo } from '@/app/libs/microcms'

export function Footer({ siteInfo }: { siteInfo: SiteInfo }) {
  return (
    <footer className='footer footer-center p-4 bg-base-300 text-base-content break-words '>
      <div>
        <p>{siteInfo.description}</p>
        <p>Copyright © 2023 - All right reserved by Hidetaka Okamoto</p>
      </div>
    </footer>
  )
}
