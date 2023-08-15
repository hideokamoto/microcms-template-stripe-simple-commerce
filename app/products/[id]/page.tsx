export default async function Product({ params }: { params: { id: string } }) {
  return (
    <pre>
      <code>{JSON.stringify(params, null, 2)}</code>
    </pre>
  )
}
