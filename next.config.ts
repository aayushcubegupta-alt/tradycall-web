import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // ── Temporarily redirect unfinished pages away from the live deployment.
  // To re-enable a page, simply remove its entry from the array below.
  async redirects() {
    return [
      {
        source: "/features",
        destination: "/",
        permanent: false, // 307 – easy to reverse without cache issues
      },
      {
        source: "/industries",
        destination: "/",
        permanent: false,
      },
      {
        source: "/industries/:path*",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

