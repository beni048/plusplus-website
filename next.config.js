const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    const isDev = process.env.NODE_ENV === 'development';
    const scriptSrc = isDev 
      ? "'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com"
      : "'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com";
    
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src ${scriptSrc};
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              font-src 'self' https://fonts.gstatic.com;
              img-src 'self' data: https: blob:;
              connect-src 'self' https://www.google-analytics.com https://analytics.google.com;
              frame-src 'none';
            `.replace(/\s+/g, ' ').trim()
          }
        ]
      }
    ]
  }
};

module.exports = withNextIntl(nextConfig);
