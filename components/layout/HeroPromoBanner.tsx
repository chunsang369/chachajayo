"use client";

import Image from "next/image";
import { ChevronRight, ShieldCheck } from "lucide-react";

export default function HeroPromoBanner() {
  const handleScrollToQuote = () => {
    if (typeof window !== "undefined") {
      const formEl = document.getElementById("quote-form");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "start" });
        const nameInput = formEl.querySelector<HTMLInputElement>("input[required]");
        if (nameInput) {
          setTimeout(() => nameInput.focus(), 500);
        }
      }
    }
  };

  return (
    <section 
      className="w-full bg-[#faf8f5] pt-2 pb-6 sm:pt-4 sm:pb-8"
      aria-label="저신용 신차장기렌트 프로모션 배너"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div
          className="relative w-full overflow-hidden rounded-2xl lg:rounded-3xl shadow-xl flex items-center"
          style={{
            backgroundColor: "#B83E00",
            height: "400px",
            minHeight: "380px",
            maxHeight: "420px",
          }}
        >
          
          {/* 배경 워터마크 CHACHAJAYO */}
          <div
            className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 select-none pointer-events-none z-0"
            aria-hidden="true"
          >
            <span
              className="text-[50px] sm:text-[70px] lg:text-[90px] font-black tracking-[0.04em] leading-none whitespace-nowrap block"
              style={{ color: "rgba(255,255,255,0.05)" }}
            >
              CHACHA
            </span>
            <span
              className="text-[50px] sm:text-[70px] lg:text-[90px] font-black tracking-[0.04em] leading-none whitespace-nowrap block"
              style={{ color: "rgba(255,255,255,0.05)" }}
            >
              JAYO
            </span>
          </div>

          <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-center">
            {/* 좌측: 텍스트 */}
            <div className="flex-1 px-8 sm:px-12 lg:px-16 py-8 sm:py-10 lg:py-12">
              {/* 배지 */}
              <div className="mb-5 sm:mb-7">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white text-xs font-bold tracking-tight">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  무심사 · 무보증 · 당일출고
                </span>
              </div>

              {/* 메인 텍스트 */}
              <div className="space-y-1">
                <h2 className="text-[26px] sm:text-[34px] lg:text-[42px] font-extrabold text-white leading-[1.2] tracking-tight">
                  누구나 가능합니다
                </h2>
                <h2 className="text-[26px] sm:text-[34px] lg:text-[42px] font-extrabold text-white/70 leading-[1.2] tracking-tight">
                  개인회생 · 파산신청 걱정 마세요
                </h2>
                <h2 className="text-[26px] sm:text-[34px] lg:text-[42px] font-extrabold text-white leading-[1.2] tracking-tight">
                  끝까지 책임집니다
                </h2>
              </div>

              <p className="text-sm sm:text-base text-white/60 font-medium mt-4 sm:mt-5">
                신용점수 무관 · 소득증빙 무관 · 전국 어디서나 비대면 즉시 계약
              </p>

              {/* CTA */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleScrollToQuote}
                  className="inline-flex items-center gap-2 px-7 sm:px-9 py-3.5 sm:py-4 rounded-lg bg-white text-[#B83E00] text-sm sm:text-base font-bold hover:bg-gray-50 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg"
                >
                  <span>무심사 빠른 견적 상담받기</span>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-semibold text-white/70">전문 매니저 1:1 실시간 배정 중</span>
                </div>
              </div>
            </div>

            {/* 우측: 차량 이미지 */}
            <div className="relative w-full lg:w-[45%] flex items-center justify-center lg:justify-end pr-0 lg:pr-8">
              <div className="relative w-full max-w-[440px] lg:max-w-[500px] h-[200px] sm:h-[260px] lg:h-[340px] flex items-center justify-center">
                <Image
                  src="/images/cars/hero-santafe.png"
                  alt="무심사 장기렌트 차량"
                  fill
                  className="object-contain object-center drop-shadow-2xl"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
