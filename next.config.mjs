/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Commented out for Vercel dynamic deployment
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig