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
}))

export default nextConfig
