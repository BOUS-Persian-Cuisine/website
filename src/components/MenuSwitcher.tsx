import Link from "next/link";

import { useLanguage, type Language } from "@/context/LanguageContext";

export type MenuKey = "lunch" | "dining" | "drinks" | "group";

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
      className="flex flex-wrap justify-center gap-x-4 gap-y-1 sm:gap-x-7"
    >
      {links.map((link) => {
        const isActive = active === link.key;

        return (
          <Link
            key={link.key}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={[
              "inline-flex min-h-9 items-center justify-center border-b px-1 text-[0.67rem] uppercase tracking-[0.16em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bous-red",
              isActive
                ? "border-bous-burgundy text-bous-burgundy"
                : "border-transparent text-foreground/58 hover:border-bous-red hover:text-bous-red",
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
      className="flex flex-wrap justify-center gap-x-5 gap-y-2"
    >
      {links.map((link) => (
        <Link
          key={link.key}
          href={link.href}
          className="brand-link px-1 text-[0.67rem] uppercase tracking-[0.16em] text-foreground/58 transition-colors hover:text-bous-red hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bous-red"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
