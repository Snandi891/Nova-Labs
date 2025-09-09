/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://nova-labs-puce.vercel.app", // your live site
  generateRobotsTxt: true, // will also generate robots.txt
  sitemapSize: 5000, // ensures all URLs go into one file
  generateIndexSitemap: false, // prevents sitemap-0.xml and sitemap.xml index
};
