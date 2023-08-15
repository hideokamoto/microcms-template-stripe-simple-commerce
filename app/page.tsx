import { Products } from './components/Products'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='mb-32 grid text-center lg:mb-0 md:grid-cols-2 lg:grid-cols-3 lg:text-left md:gap-10 gap-5 sm:px-5'>
        <h1 className='text-4xl font-extrabold'>Products</h1>
        <Products />
      </div>
    </main>
  )
}
