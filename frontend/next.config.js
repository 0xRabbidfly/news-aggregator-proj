/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',  // Allow all HTTPS image sources
      },
      {
        protocol: 'http',
        hostname: '**',  // Allow all HTTP image sources
      }
    ],
  },
}

module.exports = nextConfig 