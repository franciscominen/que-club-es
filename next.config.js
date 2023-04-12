/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
  },
  images: {
    domains: ['www.mundoascenso.com.ar', '1.bp.blogspot.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
}

module.exports = nextConfig
