import { dinnerCourses } from "./dinnerMenu";
import { courses, pairings, tiers } from "./groupMenus";
import type { Language } from "@/context/LanguageContext";

export type Option = { en: string; fr: string };
export const option = (en: string, fr: string): Option => ({ en, fr });
export const occasions = [
  option("Corporate event", "Événement d’entreprise"),
  option("Birthday", "Anniversaire"),
  option("Family gathering", "Réunion de famille"),
  option("Wedding or rehearsal dinner", "Mariage ou souper de répétition"),
  option("Holiday celebration", "Fête de fin d’année"),
  option("Other occasion", "Autre occasion"),
];
export const meals = [
  option("Dinner", "Souper"),
  option("Lunch", "Dîner"),
];
export const fullBuyout = option(
  "Full restaurant buyout",
  "Privatisation du restaurant",
);
export const semiPrivateRoom = option("Semi-Private room", "Salon semi-privé");
export const spaces = [
  option("No preference", "Sans préférence"),
  option("Dining room", "Salle à manger"),
  semiPrivateRoom,
  fullBuyout,
];
export const bills = [
  option("One bill", "Une seule facture"),
  option("Separate bills", "Factures séparées"),
  option("Company invoice", "Facture d’entreprise"),
  option("Other", "Autre"),
];
export const drinks = [
  option(
    "Guests pay for their drinks",
    "Consommations payées par les convives",
  ),
  option("Host covers drinks", "Consommations offertes par l’hôte"),
  option("Drink tickets", "Coupons de consommation"),
  option("Other", "Autre"),
];
export const styles = {
  sharing: option("Family-style sharing", "Menu à partager"),
  individual: option("Individual choices", "Choix individuels"),
  undecided: option("Help me choose", "Aidez-moi à choisir"),
};
export type Style = keyof typeof styles;
export const individualDetails = [
  option(
    "Shared starters and sides, a main course chosen by each guest, and dessert.",
    "Entrées et accompagnements à partager, un plat principal au choix par convive et un dessert.",
  ),
  option(
    "Golden Tahchin and Duck Fesenjoon for the table, with each guest’s choice of main.",
    "Tahchin doré et Fesenjoon au canard pour la table, avec un plat principal au choix par convive.",
  ),
  option(
    "Welcome sharbat, five shared starters, lamb shank for the table, individual mains, sides and dessert.",
    "Sharbat de bienvenue, cinq entrées à partager, jarret d’agneau pour la table, plats individuels, accompagnements et dessert.",
  ),
];
export function isWeekday(date: string) {
  const day = new Date(date + "T12:00:00Z").getUTCDay();
  return day >= 1 && day <= 5;
}
export function allowsWeekdayLunch(dates: string[]) {
  return !dates.length || dates.some(isWeekday);
}
export function menuChoices(style: Style, meal: string, dates: string[]) {
  if (style === "undecided") return [];
  const choices = tiers.map((tier, i) => ({
    name: tier.name,
    price: tier.price,
    detail: style === "sharing" ? tier : individualDetails[i],
  }));
  if (style === "individual" && meal === "Lunch" && allowsWeekdayLunch(dates)) {
    choices.unshift({
      name: "Table d’Hôte",
      price: 45,
      detail: option(
        "Weekday lunch only. One starter and one main chosen by each guest. Some dishes carry a supplement.",
        "Au dîner en semaine seulement. Chaque convive choisit une entrée et un plat principal. Certains plats comportent un supplément.",
      ),
    });
  }
  return choices;
}
export function money(n: number, lang: Language) {
  return lang === "fr" ? n + " $" : "$" + n;
}
export const extraDishCourses = [
  { key: "appetizers", label: option("Appetizers", "Entrées") },
  { key: "caviar", label: option("Persian caviar", "Caviar persan") },
  {
    key: "grill",
    label: option("Mains · Charcoal grill", "Plats principaux · Grillades"),
  },
  {
    key: "slow-cooked",
    label: option("Mains · Slow-cooked", "Plats principaux · Plats mijotés"),
  },
  { key: "accompaniments", label: option("Accompaniments", "Accompagnements") },
  { key: "dessert", label: option("Dessert", "Dessert") },
];
const pairingExtras = pairings.map((item) => ({
  ...item,
  description: item.glasses
    ? option(item.glasses + " glasses", item.glasses + " verres")
    : option("Sharbat, wine and cocktail", "Sharbat, vin et cocktail"),
  unit: option("guest", "personne"),
  category: "pairing" as const,
  course: "",
}));
const groupDishes = courses.flatMap((course) => course.dishes);
const portionedDishes = new Map(
  groupDishes
    .filter((dish) => dish.unit)
    .map((dish) => [dish.dinnerName ?? dish.en, dish]),
);
const plate = option("plate", "assiette");

export const extras = [
  ...pairingExtras,
  ...dinnerCourses.flatMap((course) =>
    course.dishes.flatMap((dish) => {
      const groupDish = portionedDishes.get(dish.name.en);
      const details = {
        description: dish.shortDescription,
        course: course.id,
        category: "food" as const,
      };
      if (groupDish?.unit) {
        return [
          {
            ...details,
            en: groupDish.en,
            fr: groupDish.fr ?? groupDish.en,
            price: groupDish.price,
            unit: option(
              groupDish.unit[0].replace(/^per /, ""),
              groupDish.unit[1].replace(/^(la |le )/, ""),
            ),
          },
        ];
      }
      const portions =
        typeof dish.price === "number"
          ? [{ name: dish.name, price: dish.price }]
          : dish.price;
      return portions.map((portion) => ({
        ...details,
        ...portion.name,
        price: portion.price,
        unit: plate,
      }));
    }),
  ),
];

export const lunchExtras = [
  ...pairingExtras,
  ...groupDishes
    .filter((dish) => ["Maast-o-Moosir", "Borani Bademjoon"].includes(dish.en))
    .map((dish) => ({
      en: dish.en,
      fr: dish.fr ?? dish.en,
      price: dish.price,
      description: dish.description,
      course: "accompaniments",
      unit: plate,
      category: "food" as const,
    })),
  {
    en: "Dessert of the day",
    fr: "Dessert du jour",
    description: option("Chef’s selection", "Choix du chef"),
    price: 11,
    course: "dessert",
    unit: option("guest", "personne"),
    category: "food" as const,
  },
];
