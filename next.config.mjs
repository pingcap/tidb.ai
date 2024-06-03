import withSvgr from 'next-plugin-svgr';
import mdx from '@next/mdx';
import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";


const withMDX = mdx({});

/** @type {import('next').NextConfig} */
let nextConfig = withSvgr(withMDX({
  output: process.env.STANDALONE_BUILD ? 'standalone' : undefined,
  transpilePackages: ['monaco-editor'],
  experimental: {
    optimizePackageImports: ['ai', 'lucide-react'],
    serverComponentsExternalPackages: ['pdfjs-dist', 'llamaindex'],
    outputFileTracingExcludes: {
      '*': ['**canvas**'],
    },
  },
  pageExtensions: ['js', 'jsx', 'mdx', '.md', 'ts', 'tsx'],

  webpack(config, options) {
    config.module.rules.push(
      {
        test: /\.liquid$/,
        type: 'asset/source',
      }
    )
    if (!options.isServer) {
      config.plugins.push(new MonacoWebpackPlugin({
        languages: ['json'],
        filename: 'static/[name].worker.js',
      }));
    }
    return config
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "http://127.0.0.1:3001" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Recaptcha-Token, X-Recaptcha-Action, X-CreateRag-Session, X-Experimental-Stream-Data"
          },
          { key: "Access-Control-Expose-Headers", value: "X-Experimental-Stream-Data, X-CreateRag-Session" }
        ]
      }
    ]
  }
}))

export default nextConfig
