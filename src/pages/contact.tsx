import { useEffect } from "react";

import { SiteLayout } from "@/components/SiteLayout";
import { useLanguage } from "@/context/LanguageContext";

function useInitialContentScroll() {
  useEffect(() => {
    if (window.location.hash || window.scrollY > 8) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const timeout = window.setTimeout(() => {
      const targetOffset = window.matchMedia("(min-width: 1024px)").matches
        ? window.innerHeight * 0.28
        : Math.max(window.innerHeight * 0.24, 160);

      window.scrollTo({
        top: Math.round(targetOffset),
        behavior: "smooth",
      });
    }, 180);

    return () => window.clearTimeout(timeout);
  }, []);
}

export default function Contact() {
  const { t } = useLanguage();
  useInitialContentScroll();

  return (
    <SiteLayout title={t.contact.pageTitle}>
      <main className="bg-bous-cream">
        <section
          aria-label={t.contact.sectionLabel}
          className="relative overflow-hidden bg-bous-cream"
        >
          <div className="sticky top-0 h-[48svh] min-h-[20rem] w-full overflow-hidden bg-bous-night lg:h-[56vh]">
            <div
              className="absolute inset-0 scale-105 bg-[url('/bous-bg-2.jpg')] bg-cover bg-center md:bg-fixed"
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-bous-night/10 via-transparent to-bous-night/45"
              aria-hidden
            />
          </div>

          <div className="relative z-10 mx-auto -mt-16 max-w-5xl px-6 pb-18 sm:-mt-20 sm:px-8 md:-mt-24 md:pb-24 lg:px-10">
            <div className="flex min-h-[28rem] flex-col justify-end bg-bous-burgundy p-8 text-bous-cream shadow-[0_24px_70px_rgba(53,5,20,0.18)] sm:p-10 md:min-h-[34rem] md:p-12">
              <h1 className="font-operetta mb-8 text-5xl font-light leading-none sm:text-6xl md:text-7xl">
                {t.header.nav.contact}
              </h1>
              <p className="max-w-3xl text-xl font-light leading-9 tracking-[0.01em] text-bous-cream/86 sm:text-2xl sm:leading-10">
                {t.contact.bodyPrefix}{" "}
                <a
                  href={`mailto:${t.contact.email}`}
                  className="brand-link underline decoration-bous-red decoration-1 transition-colors hover:text-bous-rose"
                >
                  {t.contact.email}
                </a>
                {t.contact.bodySuffix}
              </p>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
