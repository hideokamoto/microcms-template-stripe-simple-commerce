import { getProductById } from '@/app/libs/microcms'

export default async function Product({ params: { id: productId } }: { params: { id: string } }) {
  const product = await getProductById(productId)
  if (!product) {
    console.log('not found')
  }
  return (
    <div className='mb-32 grid text-center lg:mb-0 md:grid-cols-2 lg:text-left md:gap-10 gap-5 sm:px-5'>
      <img
        src={product.featured_image.url}
        alt={`Product image of ${product.name}`}
        width={product.featured_image.width}
        height={product.featured_image.height}
        className='rounded-t-lg'
      />
      <form action={`/api/${productId}/checkout`} method='POST'>
        <h1>{product.name}</h1>
        <p>
          {product.price.toLocaleString()} {product.currency[0]}
        </p>
        <div>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Buy now
          </button>
        </div>
        <input type='hidden' name='amount' value={product.price} />
        <input type='hidden' name='currency' value={product.currency} />
        <input type='hidden' name='name' value={product.name} />
        <input type='hidden' name='image' value={product.featured_image.url} />
      </form>
      {product.description ? (
        <div
          dangerouslySetInnerHTML={{
            __html: product.description,
          }}
        />
      ) : null}
      {product.images.length > 0 ? <h2>Product images</h2> : null}
      {product.images.map((image) => {
        return (
          <img
            src={image.url}
            alt={`Product images of ${product.name}`}
            width={image.width}
            height={image.height}
            className='rounded-t-lg'
          />
        )
      })}
    </div>
  )
}
