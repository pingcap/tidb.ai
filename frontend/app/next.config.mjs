import withSvgr from 'next-plugin-svgr';
import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";
import nextra from "nextra";

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

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  flexsearch: {
    codeblocks: false
  },
  defaultShowCopyCode: true,
});

export default withNextra(nextConfig);
