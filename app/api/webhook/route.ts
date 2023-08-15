import { Product } from '@/app/libs/microcms'
import { NextRequest, NextResponse } from 'next/server'
export const runtime = 'edge'
export async function POST(request: NextRequest) {
  if (request.headers.get('content-type') !== 'application/json') {
    return NextResponse.json(
      {
        message: 'Bad request.',
      },
      {
        status: 400,
      },
    )
  }
  console.log(JSON.stringify(await request.json(), null, 2))
  const data = await request.json()
  if (data.api !== 'products') {
    return new NextResponse('', {
      status: 204,
    })
  }
  switch (data.type) {
    case 'edit': {
      const newData = data.contents.new as Product
      // Stripeの商品を更新
    }

    default:
  }
  return NextResponse.json(
    {
      message: 'Bad request.',
    },
    {
      status: 400,
    },
  )
}
// https://7f3d-131-129-78-130.ngrok-free.app/api/webhook
// https://microcms-template-stripe-simple-commerce.pages.dev/api/webhook
