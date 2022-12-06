/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    distDir: 'dist',
    images: {
        domains: ['i.scdn.co', 'cataas.com'],
    },
};

module.exports = nextConfig;
