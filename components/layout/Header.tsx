"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "간편 견적", href: "/#car-quotes" },
  { label: "견적 문의", href: "/#quote-form" },
  { label: "계약후기", href: "/reviews" },
  { label: "FAQ", href: "/faq" },
];

declare global {
  interface Window {
    ChannelIO?: (...args: unknown[]) => void;
  }
}

const openChannelTalk = () => {
  if (typeof window !== "undefined" && window.ChannelIO) {
    window.ChannelIO("showMessenger");
  }
};


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const scrollToQuoteForm = () => {
    if (pathname === "/") {
      const el = document.getElementById("quote-form");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = "/#quote-form";
    }
  };

  const handleNavClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const id = href.replace("/#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      setIsOpen(false);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      if (window.scrollY > 0) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.location.href = "/";
      }
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 드로어 오픈 시 body 스크롤 잠금
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-gray-100",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-white"
        )}
      >
        <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
          <div className="flex h-14 lg:h-16 items-center justify-between">
            {/* 로고 */}
            <Link
              href="/"
              onClick={handleLogoClick}
              className="flex items-center shrink-0 h-full relative z-10 cursor-pointer py-2"
              aria-label="차차자요 홈"
            >
              <img
                src="/images/chachajayo-logo.png"
                alt="차차자요"
                className="h-10 lg:h-11 w-auto object-contain"
              />
            </Link>

            {/* 데스크톱 GNB (lg+) */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="메인 내비게이션">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#FF6800] hover:bg-[#FFF4EB]/60 rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* 데스크톱 우측 전화상담 CTA (전화기 아이콘 추가) */}
            <div className="hidden lg:flex items-center relative top-[5px]">
              <a
                href="tel:010-5813-8090"
                className="inline-flex items-center justify-center gap-2 animate-bounce hover:animate-none bg-[#FB6502] hover:bg-[#E55B00] text-white px-6 py-2.5 rounded-full text-[16px] font-extrabold transition-all shadow-lg hover:shadow-xl shadow-[#FB6502]/30 hover:scale-105 active:scale-95 cursor-pointer tracking-tight"
                style={{ animationDuration: "2s" }}
              >
                <Phone className="w-4.5 h-4.5 text-white fill-white" />
                <span>전화상담</span>
              </a>
            </div>

            {/* 모바일 우측 전화상담 버튼 (전화기 아이콘 추가) */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href="tel:010-5813-8090"
                className="relative top-[5px] inline-flex items-center justify-center gap-1.5 animate-bounce hover:animate-none bg-[#FB6502] hover:bg-[#E55B00] text-white px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-extrabold transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer tracking-tight"
                style={{ animationDuration: "2s" }}
                aria-label="전화상담"
              >
                <Phone className="w-3.5 h-3.5 text-white fill-white" />
                <span>전화상담</span>
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 모바일 드로어 (우측 슬라이드) */}
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <nav
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-label="모바일 메뉴"
      >
        {/* 드로어 상단 */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-gray-100">
          <span className="text-base font-bold text-[#FF6800]">메뉴</span>
          <button
            onClick={() => setIsOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="메뉴 닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 메뉴 아이템 */}
        <div className="py-4 px-3">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(item.href, e)}
              className="flex items-center px-3 py-3.5 text-[15px] font-medium text-gray-800 hover:text-[#FF6800] hover:bg-[#FFF4EB]/60 rounded-xl transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* 드로어 하단 CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-gray-100 bg-gray-50/50">
          <a
            href="tel:010-5813-8090"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#FB6502] hover:bg-[#E55B00] text-white text-sm font-bold transition-all shadow-md shadow-[#FB6502]/20 cursor-pointer"
          >
            <Phone className="w-4 h-4 text-white fill-white" />
            <span>전화상담 연결</span>
          </a>
        </div>
      </nav>

      {/* 헤더 높이만큼 spacer */}
      <div className="h-14 lg:h-16" />
    </>
  );
}
