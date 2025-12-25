import { Products } from './components/Products'
import { getSiteInfo } from './libs/microcms'
import Image from 'next/image'

export const runtime = 'edge'
export default async function Home() {
  const siteInfo = await getSiteInfo()
  return (
    <div className='w-full'>
      {/* Heroセクション */}
      <section className='relative w-full h-[60vh] min-h-[500px] max-h-[800px] overflow-hidden'>
        {siteInfo.feature_image ? (
          <div className='relative w-full h-full'>
            <Image
              src={siteInfo.feature_image.url}
              alt={siteInfo.site_title}
              width={siteInfo.feature_image.width}
              height={siteInfo.feature_image.height}
              className='object-cover w-full h-full'
              priority
            />
            <div className='absolute inset-0 bg-black/40 flex items-center justify-center'>
              <div className='text-center px-4 sm:px-6 lg:px-8 max-w-4xl'>
                <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4'>
                  {siteInfo.site_title}
                </h1>
                {siteInfo.description && (
                  <p className='text-lg md:text-xl text-white/90 max-w-2xl mx-auto'>
                    {siteInfo.description.split('\n')[0]}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className='w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
            <div className='text-center px-4 sm:px-6 lg:px-8 max-w-4xl'>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4'>
                {siteInfo.site_title}
              </h1>
              {siteInfo.description && (
                <p className='text-lg md:text-xl text-white/90 max-w-2xl mx-auto'>
                  {siteInfo.description.split('\n')[0]}
                </p>
              )}
            </div>
          </div>
        )}
      </section>

      {/* 商品セクション */}
      <section id='products' className='py-16 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold mb-4'>商品一覧</h2>
            <p className='text-gray-600 text-lg'>お気に入りの商品を見つけてください</p>
          </div>
          <Products />
        </div>
      </section>

      {/* 特徴セクション */}
      <section className='py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-8 h-8 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold mb-2'>迅速な配送</h3>
              <p className='text-gray-600'>ご注文後、迅速に発送いたします</p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-8 h-8 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold mb-2'>安全なお支払い</h3>
              <p className='text-gray-600'>Stripeによる安全な決済システム</p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-8 h-8 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold mb-2'>高品質な商品</h3>
              <p className='text-gray-600'>厳選された高品質な商品をお届け</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
