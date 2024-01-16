/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/auth/oidc_signout",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `frame-ancestors 'self' ${process.env.STACKUP_HOST}`,
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
