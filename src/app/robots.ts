import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard/",
        "/forgot-password",
        "/reset-password",
        "/verify-email",
      ],
    },
    sitemap: "https://tradycall.com/sitemap.xml",
  };
}
