import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["d31e5l6kryb7tc.cloudfront.net", "events.mapbox.com", "api.mapbox.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/admin/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
