import { listProducts } from '../libs/microcms'

export async function Products() {
  const { contents: products } = await listProducts()
  return (
    <>
      {products.map((product) => {
        return (
          <section key={product.id} className='bg-white pb-10 rounded-lg dark:text-blue-700'>
            <form action={`/api/${product.id}/checkout`} method='POST'>
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

                  <button
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  >
                    Buy now
                  </button>
                </p>
              </div>
              <input type='hidden' name='amount' value={product.price} />
              <input type='hidden' name='currency' value={product.currency} />
              <input type='hidden' name='name' value={product.name} />
              <input type='hidden' name='image' value={product.featured_image.url} />
            </form>
          </section>
        )
      })}
    </>
  )
}
