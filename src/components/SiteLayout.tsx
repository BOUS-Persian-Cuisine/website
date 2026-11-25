import Head from "next/head";
import { useRouter } from "next/router";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { useLanguage } from "@/context/LanguageContext";
import { restaurantDetails } from "@/constants/restaurant";
import { pageForPath, siteOrigin } from "@/constants/siteRoutes";

export function SiteLayout({ children, title }: { children: ReactNode; title?: string }) {
  const { language, t } = useLanguage();
  const page = pageForPath(useRouter().pathname);
  const meta = page?.[language];

  return (
    <div lang={language === "fr" ? "fr-CA" : "en-CA"} className="min-h-screen bg-background text-foreground">
      <Head>
        <title>{meta?.title ?? title ?? t.common.siteTitle}</title>
        {meta && <meta name="description" content={meta.description} />}
        {meta && <link rel="canonical" href={siteOrigin + meta.path} />}
        {page && <link rel="alternate" hrefLang="en-CA" href={siteOrigin + page.en.path} />}
        {page && <link rel="alternate" hrefLang="fr-CA" href={siteOrigin + page.fr.path} />}
        {page && <link rel="alternate" hrefLang="x-default" href={siteOrigin + page.en.path} />}
        {page?.en.path === "/" && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify(restaurantDetails(language)).replace(/</g, "\\u003c"),
          }} />
        )}
      </Head>
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
