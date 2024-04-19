/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // remotePatterns: [
        //     {
        //         protocol: 'https',
        //         hostname: process.env.NEXT_PUBLIC_FLASK_URL,
        //     },
        // ]
        domains: [process.env.NEXT_PUBLIC_FLASK_URL.replace(/^https?:\/\//,'')],
    }
};

export default nextConfig;
