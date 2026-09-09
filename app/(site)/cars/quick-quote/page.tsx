export const dynamic = "force-static";

import type { Metadata } from "next";
import BrandGrid from "@/components/cars/BrandGrid";
import QuickQuoteForm from "@/components/form/QuickQuoteForm";

const SEO_TITLE = "차차자요 | 신용무관승인제 저신용 장기렌트 빠른 간편견적";
const SEO_DESC = "차차자요 무심사 무보증 장기렌트, 저신용 리스 1분 맞춤 무료 견적 신청.";
const PAGE_URL = "https://chachajayo.vercel.app/cars/quick-quote";

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

export default function QuickQuotePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 히어로 타이틀 */}
      <section className="pt-10 pb-6 lg:pt-16 lg:pb-10 bg-gradient-to-b from-[#0a2540] to-[#143a66] text-center">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
            빠른 간편견적
          </h1>
          <p className="text-sm lg:text-base text-white/70">
            원하는 차량의 견적을 확실하고 빠르게 확인하실 수 있습니다.
          </p>
        </div>
      </section>

      {/* 차량 선택 (BrandGrid) */}
      <BrandGrid />

      {/* 간편견적문의 폼 */}
      <QuickQuoteForm />

      {/* 하단 FloatingCTA 높이 보정 (모바일) */}
      <div className="h-16 lg:h-0" />
    </div>
  );
}
