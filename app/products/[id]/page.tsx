import { getProductById } from '@/app/libs/microcms'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'


type PageProps = {
  params: {
    id: string
  }
  searchParams: {
    draft_key?: string
  }
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const product = await getProductById(params.id).catch(() => null)
  const { title } = await parent
  if (!product) {
    return {
      title,
    }
  }
  return {
    title: `${product.name} | ${title?.absolute}`,
  }
}

export default async function Product({ params: { id: productId }, searchParams }: PageProps) {
  let product = await getProductById(productId).catch(() => null)
  let draftKey: string | null = null
  if (!product) {
    draftKey = searchParams?.draft_key || null
    if (draftKey) {
      product = await getProductById(productId, {
        draftKey,
      }).catch(() => null)
    }
  }
  if (!product) {
    notFound()
  }
  return (
    <div className='mb-32 grid text-center lg:mb-0 md:grid-cols-2 lg:text-left md:gap-10 gap-5 sm:px-5'>
      {product.featured_image ? (
        <img
          src={product.featured_image.url}
          alt={`Product image of ${product.name}`}
          width={product.featured_image.width}
          height={product.featured_image.height}
          className='rounded-t-lg'
        />
      ) : null}
      <form action={`/api/${productId}/checkout`} method='POST'>
        <h1>{product.name}</h1>
        <p>
          {product.price.toLocaleString()} {product.currency[0]}
        </p>
        <div>
          <button
            disabled={!!draftKey}
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Buy now
          </button>
        </div>
        <input type='hidden' name='amount' value={product.price} />
        <input type='hidden' name='currency' value={product.currency} />
        <input type='hidden' name='name' value={product.name} />
        {product.featured_image ? (
          <input type='hidden' name='image' value={product.featured_image.url} />
        ) : null}
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
            key={image.url}
            src={image.url}
            alt={`Product images of ${product?.name}`}
            width={image.width}
            height={image.height}
            className='rounded-t-lg'
          />
        )
      })}
    </div>
  )
}
