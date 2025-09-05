/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
    ],
  },
  experimental: {
    appDir: true, // keep your app directory enabled
  },
  // Do NOT use `output: "export"` because you have API routes & dynamic pages
};

export default nextConfig;
