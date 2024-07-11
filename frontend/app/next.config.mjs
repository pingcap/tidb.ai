import withSvgr from 'next-plugin-svgr';
import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = withSvgr({
  output: process.env.STANDALONE ? 'standalone' : undefined,
  transpilePackages: ['monaco-editor'],
  experimental: {
    optimizePackageImports: ['ai', 'lucide-react'],
    // https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
    missingSuspenseWithCSRBailout: false,
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.ya?ml$/,
      type: 'json',
      use: 'yaml-loader'
    })
    if (!options.isServer) {
      config.plugins.push(new MonacoWebpackPlugin({
        languages: ['json'],
        filename: 'static/[name].worker.js',
      }));
    }
    return config
  },
});

export default nextConfig;
