import Image from "next/image";

import AboutFoodGallery from "@/components/AboutFoodGallery";
import { SiteLayout } from "@/components/SiteLayout";
import { useLanguage } from "@/context/LanguageContext";
import styles from "@/styles/about-intro.module.css";

export default function About() {
  const { language, t } = useLanguage();
  const [lead, ...following] = t.about.body.match(/[^.!?]+(?:[.!?]+|$)/g) ?? [t.about.body];
  const remainder = following.join("").trim();

  return (
    <SiteLayout title={t.about.pageTitle}>
      <main className={`bg-bous-cream ${styles.page}`}>
        <section className={styles.intro} aria-labelledby="about-heading">
          <Image
            className={styles.photo}
            src="/img/about-food/bar-arches.webp"
            width={960}
            height={1440}
            loading="eager"
            fetchPriority="high"
            alt={language === "fr"
              ? "Le bar de BOUS sous les arches sculptées du plafond."
              : "The BOUS bar beneath its sculpted ceiling arches."}
          />
          <div className={styles.copy}>
            <h1 id="about-heading" className="font-operetta">{t.about.sectionLabel}</h1>
            <p>{lead}{remainder && <span className={styles.continuation}> {remainder}</span>}</p>
            {remainder && (
              <details className={styles.more}>
                <summary>{language === "fr" ? "Lire la suite" : "Read more"}</summary>
                <p>{remainder}</p>
              </details>
            )}
          </div>
        </section>
        <AboutFoodGallery language={language} />
      </main>
    </SiteLayout>
  );
}
