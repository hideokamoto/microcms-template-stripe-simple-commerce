import { getProductById } from '@/app/libs/microcms'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

type PageProps = {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<{
    draft_key?: string
  }>
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = await params
  const product = await getProductById(id).catch(() => null)
  const { title } = await parent
  if (!product) {
    return {
      title,
    }
  }
  return {
    title: `${product.name} | ${title?.absolute}`,
    description: product.description?.replace(/<[^>]*>/g, '').substring(0, 160),
  }
}
export const runtime = 'edge'
export default async function Product({ params, searchParams }: PageProps) {
  const { id: productId } = await params
  const searchParamsResolved = await searchParams
  let product = await getProductById(productId).catch(() => null)
  let draftKey: string | null = null
  if (!product) {
    draftKey = searchParamsResolved?.draft_key || null
    if (draftKey) {
      product = await getProductById(productId, {
        draftKey,
      }).catch(() => null)
    }
  }
  if (!product) {
    notFound()
  }

  // 表示する画像リスト（メイン画像 + 追加画像）
  const allImages = product.featured_image 
    ? [product.featured_image, ...product.images]
    : product.images

  return (
    <div className='w-full'>
      {/* パンくずリスト */}
      <nav className='bg-gray-50 py-4 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-center gap-2 text-sm'>
            <Link href='/' className='text-gray-500 hover:text-gray-700'>
              ホーム
            </Link>
            <span className='text-gray-400'>/</span>
            <Link href='/#products' className='text-gray-500 hover:text-gray-700'>
              商品一覧
            </Link>
            <span className='text-gray-400'>/</span>
            <span className='text-gray-900 font-medium'>{product.name}</span>
          </div>
        </div>
      </nav>

      {/* 商品詳細セクション */}
      <section className='py-8 md:py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
            {/* 画像セクション */}
            <div className='space-y-4'>
              {/* メイン画像 */}
              <div className='relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 group'>
                {allImages.length > 0 ? (
                  <Image
                    src={allImages[0].url}
                    alt={`Product image of ${product.name}`}
                    width={allImages[0].width}
                    height={allImages[0].height}
                    className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-300'
                    priority
                  />
                ) : (
                  <div className='w-full h-full flex items-center justify-center'>
                    <svg className='w-32 h-32 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
                    </svg>
                  </div>
                )}
              </div>

              {/* サムネイル画像（複数ある場合） */}
              {allImages.length > 1 && (
                <div className='grid grid-cols-4 gap-4'>
                  {allImages.slice(0, 4).map((image, index) => (
                    <div
                      key={image.url}
                      className='relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 cursor-pointer hover:opacity-80 transition-opacity border-2 border-transparent hover:border-blue-500'
                    >
                      <Image
                        src={image.url}
                        alt={`Product image ${index + 1} of ${product.name}`}
                        width={image.width}
                        height={image.height}
                        className='object-cover w-full h-full'
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 商品情報セクション */}
            <div className='flex flex-col'>
              <h1 className='text-3xl md:text-4xl font-bold mb-4'>{product.name}</h1>
              
              {/* 価格 */}
              <div className='mb-6'>
                <div className='text-4xl md:text-5xl font-bold text-blue-600 mb-2'>
                  {product.price.toLocaleString()} <span className='text-2xl md:text-3xl'>{product.currency[0]}</span>
                </div>
              </div>

              {/* 説明 */}
              {product.description && (
                <div className='mb-8 prose prose-sm max-w-none'>
                  <div
                    className='text-gray-700 leading-relaxed'
                    dangerouslySetInnerHTML={{
                      __html: product.description,
                    }}
                  />
                </div>
              )}

              {/* 購入フォーム */}
              <div className='mt-auto pt-8 border-t border-gray-200'>
                <form action={`/api/${productId}/checkout`} method='POST' className='space-y-4'>
                  <button
                    disabled={!!draftKey}
                    type='submit'
                    className='btn btn-primary btn-lg w-full md:w-auto px-8 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {draftKey ? '下書きモード' : '購入する'}
                  </button>
                  <input type='hidden' name='amount' value={product.price} />
                  <input type='hidden' name='currency' value={product.currency} />
                  <input type='hidden' name='name' value={product.name} />
                  {product.featured_image ? (
                    <input type='hidden' name='image' value={product.featured_image.url} />
                  ) : null}
                </form>

                {/* 配送・返品情報 */}
                <div className='mt-8 space-y-3 text-sm text-gray-600'>
                  <div className='flex items-center gap-2'>
                    <svg className='w-5 h-5 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                    </svg>
                    <span>安全なお支払い（Stripe）</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <svg className='w-5 h-5 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                    </svg>
                    <span>迅速な配送</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 追加画像セクション（5枚目以降がある場合） */}
      {allImages.length > 4 && (
        <section className='py-12 px-4 sm:px-6 lg:px-8 bg-gray-50'>
          <div className='max-w-7xl mx-auto'>
            <h2 className='text-2xl font-bold mb-8'>商品画像</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {allImages.slice(4).map((image, index) => (
                <div
                  key={image.url}
                  className='relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 group'
                >
                  <Image
                    src={image.url}
                    alt={`Product image ${index + 5} of ${product.name}`}
                    width={image.width}
                    height={image.height}
                    className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-300'
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
