/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['bootstrap'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    });
    return config;
  },
  images: {
    domains: [
      'images.unsplash.com',
      'github.com',
      'localhost',
      'propyto.com' // Add your production domain when you have one
    ],
  },
};

module.exports = nextConfig; 