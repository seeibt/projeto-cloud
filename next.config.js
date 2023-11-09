/** @type {import('next').NextConfig} */

module.exports = {
    trailingSlash: false,
    async headers() {
      return [
        {
          // matching all API routes
          source: '/:path*',
          headers: [
            { key: 'Access-Control-Allow-Credentials', value: 'true' },
            { key: 'Access-Control-Allow-Origin', value: '*' },
            { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          ],
        },
      ];
    },
    async redirects() {
      return [];
    }
  };
