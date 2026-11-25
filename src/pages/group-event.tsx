import { useEffect, useRef, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { GroupInquiry } from "@/components/GroupInquiry";
import { GroupEventLanding } from "@/components/GroupEventLanding";
import { useLanguage } from "@/context/LanguageContext";
import type { Style } from "@/constants/groupEvent";
import css from "@/styles/group-event.module.css";

export default function GroupEvent() {
  const { language } = useLanguage();
  const t = (en: string, fr: string) => (language === "fr" ? fr : en);
  const [open, setOpen] = useState(false);
  const [visitedPlanner, setVisitedPlanner] = useState(false);
  const [style, setStyle] = useState<Style>("sharing");
  const [completed, setCompleted] = useState(false);
  const [requestNumber, setRequestNumber] = useState(0);
  const title = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const sync = () => {
      const isPlanner = window.location.hash === "#request";
      if (isPlanner) setVisitedPlanner(true);
      setOpen(isPlanner);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  useEffect(() => {
    if (open) title.current?.focus();
    else if (window.location.hash === "#menus") {
      const menu = document.getElementById("group-menu-heading");
      menu?.focus({ preventScroll: true });
      menu?.scrollIntoView({ block: "start" });
    }
  }, [open]);
  const begin = () => {
    if (completed) {
      setRequestNumber((n) => n + 1);
      setCompleted(false);
      setStyle("sharing");
    }
    setVisitedPlanner(true);
    window.location.hash = "request";
    setOpen(true);
    window.scrollTo(0, 0);
  };
  return (
    <SiteLayout title={t("Group Event", "Événement de groupe") + " · BOUS"}>
      <main className={css.page}>
        {!open && <GroupEventLanding onPlan={begin} />}
        {visitedPlanner && (
          <div hidden={!open} className={css.formWrap}>
            <a
              className={css.textLink}
              href="#menus"
              onClick={() => setOpen(false)}
            >
              {t(
                "Back to the event overview",
                "Retour à la présentation des événements",
              )}
            </a>
            {!completed && (
              <header className={css.formIntro}>
                <h1 ref={title} tabIndex={-1}>
                  {t("Plan your event", "Organisez votre événement")}
                </h1>
                <p>
                  {t(
                    "Send your preferences and our team will email you to confirm availability. Fields marked * are required.",
                    "Envoyez-nous vos préférences. Notre équipe vous écrira pour confirmer les disponibilités. Les champs marqués d’un astérisque (*) sont obligatoires.",
                  )}
                </p>
              </header>
            )}
            <GroupInquiry
              key={requestNumber}
              style={style}
              onStyleChange={setStyle}
              onComplete={() => setCompleted(true)}
            />
          </div>
        )}
      </main>
    </SiteLayout>
  );
}
