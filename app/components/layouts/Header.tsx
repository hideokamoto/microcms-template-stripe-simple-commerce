import { SiteInfo } from '@/app/libs/microcms'
import Link from 'next/link'

export function Header(props: { siteInfo: SiteInfo }) {
  return (
    <header className='sticky top-0 z-50 backdrop-blur-md bg-base-100/80 border-b border-base-300 shadow-sm'>
      <div className='navbar max-w-7xl mx-auto px-4'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <label tabIndex={0} className='btn btn-ghost lg:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
                aria-hidden='true'
                focusable='false'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-300'
            >
              <li>
                <Link href='/' className='font-semibold'>ホーム</Link>
              </li>
              <li>
                <Link href='/products'>商品一覧</Link>
              </li>
            </ul>
          </div>
          <Link
            href='/'
            className='btn btn-ghost normal-case text-xl font-bold text-primary hover:text-primary-focus transition-colors'
          >
            {props.siteInfo.site_title}
          </Link>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1 gap-2'>
            <li>
              <Link href='/' className='font-semibold'>ホーム</Link>
            </li>
            <li>
              <Link href='/products'>商品一覧</Link>
            </li>
          </ul>
        </div>
        <div className='navbar-end'></div>
      </div>
    </header>
  )
}
