export const revalidate = 1800;

import type { Metadata } from "next";
import CarsListClient from "./CarsListClient";
import { getCachedCars, getCachedBrands } from "@/lib/cache";

const SEO_TITLE = "차차자요 | 신용무관승인제 | 저신용 장기렌트 | 전체 차량 신차리스 신차렌트 가격비교";
const SEO_DESC = "차차자요 | 신용무관승인제, 저신용 장기렌트 전 차종 안내. 국산차·수입차 전 모델 무심사 무보증 장기렌트, 신차리스, 신차렌트 실시간 월 렌트료 비교 견적 제공.";
const PAGE_URL = "https://chachajayo.vercel.app/cars";

export const metadata: Metadata = {
  title: SEO_TITLE,
  description: SEO_DESC,
  keywords: [
    "차차자요",
    "신용무관승인제",
    "저신용 장기렌트",
    "무심사 장기렌트",
    "장기렌트",
    "무보증 장기렌트",
    "저신용 리스",
    "신차리스",
    "신차렌트",
    "신차장기렌트",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESC,
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: SEO_DESC,
  },
};

export default async function CarsPage() {
  const cars = await getCachedCars();
  const brands = await getCachedBrands();

  const serializedCars = cars.map((c: any) => ({
    id: c.id,
    slug: c.slug,
    modelName: c.modelName,
    trimName: c.trimName,
    year: c.year,
    category: c.category,
    fuelType: c.fuelType,
    basePrice: c.basePrice,
    thumbnailUrl: c.thumbnailUrl,
    isPopular: c.isPopular,
    isInstant: c.isInstant,
    priceMatrix: c.priceMatrix as Record<string, { rent: number; lease: number }>,
    brand: {
      name: c.brand.name,
      slug: c.brand.slug,
      isDomestic: c.brand.isDomestic,
    },
  }));

  const serializedBrands = brands.map((b: any) => ({
    slug: b.slug,
    name: b.name,
    isDomestic: b.isDomestic,
  }));

  return <CarsListClient cars={serializedCars} brands={serializedBrands} />;
}
