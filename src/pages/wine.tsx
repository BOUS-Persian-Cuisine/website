import { MenuSwitcher } from "@/components/MenuSwitcher";
import { SiteLayout } from "@/components/SiteLayout";
import { useLanguage } from "@/context/LanguageContext";

const wineAtlas = "https://wine.bous.ca/?embed=menu";

export default function WineMenu() {
  const { language } = useLanguage();
  const french = language === "fr";
  const title = french ? "Carte des vins" : "Wine List";

  return (
    <SiteLayout title={title + " · BOUS"}>
      <main className="w-full bg-white py-7">
        <h1 className="sr-only">{title}</h1>
        <div className="px-4">
          <MenuSwitcher active="wine" />
        </div>
        <iframe src={wineAtlas} title={title} className="mx-auto block h-[85dvh] min-h-96 w-full border-0 bg-white" />
      </main>
    </SiteLayout>
  );
}
