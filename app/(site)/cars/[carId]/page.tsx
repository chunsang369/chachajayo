export const revalidate = 1800;
export const dynamicParams = true;

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CarDetailClient from "./CarDetailClient";
import { getCachedCarBySlug, getCachedCarSlugs } from "@/lib/cache";

// ---------- Static Params (250대 전체 사전 빌드) ----------
export async function generateStaticParams() {
  const cars = await getCachedCarSlugs();
  return cars.map((car: { slug: string }) => ({ carId: car.slug }));
}

// ---------- Dynamic Metadata (SEO) ----------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ carId: string }>;
}): Promise<Metadata> {
  const { carId } = await params;
  const decodedCarId = decodeURIComponent(carId);
  const car = await getCachedCarBySlug(decodedCarId);
  if (!car) return { title: "차차자요 | 신용무관승인제 | 저신용 장기렌트 | 차량 상세" };

  const title = `차차자요 | 신용무관승인제 | 저신용 장기렌트 | ${car.brand.name} ${car.modelName} ${car.trimName} 견적비교`;
  const description = `차차자요 | 신용무관승인제, 저신용 장기렌트 맞춤 견적. ${car.year}년형 ${car.brand.name} ${car.modelName} ${car.trimName} 무심사 무보증 장기렌트, 저신용 리스, 신차렌트 최저가 가격비교.`;
  const pageUrl = `https://chachajayo.vercel.app/cars/${car.slug}`;

  return {
    title,
    description,
    keywords: [
      "차차자요",
      "신용무관승인제",
      "저신용 장기렌트",
      "무심사 장기렌트",
      "무보증 장기렌트",
      "저신용 리스",
      "신차리스",
      "신차렌트",
      `${car.brand.name} 장기렌트`,
      `${car.modelName} 장기렌트`,
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      images: [car.thumbnailUrl || "/og-image.png"],
      type: "website",
      locale: "ko_KR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [car.thumbnailUrl || "/og-image.png"],
    },
  };
}

// ---------- Page ----------
export default async function Page({
  params,
}: {
  params: Promise<{ carId: string }>;
}) {
  const { carId } = await params;
  const decodedCarId = decodeURIComponent(carId);

  const car = await getCachedCarBySlug(decodedCarId);
  if (!car) notFound();

  // JSON serialization/deserialization to ensure a clean plain object for the Client Component
  const serializedCar = JSON.parse(JSON.stringify({
    id: car.id,
    slug: car.slug,
    modelName: car.modelName,
    trimName: car.trimName,
    year: car.year,
    category: car.category,
    fuelType: car.fuelType,
    basePrice: car.basePrice,
    thumbnailUrl: car.thumbnailUrl,
    galleryUrls: car.galleryUrls,
    catalogUrl: car.catalogUrl,
    specSheetUrl: car.specSheetUrl,
    options: car.options,
    priceMatrix: car.priceMatrix,
    brand: {
      name: car.brand.name,
      nameEn: car.brand.nameEn,
      slug: car.brand.slug,
      logoUrl: car.brand.logoUrl,
    },
  }));

  return <CarDetailClient car={serializedCar} />;
}
