import type {NextConfig} from 'next';
import {generateLastUpdatedAt} from './scripts/generate-last-updated-at';

const nextConfig: NextConfig = {
  /**
   * Enable static exports for the App Router.
   *
   * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
   */
  output: 'export',

  /**
   * Set base path. This is the slug of your GitHub repository.
   *
   * @see https://nextjs.org/docs/app/api-reference/next-config-js/basePath
   */
  basePath: '',

  /**
   * Disable server-based image optimization. Next.js does not support
   * dynamic features with static exports.
   *
   * @see https://nextjs.org/docs/app/api-reference/components/image#unoptimized
   */
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },

  webpack: (config, {isServer}) => {
    if (isServer) {
      generateLastUpdatedAt();
    }

    return config;
  },

  /* config options here */
  //reactStrictMode: true,
};

export default nextConfig;
