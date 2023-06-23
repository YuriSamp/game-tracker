/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.freetogame.com',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
