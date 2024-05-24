/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['loremflickr.com'], // Add your image domains here
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/property-for-rent',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
