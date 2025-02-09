/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"], // Add the domain for Google profile images
  },
  experimental: {
    timeout: 60000,
  },
};

export default nextConfig;
