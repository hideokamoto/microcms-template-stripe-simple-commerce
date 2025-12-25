import Link from 'next/link'

export function Pagination({ totalCount, limit }: { totalCount: number; limit: number }) {
  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)
  const totalPages = Math.ceil(totalCount / limit)

  if (totalPages <= 1) return null

  return (
    <div className='join'>
      {range(1, Math.ceil(totalCount / limit)).map((number, index) => (
        <Link 
          key={index} 
          href={number === 1 ? '/products' : `/products/pages/${number}`} 
          className='join-item btn'
        >
          {number}
        </Link>
      ))}
    </div>
  )
}
