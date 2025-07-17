import createBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
  images: {
    domains: [
      'cdn.prod.website-files.com',
      'picsum.photos',
      'letsenhance.io',
      'cover-image-1.jpg',
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
