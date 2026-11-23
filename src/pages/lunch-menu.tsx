import { MenuPageLayout } from "@/components/MenuPageLayout";
import { useLanguage } from "@/context/LanguageContext";

import {lunchMenuCopy, type LunchMenuItem, type LunchMenuSection} from "@/constants/lunchMenu";

function LunchMenuItemRow({ item }: { item: LunchMenuItem }) {
  return (
    <li className="text-center">
      <p className="text-base leading-6 text-bous-burgundy">
        <span className="font-semibold">{item.name}</span>
        {item.price ? (
          <span className="ml-1 font-normal tabular-nums">{item.price}</span>
        ) : null}
      </p>
      {item.description ? (
        <p className="mx-auto mt-1 max-w-[65ch] text-base leading-6 text-bous-burgundy/88">
          {item.description}
        </p>
      ) : null}
    </li>
  );
}

function LunchSection({ section }: { section: LunchMenuSection }) {
  return (
    <section className="text-center">
      <h2 className="font-operetta text-2xl font-normal leading-tight text-bous-burgundy">
        {section.title}
      </h2>
      <p className="mt-1.5 text-base leading-6 text-bous-burgundy/72">
        {section.detail}
      </p>
      <ol className="mt-6 space-y-4">
        {section.items.map((item) => (
          <LunchMenuItemRow key={item.name} item={item} />
        ))}
      </ol>
    </section>
  );
}

export default function LunchMenu() {
  const { language } = useLanguage();
  const copy = lunchMenuCopy[language];

  return (
    <MenuPageLayout
      active="lunch"
      heading={copy.heading}
      pdfHref={copy.pdfHref}
      pdfLabel={copy.pdfLabel}
      reserveLabel={copy.reserveLabel}
      sectionLabel={copy.sectionLabel}
      title={copy.pageTitle}
    >
      <div>
        <div className="text-center">
          <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-bous-red">
            {copy.menuTitle}
          </h2>
          <p className="font-operetta mt-3 text-3xl font-light leading-tight text-bous-burgundy">
            {copy.price}
          </p>
          <p className="mt-2 text-base leading-6 text-bous-burgundy/72">
            {copy.includes}
          </p>
        </div>

        <div className="mt-14 space-y-14 sm:mt-16 sm:space-y-16">
          {copy.sections.map((section) => (
            <LunchSection key={section.title} section={section} />
          ))}
        </div>

        <section className="mt-14 text-center sm:mt-16">
          <h2 className="font-operetta text-2xl font-normal leading-tight text-bous-burgundy">
            {copy.addOnsTitle}
          </h2>
          <ol className="mt-6 space-y-4">
            {copy.addOns.map((item) => (
              <LunchMenuItemRow key={item.name} item={item} />
            ))}
          </ol>
          <p className="mt-6 text-sm text-bous-burgundy/80">{copy.note}</p>
        </section>
      </div>
    </MenuPageLayout>
  );
}
