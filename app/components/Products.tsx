import Link from 'next/link'
import { listProducts } from '../libs/microcms'
import { Suspense } from 'react'
import { Pagination } from './layouts/Pagenation'

export async function Products({ offset }: { offset?: number }) {
  const { contents: products, ...args } = await listProducts({ offset })
  const { totalCount, limit } = args
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {products.map((product) => {
        return (
          <section key={product.id} className='bg-white pb-10 rounded-lg dark:text-blue-700'>
            {product.featured_image ? (
              <Link href={`/products/${product.id}`}>
                <img
                  src={product.featured_image.url}
                  alt={`Product image of ${product.name}`}
                  width={product.featured_image.width}
                  height={product.featured_image.height}
                  className='rounded-t-lg'
                />
              </Link>
            ) : null}
            <div className='px-10 mt-5'>
              <h2 className='text-xl font-bold'>
                <Link href={`/products/${product.id}`}>{product.name}</Link>
              </h2>

              <form action={`/api/${product.id}/checkout`} method='POST'>
                <p className='flex justify-between my-2 items-center'>
                  <span>
                    {product.price.toLocaleString()} {product.currency[0]}
                  </span>

                  <button
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  >
                    Buy now
                  </button>
                </p>
                <input type='hidden' name='amount' value={product.price} />
                <input type='hidden' name='currency' value={product.currency} />
                <input type='hidden' name='name' value={product.name} />
                {product.featured_image ? (
                  <input type='hidden' name='image' value={product.featured_image.url} />
                ) : null}
              </form>
            </div>
          </section>
        )
      })}
      <Pagination totalCount={totalCount} limit={limit} />
    </Suspense>
  )
}
