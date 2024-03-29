import withSvgr from 'next-plugin-svgr';
import mdx from '@next/mdx';

const withMDX = mdx({
});

/** @type {import('next').NextConfig} */
let nextConfig = withSvgr(withMDX({
  experimental: {
    serverComponentsExternalPackages: ['pdfjs-dist'],
  },
  pageExtensions: ['js', 'jsx', 'mdx', '.md', 'ts', 'tsx'],

  webpack(config) {
    config.module.rules.push(
      {
        test: /\.liquid$/,
        type: 'asset/source',
      }
    )
    return config
  },

  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "http://localhost:3000" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Recaptcha-Token, X-Recaptcha-Action, X-CreateRag-Session, X-Experimental-Stream-Data" },
        ]
      }
    ]
  }
}))

export default nextConfig
