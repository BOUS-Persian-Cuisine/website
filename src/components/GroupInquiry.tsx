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
import css from "@/styles/group-event.module.css";

const empty = {
  occasion: "",
  meal: "",
  date: "",
  time: "",
  alternateDate: "",
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

  const [items, setItems] = useState<Extra[]>([]);
  const [category, setCategory] = useState("pairing");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState("");
  const [ambiguous, setAmbiguous] = useState(false);
  const id = useRef("");
  const submission = useRef("");
  const busy = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const available = menuChoices(style, data.meal, data.date);
  const currentMenu = available.find((m) => m.name === data.menu);
  const choices = currentMenu?.name === "Table d’Hôte" ? lunchExtras : extras;
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
        !menuChoices(style, next.meal, next.date).some(
          (menu) => menu.name === next.menu,
        )
      )
        next.menu = "";
      return next;
    });
  };
  const selectStyle = (value: Style) => {
    onStyleChange(value);
    const menus = menuChoices(value, data.meal, data.date);
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
  const shownExtras = choices.filter(
    (extra) =>
      extra.category === category &&
      extra[language]
        .toLocaleLowerCase()
        .includes(search.trim().toLocaleLowerCase()),
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
  const parsedDate = new Date(data.date + "T12:00:00Z");
  const calendarDate = Number.isFinite(parsedDate.getTime())
    ? new Intl.DateTimeFormat(language === "fr" ? "fr-CA" : "en-CA", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      }).format(parsedDate)
    : "";
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          date: data.date,
          time: data.time,
          alternateDate: data.alternateDate,
          meal: data.meal,
          guests: Number(data.guests),
          children: Number(data.children),
          space: data.space,
          service: style,
          menu: currentMenu?.name ?? "Undecided",
          addons: items.map((x) => {
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
    [t("Date", "Date"), [calendarDate, data.time].filter(Boolean).join(" · ")],
    [t("Guests", "Convives"), data.guests],
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
          <div className={css.three}>
            {input(
              "date",
              t("Preferred date", "Date souhaitée"),
              "date",
              true,
              { min: today },
            )}
            {input("time", t("Start time", "Heure de début"), "time", true)}
            {input(
              "guests",
              t("Guests, including children", "Convives, enfants compris"),
              "number",
              true,
              {
                min: style === "sharing" ? 8 : 1,
                max: 1000,
                placeholder: t("How many?", "Combien ?"),
                "aria-describedby": shortGroup ? "group-size-hint" : undefined,
              },
            )}
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
                "Seating, children & alternate dates",
                "Espace, enfants et autres dates",
              )}
            </summary>
            {options("space", t("Space preference", "Espace souhaité"), spaces)}
            {data.space === "Private room" && (
              <p className={css.fine}>
                {t(
                  "The private room seats up to 10 guests.",
                  "Le salon privé accueille jusqu’à 10 convives.",
                )}
              </p>
            )}
            <div className={css.three}>
              {input(
                "children",
                t("Children in guest count", "Enfants compris dans le total"),
                "number",
                false,
                { min: 0, max: Number(data.guests) || 1000 },
              )}
              {input(
                "alternateDate",
                t("Alternate date", "Autre date possible"),
                "date",
                false,
                { min: today },
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
                  <span>{styles[s][language]}</span>
                </label>
              ))}
            </div>
          </fieldset>
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
                  <label key={menu.name}>
                    <input
                      name="menu"
                      type="radio"
                      required
                      checked={data.menu === menu.name}
                      onChange={() => setMenu(menu.name)}
                    />
                    <span>
                      <strong>{menu.name}</strong>
                      <b>
                        {money(menu.price, language)}{" "}
                        <small>{t("/ guest", "/ pers.")}</small>
                      </b>
                      <span>{menu.detail[language]}</span>
                    </span>
                  </label>
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
          <details className={css.fold}>
            <summary>
              {t(
                "Add dishes or drink pairings",
                "Ajouter des plats ou des accords",
              )}
              {items.length > 0 && <span> ({items.length})</span>}
            </summary>
            <div className={css.tools}>
              <div
                className={css.filters}
                role="group"
                aria-label={t("Browse extras", "Parcourir les suppléments")}
              >
                {["pairing", "food"].map((c) => (
                  <button
                    type="button"
                    key={c}
                    aria-pressed={category === c}
                    onClick={() => {
                      setCategory(c);
                      setSearch("");
                    }}
                  >
                    {c === "pairing"
                      ? t("Pairings", "Accords")
                      : t("Dishes", "Plats")}
                  </button>
                ))}
              </div>
              {label(
                t("Filter by name", "Filtrer par nom"),
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />,
              )}
            </div>
            <ul className={css.extras}>
              {shownExtras.map((x) => {
                const n = quantityOf(x.en);
                return (
                  <li key={x.en}>
                    <div>
                      <strong>{x[language]}</strong>
                      <small>
                        {money(x.price, language)} / {x.unit[language]}
                      </small>
                    </div>
                    {n > 0 ? (
                      <div className={css.quantity}>
                        <button
                          type="button"
                          aria-label={
                            t("Remove one ", "Retirer une unité de ") +
                            x[language]
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
                            t("Quantity for ", "Quantité pour ") + x[language]
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
                            t("Add one ", "Ajouter une unité de ") + x[language]
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
                        aria-label={t("Add ", "Ajouter ") + x[language]}
                        onClick={() => updateExtra(x.en, 1)}
                      >
                        {t("+ Add", "+ Ajouter")}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
            {!shownExtras.length && (
              <p>
                {t(
                  "No matches. Try a different name.",
                  "Aucun résultat. Essayez un autre nom.",
                )}
              </p>
            )}
          </details>
          <details className={css.fold}>
            <summary>
              {t(
                "Allergies, billing & special requests",
                "Allergies, facturation et demandes particulières",
              )}
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
            {textarea(
              "notes",
              t("Other requests", "Autres demandes"),
              t(
                "Accessibility, a cake, speeches or audiovisual needs…",
                "Accessibilité, gâteau, discours ou matériel audiovisuel…",
              ),
            )}
          </details>
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
          {items.length > 0 && (
            <ul className={css.selectedExtras}>
              {items.map((x) => (
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
