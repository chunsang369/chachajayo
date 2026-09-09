export const revalidate = 3600;

import type { Metadata } from "next";
import FaqAccordionClient from "./FaqAccordionClient";
import { getCachedFaqs } from "@/lib/cache";

const SEO_TITLE = "차차자요 | 신용무관승인제 저신용 장기렌트 자주묻는질문";
const SEO_DESC = "무심사 장기렌트 조건, 무보증 진행 절차, 저신용 리스 계약 안내 FAQ 모음.";
const PAGE_URL = "https://chachajayo.vercel.app/faq";

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

export default async function FaqPage() {
  const faqs = await getCachedFaqs();

  const serialized = faqs.map((f: any) => ({
    id: f.id,
    category: f.category,
    question: f.question,
    answer: f.answer,
  }));

  return (
    <div className="min-h-screen bg-[var(--color-bg-subtle)]">
      {/* Header */}
      <div className="bg-[var(--color-primary)] text-white">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-12 lg:py-16 text-center">
          <h1 className="text-2xl lg:text-4xl font-bold mb-2">자주 묻는 질문</h1>
          <p className="text-white/70 text-sm lg:text-base">장기렌트·리스에 대한 궁금증을 해결해드립니다</p>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <FaqAccordionClient faqs={serialized} />
      </div>
    </div>
  );
}
