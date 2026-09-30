import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function FloatingContact() {
  const { i18n } = useTranslation();
  const isEn = Boolean(i18n?.language && i18n.language.toLowerCase().startsWith('en'));

  return (
    <aside 
      aria-label={isEn ? "Quick Contact Hotline" : "Hỗ trợ Hotline & Zalo nhanh"}
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5 pointer-events-auto"
    >
      {/* Zalo Button */}
      <a
        href="https://zalo.me/0338693555"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat Zalo: 0338.693.555"
        className="group flex items-center gap-2 bg-[#0068FF] hover:bg-[#0052cc] text-white px-3.5 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 border border-white/20"
      >
        <span className="w-5 h-5 flex items-center justify-center font-bold text-xs bg-white text-[#0068FF] rounded-full">
          Z
        </span>
        <span className="hidden sm:inline font-body text-xs font-bold tracking-wide">
          Chat Zalo
        </span>
      </a>

      {/* Hotline Main Box Up */}
      <a
        href="tel:0338693555"
        title={isEn ? "Call Hotline: 0338.693.555" : "Gọi Hotline: 0338.693.555"}
        className="group relative flex items-center gap-2.5 bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 hover:from-stone-950 hover:to-black text-white pl-2.5 pr-4 py-2 rounded-full shadow-2xl hover:shadow-[0_8px_30px_rgba(212,175,55,0.35)] transition-all duration-300 transform hover:-translate-y-0.5 border border-[#D4AF37]/60"
      >
        {/* Pulsing Phone Circle */}
        <div className="relative flex items-center justify-center">
          <span className="absolute -inset-1 rounded-full bg-[#D4AF37] opacity-60 animate-ping"></span>
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B38F26] text-stone-950 flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform">
            <Phone size={15} className="fill-stone-950 animate-bounce" />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col text-left leading-tight">
          <span className="text-[10px] uppercase tracking-wider text-stone-300 font-semibold">
            {isEn ? 'Direct Support 24/7' : 'Tư vấn trực tiếp 24/7'}
          </span>
          <span className="font-heading font-extrabold text-sm md:text-[15px] text-[#D4AF37] tracking-wide">
            Hotline: 0338.693.555
          </span>
        </div>
      </a>
    </aside>
  );
}
