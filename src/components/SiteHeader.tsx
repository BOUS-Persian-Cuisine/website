import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  languageLabels,
  useLanguage,
  type Language,
} from "@/context/LanguageContext";

const languageOptions: Language[] = ["en", "fr"];

export function SiteHeader() {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    let frameId: number | null = null;

    const updateScrolledState = () => {
      frameId = null;
      setHasScrolled(window.scrollY > 0);
    };

    const onScroll = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateScrolledState);
    };

    updateScrolledState();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isMobileMenuOpen]);

  const headerClass = [
    "sticky top-0 z-40 border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow,color] duration-300",
    hasScrolled
      ? "border-bous-gold/25 bg-bous-cream/88 text-foreground shadow-[0_1px_0_rgba(255,255,255,0.35)]"
      : "border-bous-gold/35 bg-bous-burgundy text-bous-cream shadow-[0_1px_0_rgba(176,152,97,0.22)]",
  ].join(" ");

  const navLinkClass = [
    "brand-link text-[0.72rem] uppercase tracking-[0.26em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
    hasScrolled
      ? "text-foreground/78 hover:text-bous-red focus-visible:outline-bous-red"
      : "text-bous-cream/86 hover:text-bous-gold focus-visible:outline-bous-gold",
  ].join(" ");
  const iconButtonClass = [
    "inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
    hasScrolled
      ? "border-bous-gold/35 bg-bous-white/45 text-foreground shadow-[0_10px_30px_rgba(53,5,20,0.08)] hover:border-bous-red/45 hover:bg-bous-blush/80 focus-visible:outline-bous-red"
      : "border-bous-gold/55 bg-bous-cream/10 text-bous-cream shadow-[0_10px_30px_rgba(0,0,0,0.14)] hover:border-bous-gold hover:bg-bous-gold/15 focus-visible:outline-bous-gold",
  ].join(" ");
  const menuCloseButtonClass =
    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-bous-gold/35 bg-bous-white/45 text-foreground shadow-[0_10px_30px_rgba(53,5,20,0.08)] transition-colors hover:border-bous-red/45 hover:bg-bous-blush/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bous-red";

  return (
    <>
      <header className={headerClass}>
        <div className="mx-auto grid h-18 w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:h-20 lg:px-10">
          <nav
            aria-label={t.header.menuLabel}
            className="hidden items-center gap-8 md:flex"
          >
            <a
              href="https://www.opentable.com/r/bous-montreal"
              className={navLinkClass}
            >
              {t.header.nav.reserve}
            </a>
            <Link href="/about" className={navLinkClass}>
              {t.header.nav.about}
            </Link>
            <Link href="/contact" className={navLinkClass}>
              {t.header.nav.contact}
            </Link>
          </nav>

          <button
            type="button"
            className={`${iconButtonClass} justify-self-start md:hidden`}
            aria-controls="site-menu"
            aria-expanded={isMobileMenuOpen}
            aria-label={t.header.openMenu}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M4 7H20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M4 12H20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M4 17H20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <Link
            href="/"
            className="block w-33 justify-self-center sm:w-38 lg:w-42"
            aria-label={t.header.homeLabel}
          >
            <Image
              className="block h-auto w-full"
              src="/bous-logo.svg"
              alt={t.header.logoAlt}
              width={210}
              height={60}
              priority
              style={{ width: "100%", height: "auto" }}
            />
          </Link>

          <div className="hidden items-center justify-end gap-2 md:flex">
            {languageOptions.map((option) => {
              const isSelected = language === option;

              return (
                <button
                  key={option}
                  type="button"
                  className={[
                    "h-9 min-w-10 border-b text-[0.72rem] uppercase tracking-[0.22em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bous-red",
                    hasScrolled
                      ? isSelected
                        ? "border-foreground text-foreground"
                        : "border-transparent text-foreground/52 hover:text-bous-red"
                      : isSelected
                        ? "border-bous-gold text-bous-gold"
                        : "border-transparent text-bous-cream/62 hover:text-bous-gold",
                  ].join(" ")}
                  aria-label={t.header.languageAriaLabels[option]}
                  aria-pressed={isSelected}
                  onClick={() => setLanguage(option)}
                >
                  {languageLabels[option]}
                </button>
              );
            })}
          </div>

          <div className="h-11 w-11 justify-self-end md:hidden" aria-hidden />
        </div>
      </header>

      {isMobileMenuOpen ? (
        <div
          className="fixed inset-0 z-50"
          id="site-menu"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="menu-overlay absolute inset-0 bg-bous-night/45 backdrop-blur-sm"
            aria-label={t.header.closeMenu}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="menu-panel absolute left-0 top-0 flex h-full w-[min(23rem,88vw)] flex-col bg-bous-cream text-foreground shadow-[30px_0_80px_rgba(17,33,59,0.26)]">
            <div className="flex items-center justify-between border-b border-bous-gold/25 px-6 py-5">
              <span className="text-[0.72rem] uppercase tracking-[0.32em] text-foreground/72">
                {t.header.menuLabel}
              </span>
              <button
                type="button"
                className={menuCloseButtonClass}
                aria-label={t.header.closeMenu}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-7 px-6 py-10 text-xl font-light tracking-[0.22em]">
              <a
                href="https://www.opentable.com/r/bous-montreal"
                className="transition-colors hover:text-bous-red"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.header.nav.reserve}
              </a>
              <Link
                href="/about"
                className="transition-colors hover:text-bous-red"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.header.nav.about}
              </Link>
              <Link
                href="/contact"
                className="transition-colors hover:text-bous-red"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.header.nav.contact}
              </Link>

              <div className="flex gap-4 pt-4 text-sm tracking-[0.24em]">
                {languageOptions.map((option) => {
                  const isSelected = language === option;

                  return (
                    <button
                      key={option}
                      type="button"
                      className={[
                        "border-b pb-1 text-left transition-colors",
                        isSelected
                          ? "border-foreground text-foreground"
                          : "border-transparent text-foreground/50 hover:text-bous-red",
                      ].join(" ")}
                      aria-label={t.header.languageAriaLabels[option]}
                      aria-pressed={isSelected}
                      onClick={() => {
                        setLanguage(option);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {languageLabels[option]}
                    </button>
                  );
                })}
              </div>
            </nav>

            <address className="mt-auto border-t border-bous-gold/25 px-6 py-7 text-sm leading-7 tracking-[0.08em] text-foreground/72 not-italic">
              {t.footer.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
        </div>
      ) : null}
    </>
  );
}
