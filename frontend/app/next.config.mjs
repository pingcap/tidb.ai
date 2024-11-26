import withSvgr from 'next-plugin-svgr';
import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";
import nextra from "nextra";
import { GitRevisionPlugin } from "git-revision-webpack-plugin";

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
    const gitRevisionPlugin = new GitRevisionPlugin({
      branch: true,
      lightweightTags: true,
    });
    config.plugins.push(
      gitRevisionPlugin,
      new options.webpack.DefinePlugin({
        'process.env.GIT_VERSION': JSON.stringify(gitRevisionPlugin.version()),
        'process.env.GIT_COMMIT_HASH': JSON.stringify(gitRevisionPlugin.commithash()),
        'process.env.GIT_BRANCH': JSON.stringify(gitRevisionPlugin.branch()),
        'process.env.GIT_LAST_COMMIT_DATETIME': JSON.stringify(gitRevisionPlugin.lastcommitdatetime()),
      })
    );

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

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  search: {
    codeblocks: false
  },
  defaultShowCopyCode: true,
});

export default withNextra(nextConfig);
