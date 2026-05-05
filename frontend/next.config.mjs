/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  // Suppress Three.js/R3F peer dep warnings
  transpilePackages: ["three"],
};

export default nextConfig;
