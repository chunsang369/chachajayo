import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const COMPANY_INFO = {
  brand: "차차자요(ChaChajayo)",
  name: "주식회사 한신종합기획",
  ceo: "이예찬",
  address: "경기 용인시 기흥구 영통로525번길 24 황곡프라자 3층",
  businessNo: "836-12-01570",
  ecommerceNo: "제2024-경기오산-0333호", // 통신판매업번호는 별도 확인 필요하므로 형식을 맞춰 기재
  phone: "010-5813-8090",
  email: "hanxinplanning@gmail.com",
};

const MENU_LINKS = [
  { label: "빠른 간편견적", href: "/cars/quick-quote" },
  { label: "계약후기", href: "/reviews" },
  { label: "FAQ", href: "/faq" },
];

const LEGAL_LINKS = [
  { label: "이용약관", href: "/terms" },
  { label: "개인정보처리방침", href: "/privacy", bold: true },
  { label: "이메일무단수집거부", href: "#" },
];

export default function Footer() {
  return (
    <footer
      className="text-white relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #E63E00 0%, #C42F00 100%)",
      }}
      aria-label="사이트 정보"
    >
      <div className="mx-auto max-w-[1200px] px-4 lg:px-8 pt-8 pb-12 lg:pt-10 lg:pb-16">
        {/* 데스크톱: 4컬럼 / 모바일: 스택 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 items-start">
          {/* 1. 회사 정보 및 공식 인증 배지 */}
          <div className="lg:col-span-1 flex flex-col items-start gap-8 mt-0 lg:-mt-1">
            <Link href="/" className="inline-flex items-center">
              <img
                src="/images/chachajayo-logo-footer.png"
                alt="차차자요"
                className="w-[185px] lg:w-[215px] h-auto object-contain block"
              />
            </Link>
            <div className="w-[165px] lg:w-[185px] rounded-2xl overflow-hidden shadow-lg border border-white/20 bg-white ml-1.5">
              <img
                src="/images/credit-approval-badge-original.png"
                alt="신용무관승인제 공식 등록 업체"
                className="w-full h-auto object-contain block"
              />
            </div>
          </div>

          {/* 2. 메뉴 */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 tracking-wide">서비스</h3>
            <ul className="space-y-2.5">
              {MENU_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-orange-100/80 hover:text-white hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. 연락처 */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 tracking-wide">연락처</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="flex items-center gap-2 text-sm text-orange-100/90 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0 text-white" />
                  {COMPANY_INFO.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-center gap-2 text-sm text-orange-100/90 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0 text-white" />
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-orange-100/90">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-white" />
                {COMPANY_INFO.address}
              </li>
            </ul>
            <div className="mt-5 text-xs text-orange-200/75 space-y-1">
              <p>상호: {COMPANY_INFO.name}</p>
              <p>대표: {COMPANY_INFO.ceo}</p>
              <p>사업자등록번호: {COMPANY_INFO.businessNo}</p>
              <p>통신판매업신고: {COMPANY_INFO.ecommerceNo}</p>
            </div>
          </div>

          {/* 4. 약관 */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 tracking-wide">법적 고지</h3>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      link.bold
                        ? "text-white font-bold hover:text-orange-200 underline"
                        : "text-orange-100/80 hover:text-white hover:underline"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 구분선 + 카피라이트 */}
        <div className="mt-12 pt-8 border-t border-white/15">
          <p className="text-xs text-orange-200/70 text-center">
            © {new Date().getFullYear()} {COMPANY_INFO.brand}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
