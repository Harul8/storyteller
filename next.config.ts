import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the native/CJS PDF + DOCX parsers out of the bundler so they load
  // correctly inside the Node.js route handlers.
  serverExternalPackages: ["unpdf", "mammoth"],
};

export default nextConfig;
