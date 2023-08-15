
import { createClient } from "microcms-js-sdk";
import type {
 MicroCMSQueries,
 MicroCMSImage,
 MicroCMSDate,
} from "microcms-js-sdk";

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
 throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
 throw new Error("MICROCMS_API_KEY is required");
}

export const client = createClient({
 serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
 apiKey: process.env.MICROCMS_API_KEY,
});

export type Product = {
    name: string;
    featured_image: MicroCMSImage,
    description?: string;
    price: number;
    currency: string[];
    stripe_price_id?: string;
}
export const listProducts = async () => {
    return client.getList<Product>({
        endpoint: 'products'
    })
}