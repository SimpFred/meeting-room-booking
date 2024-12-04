/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      loaders: {
        // Lägg till dina loaders här om du behöver
      },
    },
  },
};

export default nextConfig;
