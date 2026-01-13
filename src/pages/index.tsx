import Image from "next/image";
import { useEffect, useState } from "react";

const CONTENT = {
  EN: {
    tagline: "PERSIAN CUISINE",
    main: ["A QUIET EXPRESSION", "OF PERSIAN CULTURE"],
    soon: "Opening Soon",
  },
  FR: {
    tagline: "CUISINE PERSE",
    main: ["UNE EXPRESSION DISCRÈTE", "DE LA CULTURE PERSANE"],
    soon: "Ouverture à Venir",
  },
};

export default function Home() {
  const [lang, setLang] = useState<"EN" | "FR">("FR");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleLang = () => setLang(lang === "EN" ? "FR" : "EN");

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-6xl items-start justify-between px-6 pt-10 sm:px-10">
        <div className="shrink-0">
          <div className="w-45">
            <Image
              className="h-auto w-full"
              src="/bous-logo.svg"
              alt="BOUS Persian Cuisine"
              width={180}
              height={52}
              priority
            />
          </div>

          <div className="mt-1 w-45 text-xs px-1">
            <span className="sr-only">{CONTENT[lang].tagline}</span>
            <div aria-hidden className="flex justify-between">
              {CONTENT[lang].tagline.split("").map((ch, idx) =>
                ch === " " ? (
                  <span key={idx} className="w-[0.9rem]" />
                ) : (
                  <span key={idx} className="leading-none">
                    {ch}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Desktop menu */}
        <div className="hidden gap-10 text-xs font-light tracking-[0.35em] text-foreground lg:flex flex-row self-stretch items-center">
          <span>Montréal, Québec</span>
          <a
            className="hover:text-foreground"
            href="https://instagram.com/bousmontreal"
            target="_blank"
            rel="noreferrer"
          >
            @bousmontreal
          </a>
          <a className="hover:text-foreground" href="mailto:contact@bous.ca">
            contact@bous.ca
          </a>
          <a
            className="hover:text-foreground"
            href="https://instagram.com/bous"
            target="_blank"
            rel="noreferrer"
          >
            ©BOUS
          </a>
          <button
            type="button"
            className="hover:text-foreground"
            onClick={toggleLang}
          >
            {lang}
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="lg:hidden flex items-center mt-3">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded p-2 text-foreground hover:text-foreground"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMobileMenuOpen((v) => !v)}
          >
            {isMobileMenuOpen ? (
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
            ) : (
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
            )}
          </button>
        </div>

        {/* Mobile slide-over */}
        {isMobileMenuOpen ? (
          <div
            className="fixed inset-0 z-50 lg:hidden"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/20"
              aria-label="Close menu"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="absolute right-0 top-0 h-full w-[18rem] bg-background text-foreground shadow-xl">
              <div className="flex items-center justify-between px-6 pt-10">
                <span className="text-xs font-light tracking-[0.35em]">
                  MENU
                </span>
                <button
                  type="button"
                  className="rounded p-2"
                  aria-label="Close menu"
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

              <nav className="mt-10 flex flex-col gap-6 px-6 text-xs font-light tracking-[0.35em]">
                <span>Montréal, Québec</span>
                <a
                  className="hover:text-foreground"
                  href="https://instagram.com/bousmontreal"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  @bousmontreal
                </a>
                <a
                  className="hover:text-foreground"
                  href="mailto:contact@bous.ca"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  contact@bous.ca
                </a>
                <a
                  className="hover:text-foreground"
                  href="https://instagram.com/bous"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ©BOUS
                </a>
                <button
                  type="button"
                  className="text-left hover:text-foreground"
                  onClick={() => {
                    toggleLang();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {lang}
                </button>
              </nav>
            </div>
          </div>
        ) : null}
      </header>

      <main className="flex flex-1 items-center justify-center px-6 pb-20 pt-10 sm:px-10">
        <section className="w-full max-w-5xl font-operetta">
          <div className="flex flex-col items-center">
            <div className="flex flex-row self-stretch justify-between">
              <div className="flex items-center">
                <Image
                  src="/heart-left.svg"
                  alt=""
                  width={25}
                  height={25}
                  aria-hidden
                />
              </div>
              <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                <h1 className="text-[26px] font-light tracking-[0.55em] text-foreground sm:text-3xl">
                  {CONTENT[lang].main[0]}
                  <br />
                  {CONTENT[lang].main[1]}
                </h1>
              </div>
              <div className="flex items-center">
                <Image
                  className="rotate-180"
                  src="/heart-left.svg"
                  alt=""
                  width={25}
                  height={25}
                  aria-hidden
                />
              </div>
            </div>
          </div>

          <div className="mt-20 text-[14px] font-light tracking-[0.35em] sm:mt-24 sm:text-xl text-center font-sans">
            {CONTENT[lang].soon}
          </div>
        </section>
      </main>
    </div>
  );
}
