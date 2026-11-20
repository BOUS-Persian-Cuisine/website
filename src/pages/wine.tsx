import { MenuSwitcher } from "@/components/MenuSwitcher";
import { SiteLayout } from "@/components/SiteLayout";
import { useLanguage } from "@/context/LanguageContext";

const wineAtlas = "https://wine.bous.ca/";

export default function WineMenu() {
  const { language } = useLanguage();
  const french = language === "fr";
  const title = french ? "Carte des vins" : "Wine List";

  return (
    <SiteLayout title={title + " · BOUS"}>
      <main className="mx-auto w-full max-w-[90rem] px-4 py-7 sm:px-8">
        <MenuSwitcher active="wine" />
        <div className="mt-6 mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="font-operetta text-3xl">{title}</h1>
          <a href={wineAtlas} target="_blank" rel="noreferrer" className="underline underline-offset-4">
            {french ? "Ouvrir dans un nouvel onglet" : "Open in a new tab"}
          </a>
        </div>
        <iframe src={wineAtlas} title={title} className="block h-[80dvh] min-h-96 w-full border-0" />
      </main>
    </SiteLayout>
  );
}
