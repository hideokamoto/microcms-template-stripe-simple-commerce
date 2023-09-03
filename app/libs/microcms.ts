import { createClient } from 'microcms-js-sdk'
import type { CustomRequestInit, MicroCMSImage, MicroCMSQueries } from 'microcms-js-sdk'

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

const customRequestInit: CustomRequestInit | undefined = (() => {
  if (process.env.NODE_ENV === 'development') {
    return {
      cache: 'no-cache',
    }
  }
  if (process.env?.NEXT_RUNTIME === 'edge') return undefined
  return {
    cache: 'default',
  }
})()

export type Product = {
  name: string
  featured_image?: MicroCMSImage
  images: Array<MicroCMSImage>
  description?: string
  price: number
  currency: string[]
}
export const listProducts = async (queries: MicroCMSQueries = {}) => {
  const pageLimit = 4
  const offset = queries?.offset ? queries?.offset * pageLimit : 0
  return client.getList<Product>({
    customRequestInit,
    endpoint: 'products',
    queries: {
      limit: pageLimit,
      ...queries,
      offset,
    },
  })
}

export const getProductById = async (id: string, queries: MicroCMSQueries = {}) => {
  return client.get<Product>({
    customRequestInit,
    endpoint: 'products',
    contentId: id,
    queries,
  })
}

export type SiteInfo = {
  site_title: string
  description: string
  feature_image?: MicroCMSImage
}
export const getSiteInfo = async ():Promise<SiteInfo> => {
  return client.get<SiteInfo>({
    customRequestInit,
    endpoint: 'site-info',
  }).catch(e => {
    return {
      site_title: "Demo site data",
      description: "Please update your microCMS data to set your site info"
    }
  })
}
