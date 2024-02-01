const withSvgr = require('next-plugin-svgr')
const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
let nextConfig = withSvgr(withMDX({
  experimental: {
    serverComponentsExternalPackages: ['pdfjs-dist'],
  },
  pageExtensions: ['js', 'jsx', 'mdx', '.md', 'ts', 'tsx']
}))

module.exports = nextConfig
