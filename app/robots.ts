import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // 어드민 페이지 및 API 크롤링 차단
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || "https://zerocars.netlify.app"}/sitemap.xml`,
  };
}
