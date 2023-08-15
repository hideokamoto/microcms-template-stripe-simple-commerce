import { listProducts } from '../libs/microcms'

export async function Products() {
  const { contents: products } = await listProducts()
  return (
    <>
      {products.map((product) => {
        return (
          <section key={product.id} className='bg-white pb-10 rounded-lg dark:text-blue-700'>
            <img
              src={product.featured_image.url}
              alt={`Product image of ${product.name}`}
              width={product.featured_image.width}
              height={product.featured_image.height}
              className='rounded-t-lg'
            />

            <div className='px-10 mt-5'>
              <h2 className='text-xl font-bold'>{product.name}</h2>

              <p className='flex justify-between my-2 items-center'>
                <span>
                  {product.price.toLocaleString()} {product.currency[0]}
                </span>

                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                  Buy now
                </button>
              </p>
            </div>
            <input type='hidden' name='stripe_price_id' value={product.stripe_price_id} />
          </section>
        )
      })}
    </>
  )
}
