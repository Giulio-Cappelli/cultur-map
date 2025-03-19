import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  basePath: isProd ? "/cultur-map" : "",
  assetPrefix: isProd ? "/cultur-map/" : "",
  output: "export",
  reactStrictMode: true,
  images: {
    path: "/",
  },
};

export default nextConfig;
