import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Self-hosted (Node) deployment: the built-in image optimizer fetches a
    // source image *through Next itself*, and Next does NOT serve files added
    // to public/ after build time (e.g. admin uploads in /uploads). So those
    // uploads 404 inside the optimizer even though nginx serves them fine.
    // Disabling optimization makes <Image> load files directly (uploads via
    // nginx, seed photos as static files) — everything displays reliably.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [120, 200, 320, 480, 640],
  },
};

export default nextConfig;
