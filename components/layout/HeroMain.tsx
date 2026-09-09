"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, FileText, ChevronDown, ChevronUp } from "lucide-react";

export default function HeroMain() {
  // 플로팅 견적 폼 토글 상태 (기본은 접힘, 클릭 시 펼침)
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  // 폼 입력 상태
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    carOfInterest: "",
    creditScore: "600점 이상",
    agreeAll: false,
    agree1: true,
    agree2: true,
    agree3: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // 견적 문의 클릭 핸들러 (모바일: 푸터 위 견적문의 영역(#quote-form)으로 바로 이동, PC: 플로팅 폼 토글)
  const handleQuoteClick = () => {
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      setIsQuoteOpen(false);
      const formEl = document.getElementById("quote-form");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "start" });
        const nameInput = formEl.querySelector<HTMLInputElement>("input");
        if (nameInput) {
          setTimeout(() => nameInput.focus(), 450);
        }
      } else {
        window.location.href = "/#quote-form";
      }
    } else {
      setIsQuoteOpen((prev) => !prev);
    }
  };

  // 전체 동의 핸들러
  const handleAgreeAll = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      agreeAll: checked,
      agree1: checked,
      agree2: checked,
      agree3: checked,
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }
    if (!formData.phone.trim()) {
      alert("휴대폰 번호를 입력해주세요.");
      return;
    }
    if (!formData.agree1 || !formData.agree2) {
      alert("필수 약관에 동의해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          carOfInterest: formData.carOfInterest || "미정 (빠른상담)",
          creditScore: formData.creditScore,
          contactMethod: "phone",
          consent: true,
        }),
      });

      if (res.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setSubmitSuccess(false);
          setIsQuoteOpen(false);
          setFormData({
            name: "",
            phone: "",
            carOfInterest: "",
            creditScore: "600점 이상",
            agreeAll: false,
            agree1: true,
            agree2: true,
            agree3: false,
          });
        }, 2500);
      } else {
        const data = await res.json();
        alert(data.error || "상담 신청에 실패했습니다. 다시 시도해주세요.");
      }
    } catch {
      alert("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ── 1. 메인 히어로 단일 배너 (레퍼런스 디자인 완벽 일치: 화이트 로고 + 옐로우 포인트 타이포 + 골든 클라우드 + 1.png 차량) ── */}
      <section
        className="relative w-full overflow-hidden select-none flex items-center justify-center min-h-[420px] sm:min-h-[560px] lg:min-h-0"
        style={{
          background: "radial-gradient(ellipse 95% 85% at 65% 50%, #FF6000 0%, #FF4800 45%, #EE3500 100%)",
          aspectRatio: "1024 / 460",
        }}
        aria-label="차차자요 메인 히어로 배너"
      >
        {/* 웜 골든 클라우드 데코 (레퍼런스 배경 소프트 버블) */}
        <div className="absolute right-0 top-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
          {/* 큰 상단 골든 버블 */}
          <div className="absolute right-[-4%] top-[8%] w-[380px] sm:w-[480px] lg:w-[560px] h-[280px] sm:h-[360px] lg:h-[420px] rounded-full bg-[#FFA000]/35 blur-xs" />
          {/* 우측 중앙 겹치는 골든 버블 */}
          <div className="absolute right-[8%] top-[25%] w-[300px] sm:w-[380px] lg:w-[460px] h-[220px] sm:h-[280px] lg:h-[350px] rounded-full bg-[#FFB300]/25 blur-xs" />
          {/* 좌측 범퍼 뒤 골든 버블 */}
          <div className="absolute right-[30%] sm:right-[34%] top-[34%] w-[180px] sm:w-[240px] lg:w-[300px] h-[140px] sm:h-[180px] lg:h-[230px] rounded-full bg-[#FF9800]/25 blur-xs" />
          {/* 지면 웜 오렌지 마운드 */}
          <div className="absolute right-[2%] bottom-[8%] w-[500px] sm:w-[620px] lg:w-[740px] h-[90px] sm:h-[120px] lg:h-[140px] rounded-full bg-[#FF7500]/45 blur-xs" />
        </div>

        <div className="container mx-auto max-w-[1340px] px-5 sm:px-10 lg:px-14 w-full h-full flex items-center relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full h-full pt-5 pb-2 sm:py-10 lg:py-0">

            {/* 좌측: 로고 + 메인 헤드라인 텍스트 + 서브카피 */}
            <div className="flex-1 flex flex-col justify-center items-start text-left z-10 relative">
              {/* 1. 상단 원래 차차자요 로고 (화이트 변환 적용 - 모바일에서는 생략, PC에서만 노출) */}
              <div className="hidden sm:block sm:mb-5">
                <Image
                  src="/images/chachajayo-logo-white.png"
                  alt="차차자요"
                  width={200}
                  height={68}
                  priority
                  className="h-8 sm:h-10 lg:h-12 w-auto object-contain drop-shadow-xs"
                />
              </div>

              {/* 2. 메인 헤드라인 1행 "차 찾을 땐" + 옐로우 스파크 */}
              <div className="relative inline-flex items-start">
                <h1 className="text-[44px] sm:text-[64px] lg:text-[76px] xl:text-[86px] font-black text-white leading-[1.08] tracking-tight drop-shadow-[0_3px_8px_rgba(0,0,0,0.18)]">
                  차 찾을 땐
                  <span className="sr-only"> 차차자요 - 신용무관승인제 저신용 장기렌트 무심사 무보증 신차리스 신차렌트 견적비교</span>
                </h1>
                {/* 헤드라인 간결한 마무리 */}
              </div>

              {/* 3. 메인 헤드라인 2행 "차차자요" (차차: 화이트, 자요: 옐로우) + 옐로우 언더라인 곡선 */}
              <div className="relative inline-block mt-0.5 sm:mt-1">
                <h2 className="text-[48px] sm:text-[70px] lg:text-[84px] xl:text-[96px] font-black leading-[1.05] tracking-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
                  <span className="text-white">차차</span>
                  <span className="text-[#FFD100]">자요</span>
                </h2>
                {/* 하단 옐로우 핸드드로운 언더라인 곡선 */}
                <svg
                  viewBox="0 0 340 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-3.5 sm:h-5 lg:h-6 -mt-1 sm:-mt-1.5 overflow-visible"
                >
                  <path
                    d="M 4 18 C 90 13, 210 7, 334 10"
                    stroke="#FFD100"
                    strokeWidth="6.5"
                    strokeLinecap="round"
                    className="drop-shadow-xs"
                  />
                </svg>
              </div>

              {/* 4. 서브카피 문구 */}
              <p className="mt-2.5 sm:mt-6 text-white text-base sm:text-xl lg:text-2xl font-medium leading-relaxed drop-shadow-xs opacity-95">
                신용무관승인제로 복잡한 조건 없이<br />
                <span className="text-[#FFD100]">가장 빠르고 확실하게</span> 만나보세요
              </p>
            </div>

            {/* 우측: 3D 차량 이미지 + 자연스러운 접지 그림자 (모바일에서 문구와의 간격을 엔터 3번 분량 축소 -mt-2) */}
            <div className="relative w-full lg:w-[56%] flex flex-col items-center lg:items-end justify-center -mt-2 sm:mt-6 lg:mt-0">

              {/* D:\User\Jun\Desktop\차차자요\3.png (신규 차량 이미지) */}
              <div className="relative z-10 w-full max-w-[420px] sm:max-w-[650px] lg:max-w-[800px] h-[210px] sm:h-[350px] lg:h-[430px] flex flex-col items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/cars/3.png"
                    alt="차차자요 신용무관승인제 저신용 장기렌트 무심사 무보증 신차 출고"
                    fill
                    priority
                    loading="eager"
                    className="object-contain object-bottom drop-shadow-xl"
                    sizes="(max-width: 1024px) 95vw, 800px"
                  />
                </div>
                {/* 바닥 자연스러운 접지 그림자 (듀얼 오발 섀도우) */}
                <div className="relative w-[82%] -mt-4 sm:-mt-6 flex flex-col items-center pointer-events-none">
                  {/* 진한 타이어 접지 그림자 */}
                  <div className="w-[88%] h-4 sm:h-5 bg-[#3B1500]/60 blur-xs rounded-full" />
                  {/* 넓고 부드러운 주변 앰비언트 그림자 */}
                  <div className="w-full h-5 sm:h-7 -mt-2 bg-[#C83800]/45 blur-md rounded-full" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. 하단 고정 플로팅 바 (배경 기본색 흰색 + 투명도 50% + backdrop-blur) ── */}
      <aside
        aria-label="빠른 견적 및 전화상담 문의"
        className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] sm:w-[96%] max-w-[920px] pointer-events-auto"
      >
        {/* 전체 박스 배경 기본색 흰색 투명도 50% (bg-white/50 & backdrop-blur-md) */}
        <div className="bg-white/50 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl border border-white/70 overflow-hidden transition-all duration-300">
          
          {/* 펼쳐졌을 때: 견적 입력 폼 (모바일에서는 미노출, PC에서만 노출) */}
          {isQuoteOpen && (
            <div className="hidden sm:block p-5 sm:p-7 border-b border-gray-200/50 bg-white/70 backdrop-blur-md">
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* 상단 타이틀 & 닫기 ∧ 버튼 & 무료 견적 받아보기 */}
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setIsQuoteOpen(false)}
                    className="flex items-center gap-2 text-gray-900 font-extrabold text-lg sm:text-2xl tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <span>쉽고 빠른 견적 문의</span>
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-md border-2 border-gray-900 text-gray-900 bg-white">
                      <ChevronUp className="w-5 h-5 stroke-[3]" />
                    </span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 sm:px-8 py-3 rounded-full bg-[#FB6502] hover:bg-[#E55B00] text-white font-extrabold text-sm sm:text-base shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50 whitespace-nowrap"
                  >
                    {isSubmitting ? "접수 중..." : "무료 견적 받아보기"}
                  </button>
                </div>

                {submitSuccess && (
                  <div className="p-3.5 bg-emerald-500 text-white rounded-xl text-center text-sm sm:text-base font-bold animate-fade-in">
                    견적 문의가 정상 접수되었습니다! 전문 매니저가 곧 연락드리겠습니다.
                  </div>
                )}

                {/* 1행: 이름 / 휴대폰번호 / 차종 입력 필드 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="이름을 입력하세요"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 text-sm sm:text-base placeholder-gray-400 border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#FB6502] shadow-xs"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="휴대폰번호 (-제외)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
                    className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 text-sm sm:text-base placeholder-gray-400 border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#FB6502] shadow-xs"
                  />
                  <input
                    type="text"
                    placeholder="차종을 입력하세요"
                    value={formData.carOfInterest}
                    onChange={(e) => setFormData({ ...formData, carOfInterest: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 text-sm sm:text-base placeholder-gray-400 border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#FB6502] shadow-xs"
                  />
                </div>

                {/* 2행: 신용점수 선택 (600점 이상 / 600점 이하) */}
                <div className="flex items-center gap-3 bg-white/80 p-2.5 rounded-xl border border-gray-200">
                  <span className="text-xs sm:text-sm font-bold text-gray-900 pl-2">신용점수</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, creditScore: "600점 이상" })}
                      className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        formData.creditScore === "600점 이상"
                          ? "bg-[#FB6502] text-white shadow-xs"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                      }`}
                    >
                      600점 이상
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, creditScore: "600점 이하" })}
                      className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        formData.creditScore === "600점 이하"
                          ? "bg-[#FDC903] text-gray-950 shadow-xs"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                      }`}
                    >
                      600점 이하
                    </button>
                  </div>
                </div>

                {/* 3행: 약관 동의 체크박스 줄 */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-gray-800 select-none pt-1">
                  <label className="inline-flex items-center gap-1.5 cursor-pointer font-bold">
                    <input
                      type="checkbox"
                      checked={formData.agreeAll}
                      onChange={(e) => handleAgreeAll(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-400 accent-[#FB6502] cursor-pointer"
                    />
                    <span>전체 동의</span>
                  </label>

                  <label className="inline-flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agree1}
                      onChange={(e) => setFormData({ ...formData, agree1: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-400 accent-[#FB6502] cursor-pointer"
                    />
                    <span>(필수) 개인정보 수집 및 활용동의 [보기]</span>
                  </label>

                  <label className="inline-flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agree2}
                      onChange={(e) => setFormData({ ...formData, agree2: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-400 accent-[#FB6502] cursor-pointer"
                    />
                    <span>(필수) 개인정보 제3자 제공 동의 [보기]</span>
                  </label>

                  <label className="inline-flex items-center gap-1.5 cursor-pointer text-gray-600">
                    <input
                      type="checkbox"
                      checked={formData.agree3}
                      onChange={(e) => setFormData({ ...formData, agree3: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-400 accent-[#FB6502] cursor-pointer"
                    />
                    <span>(선택) 마케팅 활용동의 [보기]</span>
                  </label>
                </div>

              </form>
            </div>
          )}

          {/* 닫혀있거나 기본 노출되는 플로팅 바 (모바일: py-2.5로 대폭 축소하여 전화상담/견적문의 버튼만 노출, PC: py-6 및 안내문구 유지) */}
          <div className="px-3 sm:px-8 py-2.5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-0 sm:gap-6">
            
            {/* 좌측 안내 라벨: 모바일에서는 숨김 (hidden sm:flex), PC에서만 노출 */}
            <button
              type="button"
              data-testid="quick-quote-toggle"
              onClick={() => setIsQuoteOpen(!isQuoteOpen)}
              className="hidden sm:flex items-center gap-2 text-gray-900 font-extrabold text-base sm:text-xl tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
            >
              <span>쉽고 빠른 견적 문의</span>
              {isQuoteOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-800 stroke-[2.5]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-800 stroke-[2.5]" />
              )}
            </button>

            {/* 우측 액션 버튼 2개: 전화상담 (주황색 #FB6502) & 견적 문의 (노란색 #FDC903) */}
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              {/* 1. 전화상담 박스 (로고 주황색 #FB6502, 흰색 전화 아이콘, 흰색 글자) */}
              <a
                href="tel:010-5813-8090"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-[#FB6502] hover:bg-[#E55B00] text-white text-xs sm:text-base font-extrabold shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
                <span>전화상담</span>
              </a>

              {/* 2. 견적 문의 버튼 (로고 노란색 #FDC903, 흰색 글자 및 아이콘 - 모바일 클릭시 푸터 위 견적문의 영역으로 스크롤 이동) */}
              <button
                type="button"
                onClick={handleQuoteClick}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-[#FDC903] hover:bg-[#EBB800] text-white text-xs sm:text-base font-black shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
              >
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span>견적 문의</span>
              </button>
            </div>

          </div>

        </div>
      </aside>
    </>
  );
}
