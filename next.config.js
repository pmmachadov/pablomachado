/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ['picsum.photos', 'res.cloudinary.com'],
  },
};

module.exports = nextConfig
