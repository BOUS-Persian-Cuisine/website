import type { ReactNode } from "react";

import {
  MenuSwitcher,
  RelatedMenuLinks,
  type MenuKey,
} from "@/components/MenuSwitcher";
import { SiteLayout } from "@/components/SiteLayout";
import { getOpenTableReservationUrl } from "@/constants/links";
import { useLanguage } from "@/context/LanguageContext";

type MenuPageLayoutProps = {
  active: MenuKey;
  children: ReactNode;
  heading: string;
  intro?: string;
  pdfHref: string;
  pdfLabel: string;
  reserveLabel: string;
  sectionLabel: string;
  title: string;
};

export function MenuPageLayout({
  active,
  children,
  heading,
  intro,
  pdfHref,
  pdfLabel,
  reserveLabel,
  sectionLabel,
  title,
}: MenuPageLayoutProps) {
  const { language } = useLanguage();
  const reservationUrl = getOpenTableReservationUrl(language);

  return (
    <SiteLayout title={title}>
      <main className="bg-bous-white text-bous-burgundy">
        <section aria-label={sectionLabel}>
          <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
            <header className="text-center">
              <h1 className="font-operetta text-4xl font-light leading-tight tracking-[-0.02em] text-balance sm:text-5xl">
                {heading}
              </h1>
            </header>

            <div className="mt-7 text-center sm:mt-9">
              <MenuSwitcher active={active} />
              <a
                href={pdfHref}
                target="_blank"
                rel="noreferrer"
                className="brand-link mt-3 inline-flex min-h-9 items-center px-1 text-[0.67rem] uppercase tracking-[0.16em] text-bous-burgundy/60 transition-colors hover:text-bous-red hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bous-red"
              >
                {pdfLabel}
              </a>
              {intro ? (
                <p className="mx-auto mt-4 max-w-[65ch] text-base leading-7 text-bous-burgundy/78">
                  {intro}
                </p>
              ) : null}
            </div>

            <div className="mx-auto max-w-3xl py-10 sm:py-14">{children}</div>

            <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 pt-4 sm:pt-6">
              <a
                href={reservationUrl}
                className="inline-flex min-h-12 items-center justify-center border border-bous-burgundy bg-bous-burgundy px-7 text-[0.7rem] uppercase tracking-[0.18em] text-bous-cream transition-colors hover:border-bous-red hover:bg-bous-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bous-red"
              >
                {reserveLabel}
              </a>
              <RelatedMenuLinks active={active} />
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
