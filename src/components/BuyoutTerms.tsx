import { useLanguage } from "@/context/LanguageContext";
import css from "@/styles/group-event.module.css";

export function BuyoutTerms() {
  const { language } = useLanguage();
  const t = (en: string, fr: string) => language === "fr" ? fr : en;

  return (
    <section className={css.buyoutTerms} aria-labelledby="buyout-heading">
      <h3 id="buyout-heading">{t("Full restaurant buyout", "Privatisation du restaurant")}</h3>
      <p>{t(
        "Hosting a special event? Have BOUS to yourselves for the evening. Whether you’re planning a corporate gathering, a creative event or an intimate wedding, we’ll tailor the space, menu and service to your guests.",
        "Vous planifiez un événement spécial ? Réservez BOUS en exclusivité pour la soirée. Qu’il s’agisse d’une rencontre d’entreprise, d’un événement créatif ou d’un mariage intime, nous adapterons les lieux, le menu et le service à vos invités.",
      )}</p>
      <ul>
        <li><strong>{t("Seated capacity: 102 guests", "Capacité assise : 102 personnes")}</strong>
          {" "}{t("(84 at dining tables, 8 at the bar and 10 in the lounge).", "(84 aux tables, 8 au bar et 10 au salon).")}</li>
        <li><strong>{t("Standing cocktail reception: 120 guests", "Cocktail debout : 120 personnes")}</strong></li>
      </ul>
      <h4>{t("Pricing and booking terms", "Tarifs et conditions de réservation")}</h4>
      <p>{t(
        "After we discuss your event, we’ll send you a personalized quote. A mandatory 20% gratuity will be added to the final bill.",
        "Après avoir discuté de votre événement, nous vous enverrons un devis personnalisé. Des frais de service obligatoires de 20 % seront ajoutés à la facture finale.",
      )}</p>
      <ul>
        <li>{t("Your booking is confirmed once BOUS receives a 50% deposit.", "Votre réservation est confirmée dès que BOUS reçoit un acompte de 50 %.")}</li>
        <li>{t("Please confirm your final guest count at least 3 days before the event.", "Veuillez confirmer le nombre final de convives au moins 3 jours avant l’événement.")}</li>
        <li>{t("The remaining balance is due 72 hours before the event.", "Le solde est payable 72 heures avant l’événement.")}</li>
      </ul>
      <h4>{t("Cancellation policy", "Politique d’annulation")}</h4>
      <p>{t(
        "If you cancel at least 7 days before the event, we’ll refund your deposit in full. If you cancel with less than 7 days’ notice, the deposit is non-refundable.",
        "Si vous annulez au moins 7 jours avant l’événement, nous vous rembourserons l’acompte en totalité. À moins de 7 jours de l’événement, l’acompte est non remboursable.",
      )}</p>
    </section>
  );
}
