/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://phonew.in",
  generateRobotsTxt: true,
  changefreq: "daily",
  exclude: [
    "/admin",
    "/admin/login",
    "/admin/dashboard",
    "/admin/manage-brand",
    "/admin/manage-data",
    "/admin/phone/create",
  ],
  robotsTxtOptions: {
    additionalSitemaps: ["https://api.phonew.in/sitemap/index.xml"],
  },
};
