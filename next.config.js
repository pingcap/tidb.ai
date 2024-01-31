const withSvgr = require('next-plugin-svgr')

/** @type {import('next').NextConfig} */
let nextConfig = withSvgr({
  experimental: {
    serverComponentsExternalPackages: ['pdfjs-dist'],
  },
})

module.exports = nextConfig
