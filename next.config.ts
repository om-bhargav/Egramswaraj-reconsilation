import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Screenshots attached to contact requests are served from Cloudinary, so
    // next/image has to be told that host is allowed.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
