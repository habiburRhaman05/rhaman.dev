/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  // Do not use output: "export": the contact form needs a server-side POST handler.
  // Deploy with a server-capable Next.js host such as Vercel.
};

export default nextConfig;
