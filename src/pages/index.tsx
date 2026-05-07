import Link from "next/link";

import { SiteLayout } from "@/components/SiteLayout";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <SiteLayout>
      <main className="overflow-hidden bg-bous-cream">
        <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-bous-night text-bous-white lg:min-h-[calc(100vh-5rem)]">
          <div
            className="absolute inset-0 bg-[url('/bous-bg-ed.jpg')] bg-cover bg-[center_center]"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,33,59,0.86)_0%,rgba(53,5,20,0.58)_46%,rgba(53,5,20,0.08)_100%)]"
            aria-hidden
          />
          <div
            className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bous-night via-bous-night/55 to-transparent"
            aria-hidden
          />

          <div className="relative mx-auto flex min-h-[calc(100svh-4.5rem)] max-w-7xl items-end px-6 py-14 sm:px-8 md:py-20 lg:min-h-[calc(100vh-5rem)] lg:px-10">
            <div className="max-w-3xl">
              <p className="mb-5 flex flex-col items-start gap-2 text-[0.72rem] uppercase tracking-[0.32em] text-bous-cream/82">
                <span>{t.home.cuisine}</span>
                <span className="inline-flex items-center gap-1.5">
                  <svg
                    className="h-3 w-3 shrink-0"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M12 22s6-7.2 6-12a6 6 0 0 0-12 0c0 4.8 6 12 6 12Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>{t.footer.addressLines[1]}</span>
                </span>
              </p>
              <h1 className="sr-only">{t.common.siteTitle}</h1>
              <div className="flex flex-wrap gap-3">
                <span
                  className="inline-flex min-h-12 cursor-default items-center justify-center border border-bous-red/55 bg-bous-red/55 px-6 text-[0.72rem] uppercase tracking-[0.24em] text-bous-white/70"
                  aria-disabled="true"
                >
                  {t.header.nav.reserve}
                </span>
                <Link
                  href="/about"
                  className="inline-flex min-h-12 items-center justify-center border border-bous-cream/70 bg-bous-cream/10 px-6 text-[0.72rem] uppercase tracking-[0.24em] text-bous-cream backdrop-blur-sm transition-colors hover:bg-bous-cream hover:text-bous-burgundy"
                >
                  {t.header.nav.about}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
