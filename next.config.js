/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  basePath: '',
  images: {
    unoptimized: true,
    domains: ['picsum.photos', 'res.cloudinary.com'],
  },
  // i18n is not compatible with output: 'export'
  // i18n: {
  //   locales: ['en'],
  //   defaultLocale: 'en',
  // },
};

module.exports = nextConfig
