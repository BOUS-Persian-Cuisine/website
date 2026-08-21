import Link from "next/link";

import { useLanguage, type Language } from "@/context/LanguageContext";

type MenuKey = "lunch" | "dining" | "drinks" | "group";

type MenuSwitcherProps = {
  active: MenuKey;
};

const menuSwitcherCopy: Record<
  Language,
  {
    ariaLabel: string;
    dining: string;
    drinks: string;
    lunch: string;
    group: string;
    viewDining: string;
    viewDrinks: string;
    viewLunch: string;
    viewGroup: string;
  }
> = {
  en: {
    ariaLabel: "Menu sections",
    dining: "Dinner Menu",
    drinks: "Drinks Menu",
    lunch: "Lunch Menu",
    group: "Group Menus",
    viewDining: "View Dinner Menu",
    viewDrinks: "View Drinks Menu",
    viewLunch: "View Lunch Menu",
    viewGroup: "View Group Menus",
  },
  fr: {
    ariaLabel: "Sections du menu",
    dining: "Menu du soir",
    drinks: "Carte des boissons",
    lunch: "Menu midi",
    group: "Menus de groupe",
    viewDining: "Voir le menu du soir",
    viewDrinks: "Voir la carte des boissons",
    viewLunch: "Voir le menu midi",
    viewGroup: "Voir les menus de groupe",
  },
};

function getMenuLinks(
  copy: (typeof menuSwitcherCopy)[Language],
  useActionLabels = false,
) {
  return [
    {
      href: "/lunch-menu",
      key: "lunch" as const,
      label: useActionLabels ? copy.viewLunch : copy.lunch,
    },
    {
      href: "/menu",
      key: "dining" as const,
      label: useActionLabels ? copy.viewDining : copy.dining,
    },
    {
      href: "/drinks-menu",
      key: "drinks" as const,
      label: useActionLabels ? copy.viewDrinks : copy.drinks,
    },
    {
      href: "/group-menu",
      key: "group" as const,
      label: useActionLabels ? copy.viewGroup : copy.group,
    },
  ];
}

export function MenuSwitcher({ active }: MenuSwitcherProps) {
  const { language } = useLanguage();
  const copy = menuSwitcherCopy[language];
  const links = getMenuLinks(copy);

  return (
    <nav
      aria-label={copy.ariaLabel}
      className="flex flex-wrap justify-center gap-2"
    >
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

export function RelatedMenuLinks({ active }: MenuSwitcherProps) {
  const { language } = useLanguage();
  const copy = menuSwitcherCopy[language];
  const links = getMenuLinks(copy, true).filter((link) => link.key !== active);

  return (
    <nav
      aria-label={copy.ariaLabel}
      className="flex flex-wrap justify-center gap-3"
    >
      {links.map((link) => (
        <Link
          key={link.key}
          href={link.href}
          className="brand-link px-2 text-[0.72rem] uppercase tracking-[0.22em] text-foreground/68 underline-offset-4 transition-colors hover:text-bous-red hover:underline"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
