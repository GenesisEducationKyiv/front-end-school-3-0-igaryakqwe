/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  distDir: './dist',
  images: {
    domains: ['cdn.prod.website-files.com', 'picsum.photos'],
  },
};

export default nextConfig;
