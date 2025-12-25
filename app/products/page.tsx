import { Products } from '../components/Products'

export const runtime = 'edge'
export default async function ProductsPage() {
  return (
    <div className='w-full'>
      {/* 商品セクション */}
      <section id='products' className='py-16 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold mb-4'>商品一覧</h2>
            <p className='text-gray-600 text-lg'>お気に入りの商品を見つけてください</p>
          </div>
          <Products offset={0} />
        </div>
      </section>
    </div>
  )
}

