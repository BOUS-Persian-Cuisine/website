import { MenuSwitcher, type MenuKey } from "@/components/MenuSwitcher";

type MenuPageHeaderProps = {
  active: MenuKey;
  heading: string;
};

export function MenuPageHeader({ active, heading }: MenuPageHeaderProps) {
  return (
    <header className="mx-auto max-w-5xl px-5 pt-10 text-center text-bous-burgundy sm:px-8 sm:pt-14 lg:px-10">
      <h1 className="font-operetta text-4xl font-light leading-tight tracking-[-0.02em] text-balance sm:text-5xl">
        {heading}
      </h1>
      <div className="mt-7 sm:mt-9">
        <MenuSwitcher active={active} />
      </div>
    </header>
  );
}
