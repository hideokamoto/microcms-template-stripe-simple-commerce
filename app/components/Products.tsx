import Link from 'next/link'
import Image from 'next/image'
import { listProducts } from '../libs/microcms'
import { Suspense } from 'react'
import { Pagination } from './layouts/Pagenation'

export async function Products({ offset }: { offset?: number }) {
  const { contents: products, ...args } = await listProducts({ offset })
  const { totalCount, limit } = args
  return (
    <Suspense fallback={
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {[...Array(4)].map((_, i) => (
          <div key={i} className='card bg-base-100 shadow-xl animate-pulse'>
            <div className='h-64 bg-gray-200 rounded-t-2xl'></div>
            <div className='card-body'>
              <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
              <div className='h-4 bg-gray-200 rounded w-1/2'></div>
            </div>
          </div>
        ))}
      </div>
    }>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${
        products.length === 1 ? 'max-w-4xl mx-auto' : ''
      }`}>
        {products.map((product, index) => {
          const isFirstProduct = index === 0
          
          // 1商品目は横並びレイアウト（1ページ目の1商品目と同じスタイル）
          if (isFirstProduct) {
            return (
              <div 
                key={product.id} 
                className='card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden group md:col-span-2 lg:col-span-2 xl:col-span-2'
              >
                <div className='flex flex-col md:flex-row'>
                  {/* 画像セクション（左側） */}
                  <Link href={`/products/${product.id}`} className='relative overflow-hidden md:w-1/2 flex-shrink-0'>
                    {product.featured_image ? (
                      <div className='relative w-full h-64 md:h-96 overflow-hidden'>
                        <Image
                          src={product.featured_image.url}
                          alt={`Product image of ${product.name}`}
                          width={product.featured_image.width}
                          height={product.featured_image.height}
                          className='object-cover w-full h-full group-hover:scale-110 transition-transform duration-300'
                        />
                      </div>
                    ) : (
                      <div className='w-full h-64 md:h-96 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center'>
                        <svg className='w-24 h-24 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
                        </svg>
                      </div>
                    )}
                  </Link>
                  
                  {/* 商品情報セクション（右側） */}
                  <div className='card-body p-6 md:p-8 md:w-1/2 flex flex-col justify-between'>
                    <div>
                      <h2 className='card-title text-2xl mb-3'>
                        <Link href={`/products/${product.id}`} className='hover:text-blue-600 transition-colors'>
                          {product.name}
                        </Link>
                      </h2>
                      {product.description && (
                        <p className='text-gray-600 text-base mb-6 line-clamp-4'>
                          {product.description}
                        </p>
                      )}
                    </div>
                    <div className='card-actions flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-auto'>
                      <div className='text-3xl font-bold text-blue-600'>
                        {product.price.toLocaleString()} <span className='text-base'>{product.currency[0]}</span>
                      </div>
                      <form action={`/api/${product.id}/checkout`} method='POST' className='flex-shrink-0 w-full sm:w-auto'>
                        <button
                          type='submit'
                          className='btn btn-primary btn-md md:btn-lg w-full sm:w-auto'
                        >
                          購入する
                        </button>
                        <input type='hidden' name='amount' value={product.price} />
                        <input type='hidden' name='currency' value={product.currency} />
                        <input type='hidden' name='name' value={product.name} />
                        {product.featured_image ? (
                          <input type='hidden' name='image' value={product.featured_image.url} />
                        ) : null}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          
          // その他の商品は通常の縦並びレイアウト
          return (
            <div 
              key={product.id} 
              className='card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden group'
            >
              <Link href={`/products/${product.id}`} className='relative overflow-hidden'>
                {product.featured_image ? (
                  <div className='relative w-full h-64 overflow-hidden'>
                    <Image
                      src={product.featured_image.url}
                      alt={`Product image of ${product.name}`}
                      width={product.featured_image.width}
                      height={product.featured_image.height}
                      className='object-cover w-full h-full group-hover:scale-110 transition-transform duration-300'
                    />
                  </div>
                ) : (
                  <div className='w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center'>
                    <svg className='w-24 h-24 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
                    </svg>
                  </div>
                )}
              </Link>
              <div className='card-body p-6'>
                <h2 className='card-title text-lg mb-2'>
                  <Link href={`/products/${product.id}`} className='hover:text-blue-600 transition-colors'>
                    {product.name}
                  </Link>
                </h2>
                {product.description && (
                  <p className='text-sm text-gray-600 line-clamp-2 mb-4'>
                    {product.description}
                  </p>
                )}
                <div className='card-actions justify-between items-center mt-auto'>
                  <div className='text-2xl font-bold text-blue-600'>
                    {product.price.toLocaleString()} <span className='text-sm'>{product.currency[0]}</span>
                  </div>
                  <form action={`/api/${product.id}/checkout`} method='POST' className='flex-shrink-0'>
                    <button
                      type='submit'
                      className='btn btn-primary btn-sm md:btn-md'
                    >
                      購入する
                    </button>
                    <input type='hidden' name='amount' value={product.price} />
                    <input type='hidden' name='currency' value={product.currency} />
                    <input type='hidden' name='name' value={product.name} />
                    {product.featured_image ? (
                      <input type='hidden' name='image' value={product.featured_image.url} />
                    ) : null}
                  </form>
                </div>
              </div>
            </div>
          )
        })}
        <div className='col-span-full flex justify-center mt-12'>
          <Pagination totalCount={totalCount} limit={limit} />
        </div>
      </div>
    </Suspense>
  )
}
