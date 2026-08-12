import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */

    // To use forbidden and unauthorized next.js pages, in experimental
    experimental: {
        authInterrupts: true,
    },
};

export default nextConfig;
