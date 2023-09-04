import { Product } from '@/app/libs/microcms'
import { stripe } from '@/app/libs/stripe'
import { MicroCMSContentId, MicroCMSDate } from 'microcms-js-sdk'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

type MicroCMSWebhookEvent = {
  service: string
  api: string
  id: string
  type: string
  contents: {
    old: MicroCMSWebhookContent
    new: MicroCMSWebhookContent
  }
}
type MicroCMSWebhookContent = {
  id: string
  status: string[]
  draftKey: string | null
  publishValue: (MicroCMSContentId & MicroCMSDate & Partial<Product>) | null
  draftValue: (MicroCMSContentId & MicroCMSDate & Partial<Product>) | null
}

export async function POST(request: NextRequest) {
  const microCMSWebhookSecret = process.env.MICROCMS_WEBHOOK_SECRET
  if (microCMSWebhookSecret && microCMSWebhookSecret !== request.headers.get('x-microcms-signature')) {
    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      {
        status: 401,
      },
    )
  }
  
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
  const data: MicroCMSWebhookEvent = await request.json()
  if (data.api !== 'products') {
    return new NextResponse('', {
      status: 201,
    })
  }
  switch (data.type) {
    case 'edit': {
      const newData = data.contents.new
      const oldData = data.contents.old
      if (!newData || !oldData) {
        break
      }
      if (!newData.status.includes('PUBLISH')) {
        break
      }

      // Stripeの商品を更新
      const product = await stripe.products.retrieve(newData.id).catch(() => null)
      if (!product) break
      const newProductParam: Stripe.ProductUpdateParams = {}
      const { name, description, images } = newData.publishValue || {}
      if (name) newProductParam.name = name
      if (description) newProductParam.description = description
      if (images && images[0]) newProductParam.images = [images[0].url]
      if (Object.keys(newProductParam).length > 0) {
        await stripe.products.update(newData.id, newProductParam)
      }
      // Stripeの料金を更新
      if (!newData.publishValue?.price || !newData.publishValue?.currency) {
        break
      }
      if (newData.publishValue?.price !== oldData.publishValue?.price) {
        let { id: priceId } = await stripe.prices
          .list({
            product: newData.id,
          })
          .then(({ data }) => data[0])
          .catch((e) => ({ id: null }))
        if (!priceId) {
          break
        }
        const newPrice = await stripe.prices.create({
          product: newData.id,
          unit_amount: newData.publishValue.price,
          currency: newData.publishValue.currency[0],
        })
        await stripe.products.update(newData.id, {
          default_price: newPrice.id,
        })
        await stripe.prices.update(priceId, {
          active: false,
        })
      }
    }
    default:
      break
  }
  return NextResponse.json(
    {
      message: 'done',
    },
    {
      status: 201,
    },
  )
}