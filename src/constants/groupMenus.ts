export const tiers = [
  { name: "Sofreh", price: 80, en: "Ground beef, saffron chicken and duck confit.", fr: "Bœuf haché, poulet au safran et canard confit." },
  { name: "Mehmani", price: 95, en: "Beef tenderloin, saffron chicken, duck confit and braised lamb.", fr: "Filet de bœuf, poulet au safran, canard confit et agneau braisé." },
  { name: "Bazm", price: 125, en: "Beef tenderloin, chicken, duck and lamb, with whole sea bass, king shrimp and a welcome sharbat.", fr: "Filet de bœuf, poulet, canard et agneau, avec bar entier, crevettes géantes et sharbat de bienvenue." },
];

// The first tier that includes a dish. A null tier is available only à la carte.
type Dish = { en: string; fr?: string; description: { en: string; fr: string }; price: number; tier: number | null; unit?: [string, string]; dinnerName?: string };
type Course = { en: string; fr: string; dishes: Dish[] };
export const courses: Course[] = [
  { en: "Bread & appetisers", fr: "Pain et entrées", dishes: [
    { en: "Sangak", description: { en: "Persian Flatbread", fr: "Pain plat" }, price: 6, tier: 0 },
    { en: "Maast-o-Khiar", description: { en: "Cucumber Yogurt", fr: "Yogourt, concombre" }, price: 18, tier: 0 },
    { en: "Kashk-o-Bademjoon", description: { en: "Smoked Eggplant", fr: "Aubergine fumée" }, price: 28, tier: 0 },
    { en: "Zeyton Parvardeh", description: { en: "Marinated Olives", fr: "Olives marinées" }, price: 20, tier: 1 },
    { en: "Golden Square Mile Tahchin", fr: "Tahchin du Mille carré doré", description: { en: "Crispy Rice", fr: "Riz croustillant" }, price: 22, tier: 1 },
    { en: "Ghalieh Meygoo", description: { en: "King Shrimp", fr: "Crevettes géantes" }, price: 10, tier: 2, unit: ["per shrimp", "la crevette"] },
    { en: "Spicy Saffron Chicken Wings", fr: "Ailes de poulet épicées au safran", description: { en: "Chicken Wingettes", fr: "Ailerons épicés" }, price: 18, tier: null },
    { en: "Caviar Tahdig Bite", dinnerName: "CAVIAR on Tahdig Bites", fr: "Bouchée de tahdig au caviar", description: { en: "Baerii Caviar", fr: "Caviar Baerii" }, price: 15, tier: null, unit: ["per bite", "la bouchée"] },
  ] },
  { en: "Main dishes", fr: "Plats principaux", dishes: [
    { en: "Koobideh Kabab", description: { en: "Ground Beef", fr: "Bœuf haché" }, price: 36, tier: 0 },
    { en: "Joojeh Kabab", description: { en: "Saffron Chicken", fr: "Poulet safrané" }, price: 38, tier: 0 },
    { en: "Duck Fesenjoon", fr: "Fesenjoon au canard", description: { en: "Duck Confit", fr: "Canard confit" }, price: 48, tier: 0 },
    { en: "Barg Kabab", description: { en: "Beef Tenderloin", fr: "Filet bovin" }, price: 54, tier: 1 },
    { en: "Kamouraska Lamb Ghormeh Sabzi", fr: "Ghormeh Sabzi à l’agneau de Kamouraska", description: { en: "Lamb Shank", fr: "Jarret d’agneau" }, price: 55, tier: 1 },
    { en: "Whole Branzino", fr: "Bar entier", description: { en: "Sea Bass", fr: "Bar grillé" }, price: 72, tier: 2 },
    { en: "Shishlik", description: { en: "Lamb Chops", fr: "Côtelettes d’agneau" }, price: 65, tier: null },
    { en: "Jewel Rice with Lamb Neck", fr: "Riz aux joyaux et cou d’agneau", description: { en: "Braised Lamb", fr: "Agneau braisé" }, price: 58, tier: null },
  ] },
  { en: "Accompaniments", fr: "Accompagnements", dishes: [
    { en: "Saffron Rice", fr: "Riz safrané", description: { en: "Iranian Rice", fr: "Riz iranien" }, price: 8, tier: 0 },
    { en: "Salad Shirazi", fr: "Salade Shirazi", description: { en: "Cucumber, Tomato", fr: "Concombre, tomate" }, price: 13, tier: 0 },
    { en: "Maast-o-Moosir", description: { en: "Shallot Yogurt", fr: "Yogourt, échalotes" }, price: 14, tier: 0 },
    { en: "Sir Torshi", description: { en: "Pickled Garlic", fr: "Ail mariné" }, price: 5, tier: 2 },
    { en: "Borani Bademjoon", description: { en: "Eggplant Yogurt", fr: "Yogourt, aubergine" }, price: 14, tier: null },
  ] },
];

export const pairings = [
  { en: "Wine Pairing", fr: "Accord de vins", glasses: 3, price: 65 },
  { en: "Ancient Persia Wine Pairing", fr: "Accord de vins de la Perse antique", glasses: 3, price: 95 },
  { en: "Cocktail Pairing", fr: "Accord de cocktails", glasses: 2, price: 45 },
  { en: "Sharbat Pairing", fr: "Accord de sharbats", glasses: 3, price: 42 },
  { en: "BOUS Curated", fr: "Sélection BOUS", glasses: null, price: 85 },
];
