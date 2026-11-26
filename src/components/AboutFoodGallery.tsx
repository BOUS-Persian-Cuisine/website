import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Language } from "@/context/LanguageContext";
import styles from "@/styles/about-food-gallery.module.css";

const foodPhotos = [
  {
    src: "/img/about-food/persian-table.webp", width: 1440, height: 960,
    en: ["The Persian table", "A spread of joojeh kabab, duck fesenjoon, eggplant, yogurt and saffron rice."],
    fr: ["La table persane", "Une table garnie de joojeh kabab, de fesenjoon au canard, d’aubergine, de yogourt et de riz au safran."],
  },
  {
    src: "/img/about-food/koobideh-charcoal.webp", width: 961, height: 1440,
    en: ["Koobideh over charcoal", "Metal skewers of koobideh above the glowing charcoal."],
    fr: ["Koobideh sur la braise", "Des brochettes de koobideh au-dessus des braises."],
  },
  {
    src: "/img/about-food/duck-fesenjoon.webp", width: 960, height: 1440,
    en: ["Duck fesenjoon", "Duck confit in walnut and pomegranate sauce, served with saffron rice."],
    fr: ["Fesenjoon au canard", "Cuisse de canard confite, sauce aux noix et à la grenade, accompagnée de riz au safran."],
  },
  {
    src: "/img/about-food/pouring-kashk.webp", width: 1147, height: 1440,
    en: ["Finishing the kashk-o-bademjoon", "Kashk is poured around smoked eggplant with crisp onions and mint."],
    fr: ["La touche finale du kashk-o-bademjoon", "On verse le kashk autour de l’aubergine fumée garnie d’oignons croustillants et de menthe."],
  },
  {
    src: "/img/about-food/chocolate-date-cake.webp", width: 961, height: 1440,
    en: ["A spoonful of chocolate date cake", "A spoon cuts through sesame halva ice cream and chocolate date cake."],
    fr: ["Une cuillerée de gâteau chocolat-dattes", "Une cuillère traverse la crème glacée au halva de sésame et le gâteau au chocolat et aux dattes."],
  },
  {
    src: "/img/about-food/joojeh-kabab.webp", width: 960, height: 1440,
    en: ["Joojeh kabab", "Saffron chicken on flatbread with charred vegetables, onion and lime."],
    fr: ["Joojeh kabab", "Poulet au safran sur pain plat, accompagné de légumes grillés, d’oignon et de lime."],
  },
  {
    src: "/img/about-food/maast-o-khiar.webp", width: 960, height: 1440,
    en: ["Maast-o-Khiar", "Cucumber yogurt scattered with herbs, walnuts and flower petals."],
    fr: ["Maast-o-Khiar", "Yogourt au concombre parsemé de fines herbes, de noix et de pétales."],
  },
  {
    src: "/img/about-food/lamb-ghormeh-sabzi.webp", width: 960, height: 1440,
    en: ["Lamb ghormeh sabzi", "Braised lamb shank standing in a bowl of herb sauce."],
    fr: ["Ghormeh sabzi à l’agneau", "Un jarret d’agneau braisé dans une sauce aux fines herbes."],
  },
  {
    src: "/img/about-food/kabab-flatbread.webp", width: 961, height: 1440,
    en: ["From skewer to plate", "A cook grips grilled kabab with flatbread above a plate of onions, tomato and lime."],
    fr: ["De la brochette à l’assiette", "À l’aide de pain plat, un cuisinier dépose le kabab auprès des oignons, de la tomate et de la lime."],
  },
  {
    src: "/img/about-food/smoked-eggplant.webp", width: 960, height: 1440,
    en: ["Kashk-o-Bademjoon", "Plated smoked eggplant with kashk and crisp onions, beside a platter of sangak."],
    fr: ["Kashk-o-Bademjoon", "Aubergine fumée au kashk et aux oignons croustillants, près d’un plat de pain sangak."],
  },
  {
    src: "/img/about-food/dinner-at-bar.webp", width: 961, height: 1440,
    en: ["Dinner at the bar", "A plate of chicken and rice with a glass of white wine on the marble counter."],
    fr: ["Souper au bar", "Une assiette de poulet et de riz avec un verre de vin blanc sur le comptoir de marbre."],
  },
  {
    src: "/img/about-food/saffron-cocktail.webp", width: 960, height: 1440,
    en: ["Saffron on ice", "Saffron threads rest on a clear ice cube in a golden cocktail."],
    fr: ["Safran sur glace", "Des filaments de safran reposent sur un glaçon dans un cocktail doré."],
  },
  {
    src: "/img/about-food/bar-arches.webp", width: 960, height: 1440,
    en: ["The arches above the bar", "A row of stools beneath the softly lit, sculpted ceiling at BOUS."],
    fr: ["Les arches du bar", "Une rangée de tabourets sous les voûtes doucement éclairées du bar de BOUS."],
  },
  {
    src: "/img/about-food/cocktail-olives.webp", width: 961, height: 1440,
    en: ["A cocktail with olives", "A hand holds an amber cocktail garnished with olives in front of a Persian rug."],
    fr: ["Un cocktail aux olives", "Une main tient un cocktail ambré garni d’olives devant un tapis persan."],
  },
  {
    src: "/img/about-food/walnut-chairs.webp", width: 961, height: 1440,
    en: ["At the table", "Curved wooden chairs at a set dining table."],
    fr: ["À table", "Des chaises en bois aux lignes courbes entourent une table dressée."],
  },
  {
    src: "/img/about-food/flower-cocktail.webp", width: 961, height: 1440,
    en: ["A cocktail in the afternoon light", "A yellow cocktail topped with foam and a purple flower casts a long shadow."],
    fr: ["Un cocktail dans la lumière de l’après-midi", "Un cocktail jaune coiffé de mousse et d’une fleur violette projette une longue ombre."],
  },
  {
    src: "/img/about-food/faloodeh.webp", width: 961, height: 1440,
    en: ["Faloodeh", "Frozen vermicelli with poached barberries and a slice of lime."],
    fr: ["Faloodeh", "Vermicelles glacés garnis d’épines-vinettes pochées et d’une tranche de lime."],
  },
  {
    src: "/img/about-food/sesame-halva.webp", width: 961, height: 1440,
    en: ["Sesame halva ice cream", "Sesame brittle frames a scoop of halva ice cream over chocolate date cake."],
    fr: ["Crème glacée au halva de sésame", "Des tuiles de sésame encadrent une boule de crème glacée au halva sur un gâteau chocolat-dattes."],
  },
  {
    src: "/img/about-food/dining-room.webp", width: 961, height: 1440,
    en: ["Before service", "A table set with wine glasses beneath the illuminated niches in the dining room."],
    fr: ["Avant le service", "Une table dressée de verres à vin sous les niches éclairées de la salle à manger."],
  },
];

// Enhance ordinary image links so photos remain accessible without JavaScript.
export function enableFoodViewer(section: HTMLElement) {
  const dialog = section.querySelector("dialog");
  if (!dialog || typeof dialog.showModal !== "function") return;
  const links = Array.from(section.querySelectorAll<HTMLAnchorElement>("[data-food-photo]"));
  const image = dialog.querySelector("img")!;
  const caption = dialog.querySelector("figcaption")!;
  let current = 0;
  function show(index: number) {
    current = (index + links.length) % links.length;
    const link = links[current];
    image.src = link.href;
    image.alt = link.querySelector("img")!.alt;
    caption.textContent = link.nextElementSibling!.textContent;
  }
  function click(e: MouseEvent) {
    if (!(e.target instanceof Element)) return;
    const link = e.target.closest<HTMLAnchorElement>("[data-food-photo]");
    if (link && !e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey && e.button === 0) {
      e.preventDefault();
      show(links.indexOf(link));
      dialog!.showModal();
    } else if (e.target.closest("[data-close]") || e.target === dialog) {
      dialog!.close();
    } else if (e.target.closest("[data-prev]")) {
      show(current - 1);
    } else if (e.target.closest("[data-next]")) {
      show(current + 1);
    }
  }
  function key(e: KeyboardEvent) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    show(current + (e.key === "ArrowLeft" ? -1 : 1));
  }
  section.addEventListener("click", click);
  dialog.addEventListener("keydown", key);
  return () => {
    section.removeEventListener("click", click);
    dialog.removeEventListener("keydown", key);
  };
}

export default function AboutFoodGallery({ language }: { language: Language }) {
  const section = useRef<HTMLElement>(null);
  useEffect(() => { if (section.current) return enableFoodViewer(section.current); }, []);
  const fr = language === "fr";
  function renderPhoto(photo: (typeof foodPhotos)[number]) {
    const [name, alt] = photo[language];
    return <figure key={photo.src}>
      <a href={photo.src} data-food-photo="" aria-haspopup="dialog" aria-label={fr ? "Agrandir la photo · " + name : "Enlarge photo · " + name}>
        <Image src={photo.src} width={photo.width} height={photo.height} alt={alt} />
      </a>
      <figcaption>{name}</figcaption>
    </figure>;
  }
  return (
    <section id="food-gallery" ref={section} aria-labelledby="food-gallery-heading" className={styles.gallery}>
      <h2 id="food-gallery-heading">{fr ? "BOUS en images" : "BOUS in pictures"}</h2>
      <div className={styles.grid}>{foodPhotos.slice(0, 5).map(renderPhoto)}</div>
      <details className={styles.more}>
        <summary>
          <span className={styles.whenClosed}>{fr ? `Voir les ${foodPhotos.length} photos` : `View all ${foodPhotos.length} photos`}</span>
          <span className={styles.whenOpen}>{fr ? "Afficher moins de photos" : "Show fewer photos"}</span>
        </summary>
        <div className={styles.grid}>{foodPhotos.slice(5).map(renderPhoto)}</div>
      </details>
      <dialog className={styles.viewer} aria-label={fr ? "Galerie de photos" : "Photo gallery"}>
        <div className={styles.frame}>
          <button type="button" data-close="" className={styles.close}>{fr ? "Fermer" : "Close"}</button>
          <figure>
            {/* Dimensions vary with the selected photo. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" />
            <figcaption aria-live="polite" aria-atomic="true" />
          </figure>
          <div className={styles.controls}>
            <button type="button" data-prev="">{fr ? "Précédente" : "Previous"}</button>
            <button type="button" data-next="">{fr ? "Suivante" : "Next"}</button>
          </div>
        </div>
      </dialog>
    </section>
  );
}
