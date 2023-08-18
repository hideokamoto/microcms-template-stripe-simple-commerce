import { stripe } from '@/app/libs/stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest, { params }: { params: { product_id: string } }) {
  const origin = request.headers.get('origin') || 'http://localhost:3000'
  const referer = request.headers.get('referer') || 'http://localhost:3000'
  const productId = params.product_id
  if (request.headers.get('content-type') !== 'application/x-www-form-urlencoded') {
    return NextResponse.json(
      {
        message: 'Invalid request',
      },
      {
        status: 400,
      },
    )
  }
  const body = await request.formData()
  const amount = body.get('amount') as FormDataEntryValue
  const currency = body.get('currency') as FormDataEntryValue
  const name = body.get('name') as FormDataEntryValue
  const image = body.get('image') as FormDataEntryValue
  let { id: priceId } = await stripe.prices
    .list({
      product: productId,
    })
    .then(({ data }) => data[0])
    .catch((e) => ({ id: null }))
  if (!priceId) {
    const product = await stripe.products.create({
      id: productId,
      default_price_data: {
        unit_amount: Number(amount),
        currency: currency.toString(),
      },
      name: name.toString(),
      images: [image?.toString()],
    })
    priceId =
      typeof product.default_price === 'string'
        ? product.default_price
        : product.default_price?.id ?? ''
  }
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    cancel_url: referer,
    success_url: `${origin}?success=true`,
  })
  if (session.url) {
    return NextResponse.redirect(new URL(session.url), 303)
  } else {
    return NextResponse.json(
      {
        message: 'Failed to create a new checkout session. Please check your Stripe Dashboard.',
      },
      {
        status: 400,
      },
    )
  }
}
