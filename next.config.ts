import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    eslint: {
        ignoreDuringBuilds: true,
    },

    // To use forbidden and unauthorized next.js pages, in experimental
    experimental: {
        authInterrupts: true,
    },
};

export default nextConfig;
