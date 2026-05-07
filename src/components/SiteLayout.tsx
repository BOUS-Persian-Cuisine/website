import Head from "next/head";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { useLanguage } from "@/context/LanguageContext";

type SiteLayoutProps = {
  children: ReactNode;
  title?: string;
};

export function SiteLayout({
  children,
  title,
}: SiteLayoutProps) {
  const { language, t } = useLanguage();
  const pageTitle = title ?? t.common.siteTitle;

  return (
    <div
      lang={language === "fr" ? "fr-CA" : "en"}
      className="min-h-screen bg-background text-foreground"
    >
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
