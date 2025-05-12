/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true,          // ¡<— Desactiva todo el pipeline de optimización/proxying
        remotePatterns: [
            { protocol: 'https', hostname: 'images.pexels.com', pathname: '/**' },
            { protocol: 'https', hostname: 'fakestoreapi.com', pathname: '/img/**' },
            { protocol: 'https', hostname: 'i.ibb.co', pathname: '/**' },
        ],
    },
};

export default nextConfig;
