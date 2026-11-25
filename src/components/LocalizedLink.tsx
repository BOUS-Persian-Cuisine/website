import Link from "next/link";
import type { ComponentProps } from "react";
import { useLanguage, type Language } from "@/context/LanguageContext";
import { localizedHref } from "@/constants/siteRoutes";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  language?: Language;
};

export default function LocalizedLink({ href, language, ...props }: Props) {
  const current = useLanguage();
  return <Link {...props} href={localizedHref(href, language ?? current.language)} />;
}
