/** @type {import('next').NextConfig} */
const nextConfig = {
    images: [{
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "images.microcms-assets.io",   
                port: '',
                pathname: '/assets/**',             
            }
        ]
    }]
}

module.exports = nextConfig
