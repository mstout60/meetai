import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Only apply this optimization to the server-side build
    if (isServer) {
      config.externals = [
        ...(config.externals || []),
        "ws",
        "bufferutil",
        "utf-8-validate",
      ];
    }
    return config;
  },
};

export default nextConfig;
