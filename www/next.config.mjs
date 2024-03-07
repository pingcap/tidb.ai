import nextra from 'nextra';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '',
  assetPrefix: '/nextra',
  rewrites() {
    return [
      { source: '/nextra/_next/:path*', destination: '/_next/:path*' }
    ]
  }
};

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
});

export default withNextra(nextConfig);
