import { ReservationLink } from "@/components/ReservationLink";
import type { ReactNode } from "react";

import {
  RelatedMenuLinks,
  type MenuKey,
} from "@/components/MenuSwitcher";
import { MenuPageHeader } from "@/components/MenuPageHeader";
import { SiteLayout } from "@/components/SiteLayout";

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

  return (
    <SiteLayout title={title}>
      <main className="bg-bous-white text-bous-burgundy">
        <section aria-label={sectionLabel}>
          <MenuPageHeader active={active} heading={heading} />
          <div className="mx-auto max-w-5xl px-5 pb-10 sm:px-8 sm:pb-14 lg:px-10">
            <div className="text-center">
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

            <div className={`mx-auto py-10 sm:py-14 ${active === "dining" ? "w-full" : "max-w-3xl"}`}>{children}</div>

            <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 pt-4 sm:pt-6">
              <ReservationLink
                className="inline-flex min-h-12 items-center justify-center border border-bous-burgundy bg-bous-burgundy px-7 text-[0.7rem] uppercase tracking-[0.18em] text-bous-cream transition-colors hover:border-bous-red hover:bg-bous-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bous-red"
              >
                {reserveLabel}
              </ReservationLink>
              <RelatedMenuLinks active={active} />
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
