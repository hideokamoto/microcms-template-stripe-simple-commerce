import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_API_KEY) {
  throw new Error('STRIPE_SECRET_API_KEY is required')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY, {
  apiVersion: '2025-10-29.clover',
})
