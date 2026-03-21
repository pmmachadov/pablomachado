/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  basePath: '',
  images: {
    unoptimized: true,
    domains: ['picsum.photos', 'res.cloudinary.com'],
  },
};

module.exports = nextConfig
