import { getProductById } from '@/app/libs/microcms'

export default async function Product({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)
  return (
    <pre>
      <code>{JSON.stringify({ params, product }, null, 2)}</code>
    </pre>
  )
}
