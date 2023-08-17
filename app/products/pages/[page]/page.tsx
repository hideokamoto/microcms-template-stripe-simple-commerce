import { Products } from '../../../components/Products'


export default function Home({ params: { page } }: { params: { page: string } }) {
  return (
    <div className='mb-32 grid text-center lg:mb-0 md:grid-cols-2 lg:grid-cols-3 lg:text-left md:gap-10 gap-5 sm:px-5'>
      <h1 className='text-4xl font-extrabold'>Products</h1>
      <Products offset={Number(page) - 1} />
    </div>
  )
}
