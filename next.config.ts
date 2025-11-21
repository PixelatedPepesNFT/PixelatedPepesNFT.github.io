import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",          // 🔥 Statik HTML export modu
  reactCompiler: true,       // İstersen bırakabilirsin
  images: {
    unoptimized: true,       // 🔥 next/image statik export için şart
  },
};

export default nextConfig;
