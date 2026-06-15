import Link from "next/link";

import { useLanguage, type Language } from "@/context/LanguageContext";

type MenuSwitcherProps = {
  active: "dining" | "group";
};

const menuSwitcherCopy: Record<
  Language,
  {
    ariaLabel: string;
    dining: string;
    group: string;
  }
> = {
  en: {
    ariaLabel: "Menu sections",
    dining: "Dinner Menu",
    group: "Group Menus",
  },
  fr: {
    ariaLabel: "Sections du menu",
    dining: "Menu du soir",
    group: "Menus de groupe",
  },
};

export function MenuSwitcher({ active }: MenuSwitcherProps) {
  const { language } = useLanguage();
  const copy = menuSwitcherCopy[language];

  const links = [
    {
      href: "/menu",
      key: "dining" as const,
      label: copy.dining,
    },
    {
      href: "/group-menu",
      key: "group" as const,
      label: copy.group,
    },
  ];

  return (
    <nav aria-label={copy.ariaLabel} className="flex flex-wrap gap-2">
      {links.map((link) => {
        const isActive = active === link.key;

        return (
          <Link
            key={link.key}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={[
              "inline-flex min-h-11 items-center justify-center border px-4 text-[0.68rem] uppercase tracking-[0.22em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bous-gold sm:px-5",
              isActive
                ? "border-bous-burgundy bg-bous-burgundy text-bous-cream"
                : "border-bous-gold/60 text-foreground hover:border-bous-red hover:bg-bous-blush/70 hover:text-bous-red",
            ].join(" ")}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
