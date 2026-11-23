import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  bills,
  drinks,
  extras,
  extraDishCourses,
  lunchExtras,
  meals,
  menuChoices,
  money,
  occasions,
  spaces,
  styles,
  type Option,
  type Style,
} from "@/constants/groupEvent";
import { PreferredDatesCalendar } from "@/components/PreferredDatesCalendar";
import { MenuInclusions } from "@/components/MenuInclusions";
import css from "@/styles/group-event.module.css";

const empty = {
  occasion: "",
  meal: "",
  time: "",
  endTime: "",
  guests: "",
  children: "0",
  space: "No preference",
  menu: "",
  dietary: "",
  notes: "",
  budget: "",
  billing: "To be decided",
  drinks: "To be decided",
  name: "",
  company: "",
  email: "",
  phone: "",
};
type Fields = typeof empty;
type Field = keyof Fields;
type Extra = { name: string; quantity: number };

function montrealToday() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function GroupInquiry({
  style,
  onStyleChange,
  onComplete,
}: {
  style: Style;
  onStyleChange: (style: Style) => void;
  onComplete: () => void;
}) {
  const { language } = useLanguage();
  const t = (en: string, fr: string) => (language === "fr" ? fr : en);
  const [data, setData] = useState<Fields>({ ...empty });

  const [preferredDates, setPreferredDates] = useState<string[]>([]);
  const [missingDates, setMissingDates] = useState(false);
  const [detailMenu, setDetailMenu] = useState("");
  const menuDialog = useRef<HTMLDialogElement>(null);
  const [items, setItems] = useState<Extra[]>([]);
  const [filters, setFilters] = useState({ food: "", pairing: "" });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState("");
  const [ambiguous, setAmbiguous] = useState(false);
  const id = useRef("");
  const submission = useRef("");
  const busy = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const available = menuChoices(style, data.meal, preferredDates);
  const currentMenu = available.find((m) => m.name === data.menu);
  const choices = currentMenu?.name === "Table d’Hôte" ? lunchExtras : extras;
  const validItems = items.filter((item) =>
    choices.some((extra) => extra.en === item.name),
  );
  const selected = (en: string, options: Option[]) =>
    options.find((o) => o.en === en)?.[language] || en;
  const today = montrealToday();
  useEffect(() => {
    if (reference) heading.current?.focus();
  }, [reference]);

  const restrictExtras = () =>
    setItems((old) =>
      old.filter((item) => lunchExtras.some((extra) => extra.en === item.name)),
    );
  const change = (k: Field, value: string) => {
    setError("");
    setData((old) => {
      const next = { ...old, [k]: value };
      if (
        next.menu &&
        !menuChoices(style, next.meal, preferredDates).some(
          (menu) => menu.name === next.menu,
        )
      )
        next.menu = "";
      return next;
    });
  };
  const selectStyle = (value: Style) => {
    onStyleChange(value);
    const menus = menuChoices(value, data.meal, preferredDates);
    if (!menus.some((menu) => menu.name === data.menu)) change("menu", "");
    setError("");
  };
  const setMenu = (value: string) => {
    change("menu", value);
    if (value === "Table d’Hôte") restrictExtras();
  };
  const label = (text: string, element: ReactNode, required = false) => (
    <label className={css.label}>
      <span>
        {text}
        {required && <span aria-hidden="true"> *</span>}
      </span>
      {element}
    </label>
  );
  const input = (
    k: Field,
    text: string,
    type = "text",
    required = false,
    props: React.InputHTMLAttributes<HTMLInputElement> = {},
  ) =>
    label(
      text,
      <input
        type={type}
        value={data[k]}
        name={k}
        required={required}
        maxLength={140}
        onChange={(e) => change(k, e.target.value)}
        {...props}
      />,
      required,
    );
  const options = (
    key: Field,
    title: string,
    values: Option[],
    required = false,
  ) => (
    <fieldset className={css.choiceGroup}>
      <legend>
        {title}
        {required && " *"}
      </legend>
      <div className={css.pills}>
        {values.map((value) => (
          <label key={value.en}>
            <input
              type="radio"
              name={key}
              value={value.en}
              checked={data[key] === value.en}
              required={required}
              onChange={() => change(key, value.en)}
            />
            <span>{value[language]}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
  const textarea = (k: Field, text: string, placeholder: string) =>
    label(
      text,
      <textarea
        rows={3}
        maxLength={1150}
        value={data[k]}
        placeholder={placeholder}
        onChange={(e) => change(k, e.target.value)}
      />,
    );
  const quantityOf = (name: string) =>
    items.find((item) => item.name === name)?.quantity ?? 0;
  const updateExtra = (name: string, quantity: number) => {
    setItems((old) => {
      const kept = old.filter((item) => item.name !== name);
      return quantity > 0 ? [...kept, { name, quantity }] : kept;
    });
  };
  const shortGroup =
    style === "sharing" && data.guests !== "" && Number(data.guests) < 8;
  const dateFormatter = new Intl.DateTimeFormat(
    language === "fr" ? "fr-CA" : "en-CA",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    },
  );
  const calendarDates = preferredDates
    .map((value) => dateFormatter.format(new Date(value + "T12:00:00Z")))
    .join(" · ");
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!preferredDates.length) {
      setMissingDates(true);
      document.getElementById("event-preferred-dates")?.focus();
      return;
    }
    if (shortGroup) {
      const guests = e.currentTarget.elements.namedItem(
        "guests",
      ) as HTMLInputElement;
      guests.focus();
      return;
    }
    if (busy.current) return;
    busy.current = true;
    setSending(true);
    setError("");
    try {
      if (!id.current) id.current = crypto.randomUUID();
      const live = ["bous.ca", "www.bous.ca"].includes(
        window.location.hostname,
      );
      const endpoint = live
        ? "https://groups.bous.ca/api/inquiries"
        : "/api/inquiries";
      if (!submission.current)
        submission.current = JSON.stringify({
          requestId: id.current,
          language,
          occasion: data.occasion,
          date: preferredDates[0],
          preferredDates,
          time: data.time,
          alternateDate: preferredDates[1] || "",
          meal: data.meal,
          guests: Number(data.guests),
          children: Number(data.children),
          space: data.space,
          service: style,
          menu: currentMenu?.name ?? "Undecided",
          addons: validItems.map((x) => {
            const extra = choices.find((o) => o.en === x.name)!;
            return (
              x.quantity +
              " × " +
              x.name +
              " ($" +
              extra.price +
              " / " +
              extra.unit.en +
              ")"
            );
          }),
          dietary: data.dietary.trim(),
          notes: [
            data.endTime && "End time: " + data.endTime,
            data.drinks !== "To be decided" && "Beverages: " + data.drinks,
            data.notes.trim(),
          ]
            .filter(Boolean)
            .join("\n"),
          name: data.name.trim(),
          email: data.email.trim(),
          phone: data.phone.trim(),
          company: data.company.trim(),
          billing: data.billing,
          budget: data.budget.trim(),
        });
      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "omit",
        headers: { "Content-Type": "application/json" },
        body: submission.current,
        signal: AbortSignal.timeout(20000),
      });
      if (!response.ok) {
        if (response.status === 400 || response.status === 422) {
          submission.current = "";
          setAmbiguous(false);
          setError(
            t(
              "Please check your event details and contact information before sending again.",
              "Vérifiez les détails de l’événement et vos coordonnées avant de réessayer.",
            ),
          );
          return;
        }
        if (response.status === 429) {
          submission.current = "";
          setAmbiguous(false);
          setError(
            t(
              "Please try again later or contact info@bous.ca.",
              "Veuillez réessayer plus tard ou écrire à info@bous.ca.",
            ),
          );
          return;
        }
        throw Error("submission");
      }
      const result = await response.json();
      if (typeof result.reference !== "string" || !result.reference)
        throw Error("reference");
      setReference(result.reference);
      onComplete();
    } catch {
      setAmbiguous(true);
      setError(
        t(
          "We couldn’t verify receipt. Retry with the same details, or contact info@bous.ca.",
          "Nous n’avons pas pu vérifier la réception. Réessayez avec les mêmes détails ou écrivez à info@bous.ca.",
        ),
      );
    } finally {
      busy.current = false;
      setSending(false);
    }
  };
  if (reference)
    return (
      <section className={css.receipt} role="status">
        <h2 ref={heading} tabIndex={-1}>
          {t("Request received", "Demande reçue")}
        </h2>
        <p>
          {t("Your reference is ", "Votre numéro de référence est ")}
          <strong>{reference}</strong>.
        </p>
        <p>
          {t(
            "Our team will review your date and menu and follow up at ",
            "Notre équipe vérifiera la date et le menu, puis vous écrira à ",
          )}
          <strong>{data.email}</strong>
          {t(
            " to discuss availability and confirm the details.",
            " pour discuter de la disponibilité et confirmer les détails.",
          )}
        </p>
      </section>
    );
  const eventSummary = [
    [t("Occasion", "Occasion"), selected(data.occasion, occasions)],
    [t("Preferred dates", "Dates souhaitées"), calendarDates],
    [t("Start time", "Heure de début"), data.time],
    [t("Estimated guests", "Nombre estimé de convives"), data.guests],
    [t("Service", "Service"), selected(data.meal, meals)],
    [
      t("Menu", "Menu"),
      currentMenu
        ? currentMenu.name +
          " · " +
          money(currentMenu.price, language) +
          t(" / guest", " / pers.")
        : styles[style][language],
    ],
  ];
  return (
    <form
      onSubmit={submit}
      className={css.planner}
      onInvalidCapture={(e) => {
        const field = e.target as HTMLInputElement;
        const details = field.closest("details");
        if (details) details.open = true;
      }}
    >
      <fieldset
        className={css.formBody}
        disabled={sending || ambiguous}
        aria-label={t("Event details", "Détails de l’événement")}
      >
        <section className={css.panel}>
          <h2>{t("Your gathering", "Votre événement")}</h2>
          {options(
            "occasion",
            t("What’s the occasion?", "Quelle est l’occasion ?"),
            occasions,
            true,
          )}
          {options(
            "meal",
            t("When are you joining us?", "Pour quel service ?"),
            meals,
            true,
          )}
          <PreferredDatesCalendar
            today={today}
            selected={preferredDates}
            invalid={missingDates}
            onChange={(values) => {
              setPreferredDates(values);
              setMissingDates(false);
              setError("");
            }}
          />
          <div className={css.grid}>
            {input("time", t("Start time", "Heure de début"), "time", true)}
            <div>
              {input(
                "guests",
                t(
                  "About how many guests do you expect?",
                  "Combien de convives prévoyez-vous environ ?",
                ),
                "number",
                true,
                {
                  min: style === "sharing" ? 8 : 1,
                  max: 1000,
                  "aria-describedby": shortGroup
                    ? "guest-count-hint group-size-hint"
                    : "guest-count-hint",
                },
              )}
              <p id="guest-count-hint" className={css.fine}>
                {t(
                  "Include children. Your best estimate is enough for now.",
                  "Comptez les enfants. Une estimation suffit pour le moment.",
                )}
              </p>
            </div>
          </div>
          {shortGroup && (
            <p id="group-size-hint" className={css.error}>
              {t(
                "Sharing menus start at eight guests. You can also choose individual dining below.",
                "Les menus à partager sont offerts dès huit convives. Vous pouvez aussi choisir un menu individuel ci-dessous.",
              )}
            </p>
          )}
          <details className={css.fold}>
            <summary>
              {t(
                "Seating, children & end time",
                "Espace, enfants et heure de fin",
              )}
            </summary>
            {options("space", t("Space preference", "Espace souhaité"), spaces)}
            {data.space === "Private room" && (
              <p className={css.fine}>
                {t(
                  "The private room seats up to 10 guests and has a $1,500 minimum spend for the room.",
                  "Le salon privé accueille un maximum de 10 convives. Un minimum de consommation de 1 500 $ s’applique à la salle.",
                )}
              </p>
            )}
            {data.space === "Full restaurant buyout" && (
              <div className={css.buyoutTerms}>
                <p>
                  {t(
                    "Exclusive use of BOUS is available with the following minimum food and beverage commitments before tax and tip.",
                    "Pour réserver BOUS en exclusivité, un minimum de consommation en nourriture et en boissons s’applique, avant taxes et pourboire.",
                  )}
                </p>
                <ul>
                  <li>
                    <strong>
                      {t("Sunday to Tuesday", "Du dimanche au mardi")}
                    </strong>{" "}
                    · {t("$10,000", "10 000 $")}
                  </li>
                  <li>
                    <strong>
                      {t("Wednesday and Thursday", "Le mercredi et le jeudi")}
                    </strong>{" "}
                    · {t("$12,500", "12 500 $")}
                  </li>
                  <li>
                    <strong>
                      {t("Friday and Saturday", "Le vendredi et le samedi")}
                    </strong>{" "}
                    · {t("$15,000", "15 000 $")}
                  </li>
                </ul>
                <p>
                  {t(
                    "All food and beverage purchases are applied toward the minimum commitment. If the final food and beverage total is below the applicable minimum, the difference will be charged as a buyout fee.",
                    "Tous les achats de nourriture et de boissons comptent dans ce minimum. Si le total est inférieur au minimum applicable, la différence sera facturée à titre de frais de privatisation.",
                  )}
                </p>
              </div>
            )}
            <div className={css.grid}>
              {input(
                "children",
                t("Children in guest count", "Enfants compris dans le total"),
                "number",
                false,
                { min: 0, max: Number(data.guests) || 1000 },
              )}
              {input(
                "endTime",
                t("Preferred end time", "Heure de fin souhaitée"),
                "time",
              )}
            </div>
          </details>
        </section>
        <section className={css.panel}>
          <h2>{t("At the table", "À table")}</h2>
          <fieldset className={css.choiceGroup}>
            <legend>{t("Dining style", "Style de service")}</legend>
            <div className={css.pills}>
              {(Object.keys(styles) as Style[]).map((s) => (
                <label key={s}>
                  <input
                    type="radio"
                    name="dining-style"
                    checked={style === s}
                    onChange={() => selectStyle(s)}
                  />
                  <span>
                    {styles[s][language]}
                    {s === "sharing" && t(" · Preferred", " · Recommandé")}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <p className={css.hospitality}>
            {t(
              "We recommend family-style dining so your guests can experience Persian hospitality the way we do at home, passing dishes around the table and tasting a little of everything.",
              "Nous recommandons le menu à partager pour vivre l’hospitalité persane comme à la maison : les plats circulent à table et chacun goûte un peu de tout.",
            )}
          </p>
          {style === "undecided" ? (
            <p className={css.fine}>
              {t(
                "We’ll recommend a menu that suits your group.",
                "Nous vous proposerons un menu adapté à votre groupe.",
              )}
            </p>
          ) : (
            <fieldset className={css.choiceGroup}>
              <legend>
                {t(
                  "Choose one menu for the group",
                  "Choisissez un menu pour le groupe",
                )}{" "}
                *
              </legend>
              <div className={css.menuCards}>
                {available.map((menu) => (
                  <div className={css.menuCard} key={menu.name}>
                    <button
                      type="button"
                      className={css.viewMenu}
                      aria-label={
                        t("View full menu for ", "Voir le menu complet de ") +
                        menu.name
                      }
                      onClick={() => {
                        setDetailMenu(menu.name);
                        menuDialog.current?.showModal();
                      }}
                    >
                      <strong>{menu.name}</strong>
                      <b>
                        {money(menu.price, language)}{" "}
                        <small>{t("/ guest", "/ pers.")}</small>
                      </b>
                      <span>{menu.detail[language]}</span>
                      <span className={css.textLink}>
                        {t("View full menu", "Voir le menu complet")}
                      </span>
                    </button>
                    <label className={css.selectMenu}>
                      <input
                        type="radio"
                        name="menu"
                        required
                        checked={data.menu === menu.name}
                        onChange={() => setMenu(menu.name)}
                      />
                      {t("Choose ", "Choisir ") + menu.name}
                    </label>
                  </div>
                ))}
              </div>
              <p className={css.fine}>
                {t(
                  "Prices in CAD, before tax and service.",
                  "Prix en dollars canadiens, avant taxes et service.",
                )}
              </p>
            </fieldset>
          )}
          <dialog
            className={css.menuDialog}
            ref={menuDialog}
            aria-labelledby="menu-detail-title"
            onClose={() => setDetailMenu("")}
          >
            <div className={css.dialogHead}>
              <h2 id="menu-detail-title">{detailMenu}</h2>
              <button type="button" onClick={() => menuDialog.current?.close()}>
                {t("Close", "Fermer")}
              </button>
            </div>
            {detailMenu && (
              <MenuInclusions
                name={detailMenu}
                style={style}
                language={language}
              />
            )}
            <button
              className={css.primary}
              type="button"
              onClick={() => {
                setMenu(detailMenu);
                menuDialog.current?.close();
              }}
            >
              {t("Choose ", "Choisir ") + detailMenu}
            </button>
          </dialog>
          {(["food", "pairing"] as const).map((category) => {
            const query = filters[category].trim().toLocaleLowerCase();
            const shownExtras = choices.filter(
              (extra) =>
                extra.category === category &&
                extra[language].toLocaleLowerCase().includes(query),
            );
            const groups =
              category === "food"
                ? extraDishCourses
                    .map((course) => ({
                      name: course.label[language],
                      entries: shownExtras.filter(
                        (extra) => extra.course === course.key,
                      ),
                    }))
                    .filter((group) => group.entries.length > 0)
                : [{ name: "", entries: shownExtras }];
            return (
              <details key={category} className={css.fold}>
                <summary>
                  {category === "food"
                    ? t("Extra dishes", "Plats supplémentaires")
                    : t("Drink pairings", "Accords boissons")}
                </summary>
                {category === "food" && (
                  <p className={css.fine}>
                    {t(
                      "You can add these dishes to the menu you’ve chosen for your table.",
                      "Vous pouvez ajouter ces plats au menu que vous avez choisi pour votre table.",
                    )}
                  </p>
                )}
                <div className={css.tools}>
                  {label(
                    category === "food"
                      ? t("Filter dishes", "Filtrer les plats")
                      : t("Filter pairings", "Filtrer les accords"),
                    <input
                      type="search"
                      value={filters[category]}
                      onChange={(e) =>
                        setFilters({ ...filters, [category]: e.target.value })
                      }
                    />,
                  )}
                </div>
                <div className={css.extraList}>
                  {groups.map((group) => (
                    <div key={group.name}>
                      {group.name && (
                        <h4 className={css.extraCourse}>{group.name}</h4>
                      )}
                      <ul className={css.extras}>
                        {group.entries.map((x) => {
                          const n = quantityOf(x.en);
                          return (
                            <li key={x.en}>
                              <div>
                                <strong>{x[language]}</strong>
                                <small>
                                  {money(x.price, language)} /{" "}
                                  {x.unit[language]}
                                </small>
                              </div>
                              {n > 0 ? (
                                <div className={css.quantity}>
                                  <button
                                    type="button"
                                    aria-label={
                                      t(
                                        "Remove one ",
                                        "Retirer une unité de ",
                                      ) + x[language]
                                    }
                                    onClick={() => updateExtra(x.en, n - 1)}
                                  >
                                    −
                                  </button>
                                  <input
                                    type="number"
                                    min="0"
                                    max="999"
                                    aria-label={
                                      t("Quantity for ", "Quantité pour ") +
                                      x[language]
                                    }
                                    value={n}
                                    onFocus={(e) => e.target.select()}
                                    onChange={(e) => {
                                      if (
                                        e.target.value !== "" &&
                                        Number.isInteger(e.target.valueAsNumber)
                                      )
                                        updateExtra(
                                          x.en,
                                          Math.min(
                                            999,
                                            Math.max(0, e.target.valueAsNumber),
                                          ),
                                        );
                                    }}
                                  />
                                  <button
                                    type="button"
                                    disabled={n >= 999}
                                    aria-label={
                                      t("Add one ", "Ajouter une unité de ") +
                                      x[language]
                                    }
                                    onClick={() => updateExtra(x.en, n + 1)}
                                  >
                                    +
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  className={css.add}
                                  aria-label={
                                    t("Add ", "Ajouter ") + x[language]
                                  }
                                  onClick={() => updateExtra(x.en, 1)}
                                >
                                  {t("+ Add", "+ Ajouter")}
                                </button>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
                {!shownExtras.length && (
                  <p>
                    {t(
                      "No matches. Try a different name.",
                      "Aucun résultat. Essayez un autre nom.",
                    )}
                  </p>
                )}
              </details>
            );
          })}
          <details className={css.fold}>
            <summary>
              {t("Allergies & billing", "Allergies et facturation")}
            </summary>
            {textarea(
              "dietary",
              t(
                "Allergies and dietary needs",
                "Allergies et restrictions alimentaires",
              ),
              t(
                "Include the number of guests affected, if known.",
                "Si possible, précisez le nombre de convives concernés.",
              ),
            )}
            {options(
              "drinks",
              t("Beverage arrangements", "Service des boissons"),
              drinks,
            )}
            {options(
              "billing",
              t("Billing preference", "Préférence de facturation"),
              bills,
            )}
            {input(
              "budget",
              t(
                "Budget, per guest or total",
                "Budget, par personne ou au total",
              ),
              "text",
              false,
              { maxLength: 120 },
            )}
          </details>
          <div className={css.notes}>
            {textarea(
              "notes",
              t(
                "Notes or other requests (optional)",
                "Notes ou autres demandes (facultatif)",
              ),
              t(
                "Anything else you’d like us to know about your event?",
                "Y a-t-il autre chose à prévoir pour votre événement ?",
              ),
            )}
          </div>
        </section>
        <section className={css.panel}>
          <h2>{t("Your contact details", "Vos coordonnées")}</h2>
          <div className={css.grid}>
            {input("name", t("Full name", "Nom complet"), "text", true, {
              autoComplete: "name",
              maxLength: 100,
              pattern: ".*\\S.*",
            })}
            {input("email", t("Email", "Courriel"), "email", true, {
              autoComplete: "email",
              maxLength: 254,
            })}
            {input(
              "phone",
              t("Phone (optional)", "Téléphone (facultatif)"),
              "tel",
              false,
              { autoComplete: "tel", maxLength: 32 },
            )}
            {input(
              "company",
              t("Organization (optional)", "Organisation (facultatif)"),
              "text",
              false,
              { autoComplete: "organization", maxLength: 120 },
            )}
          </div>
        </section>
      </fieldset>
      <aside
        className={css.summary}
        aria-label={t("Your request", "Votre demande")}
      >
        <div aria-hidden="true" className={css.summaryPhoto} />
        <div className={css.summaryBody}>
          <h2>{t("Your event at BOUS", "Votre événement chez BOUS")}</h2>
          <dl>
            {eventSummary.map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>{value || "—"}</dd>
              </div>
            ))}
          </dl>
          {validItems.length > 0 && (
            <ul className={css.selectedExtras}>
              {validItems.map((x) => (
                <li key={x.name}>
                  {x.quantity} × {selected(x.name, choices)}
                </li>
              ))}
            </ul>
          )}
          <p className={css.fine}>
            {t(
              "We’ll confirm availability and details with you by email.",
              "Nous vous écrirons pour confirmer la disponibilité et les détails.",
            )}
          </p>
          {error && (
            <p className={css.error} role="alert">
              {error}
            </p>
          )}
          <button className={css.primary} disabled={sending} type="submit">
            {sending
              ? t("Sending…", "Envoi…")
              : ambiguous
                ? t("Retry submission", "Réessayer l’envoi")
                : t("Send event request", "Envoyer la demande")}
          </button>
        </div>
      </aside>
    </form>
  );
}
