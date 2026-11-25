import { ReservationLink } from "@/components/ReservationLink";
import Link from "@/components/LocalizedLink";

import { SiteLayout } from "@/components/SiteLayout";
import { GIFT_CARD_URL } from "@/constants/links";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { language, t } = useLanguage();

  return (
    <SiteLayout>
      <main className="overflow-hidden bg-bous-cream">
        <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-bous-night text-bous-white lg:min-h-[calc(100vh-5rem)]">
          <div
            className="absolute inset-0 bg-[url('/img/DSC01028.jpg')] bg-cover bg-position-[right_center]"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(0deg,rgba(29,8,16,0.89),rgba(29,8,16,0.05)_85%)] lg:bg-[linear-gradient(90deg,rgba(29,8,16,0.87),rgba(29,8,16,0.64)_40%,rgba(29,8,16,0.05)_82%)]"
            aria-hidden
          />
          <div
            className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-bous-night via-bous-night/55 to-transparent opacity-20"
            aria-hidden
          />

          <div className="relative mx-auto flex min-h-[calc(100svh-4.5rem)] max-w-7xl items-end px-6 py-14 sm:px-8 md:py-20 lg:min-h-[calc(100vh-5rem)] lg:px-10">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm uppercase tracking-[0.17em] text-[#fff4e6]">
                {language === "fr" ? "Mille carré doré · Montréal" : "Golden Square Mile · Montréal"}
              </p>
              <h1 className="max-w-[17ch] text-balance text-4xl font-light leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {language === "fr"
                  ? "Une table persane au centre-ville de Montréal"
                  : "A Persian table in downtown Montréal"}
              </h1>
              <p className="mb-6 mt-4 max-w-[48ch] text-base leading-relaxed text-[#fff4e6] sm:text-lg">
                {language === "fr"
                  ? "Un cadre raffiné pour une cuisine persane authentique. Des kababs grillés sur la braise au riz parfumé au safran, découvrez la chaleur de la cuisine persane au cœur du Mille carré doré de Montréal."
                  : "A refined setting for an authentic Persian food, From kababs grilled over charcoal to rice fragrant with saffron, discover the warmth of a Persian food in Montréal’s Golden Square Mile."}
              </p>
              <div className="flex flex-wrap gap-3">
                <ReservationLink
                  className="inline-flex min-h-12 items-center justify-center border border-bous-red bg-bous-red px-6 text-[0.72rem] uppercase tracking-[0.24em] text-bous-white transition-colors hover:bg-bous-burgundy"
                >
                  {t.header.nav.reserve}
                </ReservationLink>
                <Link
                  href="/menu"
                  className="inline-flex min-h-12 items-center justify-center border border-bous-cream/70 bg-bous-cream/10 px-6 text-[0.72rem] uppercase tracking-[0.24em] text-bous-cream backdrop-blur-sm transition-colors hover:bg-bous-cream hover:text-bous-burgundy"
                >
                  {t.header.nav.menu}
                </Link>
                <a
                  href={GIFT_CARD_URL}
                  className="inline-flex min-h-12 items-center justify-center border border-bous-cream/45 bg-transparent px-6 text-[0.72rem] uppercase tracking-[0.24em] text-bous-cream/88 transition-colors hover:border-bous-cream hover:text-bous-cream"
                >
                  {t.common.giftCards}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
