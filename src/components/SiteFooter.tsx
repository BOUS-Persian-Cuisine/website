import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import { useLanguage } from "@/context/LanguageContext";

type FooterSection = "info" | "dine" | "contact";

type FooterSectionContent = {
  id: FooterSection;
  title: string;
  content: ReactNode;
};

const heartMaskStyle: CSSProperties = {
  WebkitMaskImage: "url('/heart-left.svg')",
  WebkitMaskPosition: "center",
  WebkitMaskRepeat: "no-repeat",
  WebkitMaskSize: "contain",
  maskImage: "url('/heart-left.svg')",
  maskPosition: "center",
  maskRepeat: "no-repeat",
  maskSize: "contain",
};

const footerDividerInitialStyle = {
  "--footer-divider-progress": "0",
  "--footer-divider-line-width": "0px",
  "--footer-divider-heart-offset": "0px",
} as CSSProperties;

export function SiteFooter() {
  const { t } = useLanguage();
  const footerRef = useRef<HTMLElement | null>(null);
  const [openFooterSection, setOpenFooterSection] =
    useState<FooterSection | null>("info");

  const toggleFooterSection = (section: FooterSection) =>
    setOpenFooterSection((current) => (current === section ? null : section));

  useEffect(() => {
    let animationFrame: number | null = null;
    const scrollDistance = 300;

    const updateDividerProgress = () => {
      const footer = footerRef.current;

      if (!footer) {
        return;
      }

      const footerRect = footer.getBoundingClientRect();
      const heart = footer.querySelector<HTMLElement>(
        ".footer-heart-divider__heart",
      );
      const heartSize = heart?.getBoundingClientRect().width ?? 16;
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const progress = Math.min(
        Math.max((viewportHeight - footerRect.top) / scrollDistance, 0),
        1,
      );
      const heartTravel = Math.max((footerRect.width - heartSize * 2) / 2, 0);
      const lineWidth = Math.max(footerRect.width - heartSize, 0) * progress;

      footer.style.setProperty(
        "--footer-divider-progress",
        progress.toFixed(4),
      );
      footer.style.setProperty(
        "--footer-divider-line-width",
        `${lineWidth.toFixed(2)}px`,
      );
      footer.style.setProperty(
        "--footer-divider-heart-offset",
        `${(heartTravel * progress).toFixed(2)}px`,
      );
    };

    const scheduleDividerUpdate = () => {
      if (animationFrame !== null) {
        return;
      }

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = null;
        updateDividerProgress();
      });
    };

    scheduleDividerUpdate();
    window.addEventListener("scroll", scheduleDividerUpdate, { passive: true });
    window.addEventListener("resize", scheduleDividerUpdate);

    return () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener("scroll", scheduleDividerUpdate);
      window.removeEventListener("resize", scheduleDividerUpdate);
    };
  }, []);

  const footerSections: FooterSectionContent[] = [
    {
      id: "info",
      title: t.footer.sections.info,
      content: (
        <address className="not-italic">
          {t.footer.addressLines.map((line, index) => (
            <span key={line}>
              {line}
              {index < t.footer.addressLines.length - 1 ? <br /> : null}
            </span>
          ))}
        </address>
      ),
    },
    {
      id: "dine",
      title: t.footer.sections.dine,
      content: (
        <a
          href="https://www.opentable.com/r/bous-montreal"
          className="underline-offset-4 hover:underline"
        >
          {t.footer.reserveTable}
        </a>
      ),
    },
    {
      id: "contact",
      title: t.footer.sections.contact,
      content: (
        <nav
          aria-label={t.footer.contactLinksLabel}
          className="flex flex-col gap-3"
        >
          <Link href="/about" className="underline-offset-4 hover:underline">
            {t.footer.links.about}
          </Link>
          <Link href="/contact" className="underline-offset-4 hover:underline">
            {t.footer.links.contact}
          </Link>
          <a
            href="mailto:info@bous.ca"
            className="underline-offset-4 hover:underline"
          >
            {t.footer.links.email}
          </a>
          <a
            href="https://instagram.com/bousmontreal"
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 hover:underline"
          >
            {t.footer.links.instagram}
          </a>
        </nav>
      ),
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative bg-bous-burgundy text-bous-cream"
      style={footerDividerInitialStyle}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 -translate-y-1/2"
        aria-hidden
      >
        <div className="footer-heart-divider relative h-7 w-full sm:h-8">
          <span className="footer-heart-divider__line absolute top-1/2 h-0.5 bg-bous-red" />
          <span
            className="footer-heart-divider__heart footer-heart-divider__heart--left absolute bg-bous-red"
            style={heartMaskStyle}
          />
          <span
            className="footer-heart-divider__heart footer-heart-divider__heart--right absolute bg-bous-red"
            style={heartMaskStyle}
          />
        </div>
      </div>

      <div className="mx-auto hidden w-full max-w-7xl grid-cols-[1.25fr_0.9fr_1fr] gap-12 px-8 py-20 md:grid lg:px-10">
        {footerSections.map((section) => (
          <div key={section.id}>
            <h2 className="mb-8 text-[0.74rem] uppercase tracking-[0.32em] text-bous-rose">
              {section.title}
            </h2>
            <div className="text-base leading-8 tracking-[0.05em] text-bous-cream/88">
              {section.content}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col px-6 py-12 md:hidden">
        {footerSections.map((section) => {
          const isOpen = openFooterSection === section.id;

          return (
            <div key={section.id} className="border-b border-bous-cream/22">
              <button
                type="button"
                className="flex w-full items-center justify-between py-5 text-left text-[0.74rem] uppercase tracking-[0.32em] text-bous-rose"
                aria-expanded={isOpen}
                onClick={() => toggleFooterSection(section.id)}
              >
                <span>{section.title}</span>
                <span className="text-lg text-bous-cream" aria-hidden>
                  {isOpen ? "-" : "+"}
                </span>
              </button>
              {isOpen ? (
                <div className="pb-7 text-sm leading-7 tracking-[0.05em] text-bous-cream/88">
                  {section.content}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </footer>
  );
}
