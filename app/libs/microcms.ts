import { createClient } from 'microcms-js-sdk'
import type { MicroCMSImage } from 'microcms-js-sdk'

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required')
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required')
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
})

export type Product = {
  name: string
  featured_image: MicroCMSImage
  images: Array<MicroCMSImage>
  description?: string
  price: number
  currency: string[]
}
export const listProducts = async () => {
  return client.getList<Product>({
    customRequestInit: {
        cache: process.env.NODE_ENV === 'production' ? 'default': 'no-cache',
    },
    endpoint: 'products',
  })
}

export const getProductById = async (id: string) => {
  return client.get<Product>({
    customRequestInit: {
        cache: process.env.NODE_ENV === 'production' ? 'default': 'no-cache',
    },
    endpoint: 'products',
    contentId: id,
  })
}
