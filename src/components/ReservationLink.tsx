import type { ComponentProps } from "react";
import { getOpenTableReservationUrl } from "@/constants/links";
import { trackBooking } from "@/constants/analytics";
import { useLanguage } from "@/context/LanguageContext";

export function ReservationLink({ onClick, ...props }: Omit<ComponentProps<"a">, "href">) {
  const { language } = useLanguage();
  return <a {...props} href={getOpenTableReservationUrl(language)} onClick={(e) => {
    trackBooking("reservation_click", language);
    onClick?.(e);
  }} />;
}
