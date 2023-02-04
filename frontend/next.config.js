/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    API_URL: "http://127.0.0.1:1337/api",
    API_TOKEN:
      "c3d78888dd2ab183ea874bb160bced90a88767b7c7a0c1b9fbe2d83a383702ef42bf15fe7b68a957217e8d0cc8ab2497ec2b651a75e5165fc89f73ec44bc8c94d98c8c5d6fbd196cce5c852da9b6867ef675ad197fbfcc3668d489c62fd66e72047dbd5ddc9a2a89e297284c2979d7f2ae5a5bfbb0cf01152b8edaafca564f5f",
    API_IMAGE_URL: "http://127.0.0.1:1337",
  },
  redirects: async () => {
    return [
      {
        source: "/admin",
        destination: "/admin/login",
        permanent: true,
      },
      {
        source: "/search",
        destination: "/",
        permanent: true,
      },
      {
        source: "/phone",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
