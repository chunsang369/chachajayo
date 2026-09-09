import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { resolveLowCreditMonthlyRent } from "@/lib/pricing";
import HeroPromoBanner from "@/components/layout/HeroPromoBanner";
import JetcarCarCatalog from "@/components/cars/JetcarCarCatalog";
import QuickQuoteForm from "@/components/form/QuickQuoteForm";

const SEO_TITLE = "차차자요 | 신용무관승인제 저신용·무심사 무보증 장기렌트";
const SEO_DESC = "차차자요 신용무관승인제! 저신용·무심사 무보증 장기렌트 및 리스 즉시 출고 라인업.";
const PAGE_URL = "https://chachajayo.vercel.app/low-credit";

export const metadata: Metadata = {
  title: SEO_TITLE,
  description: SEO_DESC,
  keywords: [
    "차차자요",
    "신용무관승인제",
    "저신용 장기렌트",
    "무심사 장기렌트",
    "무보증 장기렌트",
    "저신용 리스",
    "신차리스",
    "신차렌트",
    "신용불량장기렌트",
    "개인회생장기렌트",
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

export const revalidate = 60;

export default async function LowCreditPage() {
  const rawCars = await prisma.car.findMany({
    where: { isActive: true },
    include: {
      brand: true,
    },
    orderBy: [
      { isPopular: "desc" },
      { sortOrder: "asc" },
      { brand: { sortOrder: "asc" } },
    ],
  });

  const cars = rawCars.map((car) => {
    const rent = resolveLowCreditMonthlyRent(car);
    return {
      id: car.id,
      slug: car.slug,
      brandSlug: car.brand.slug,
      brandName: car.brand.name,
      modelName: car.modelName,
      trimName: car.trimName,
      year: car.year,
      fuelType: car.fuelType,
      category: car.category,
      monthlyRent: rent,
      thumbnailUrl: car.thumbnailUrl || "/hero/hero-bg.jpg",
    };
  });

  return (
    <div className="min-h-screen bg-[#f4f7fa] pt-14 lg:pt-16">
      {/* 1. 상단 제트카 스타일 신차장기렌트 배너 */}
      <HeroPromoBanner />

      {/* 2. 제트카 스타일 브랜드 셀렉터 + 상세 필터 + 차량 리스트 */}
      <JetcarCarCatalog initialCars={cars} />

      {/* 3. 하단 빠른 견적 및 상담신청 */}
      <div className="border-t border-gray-100 bg-white">
        <QuickQuoteForm />
      </div>
    </div>
  );
}
