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
  meal: "Dinner",
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

export function GroupInquiry({ initialStyle }: { initialStyle: Style }) {
  const { language } = useLanguage();
  const t = (en: string, fr: string) => (language === "fr" ? fr : en);
  const [data, setData] = useState<Fields>({ ...empty });
  const [style, setStyle] = useState(initialStyle);
  const [step, setStep] = useState(0);
  const [items, setItems] = useState<Extra[]>([]);
  const [item, setItem] = useState("");
  const [qty, setQty] = useState("1");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState("");
  const [ambiguous, setAmbiguous] = useState(false);
  const id = useRef("");
  const submission = useRef("");
  const busy = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const currentStep = useRef(0);
  const steps = [
    t("Event", "Événement"),
    t("Menu", "Menu"),
    t("Contact", "Contact"),
    t("Review", "Révision"),
  ];
  const titles = [
    t("Tell us about your gathering", "Parlez-nous de votre événement"),
    t("Choose your menu", "Composez votre menu"),
    t("Who’s organizing the event?", "Qui organise l’événement ?"),
    t("Review your request", "Vérifiez votre demande"),
  ];
  const available = menuChoices(style, data.meal, data.date);
  const currentMenu = available.find((m) => m.name === data.menu);
  const choices = data.menu === "Table d’Hôte" ? lunchExtras : extras;
  const selected = (en: string, options: Option[]) =>
    options.find((o) => o.en === en)?.[language] || en;
  const today = montrealToday();
  useEffect(() => {
    if (step !== currentStep.current || reference) {
      heading.current?.focus();
      heading.current?.scrollIntoView({ block: "start" });
    }
    currentStep.current = step;
  }, [step, reference]);
  const change = (k: Field, value: string) => {
    setError("");
    setData((d) => ({
      ...d,
      [k]: value,
      ...((k === "meal" || k === "date") && d.menu === "Table d’Hôte"
        ? { menu: "" }
        : {}),
    }));
    if ((k === "meal" || k === "date") && data.menu === "Table d’Hôte") {
      setItems([]);
      setItem("");
    }
  };
  const direct = (s: number) => {
    setStep(s);
    setError("");
  };
  const selectStyle = (value: Style) => {
    setStyle(value);
    setData((d) => ({ ...d, menu: "" }));
    setItems([]);
    setItem("");
    setError("");
  };
  const setMenu = (value: string) => {
    change("menu", value);
    setItem("");
    if (value === "Table d’Hôte" || data.menu === "Table d’Hôte") setItems([]);
  };
  const hint = t("Optional", "Facultatif");
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
  const select = (
    k: Field,
    text: string,
    options: Option[],
    required = false,
  ) =>
    label(
      text,
      <select
        name={k}
        value={data[k]}
        required={required}
        onChange={(e) => change(k, e.target.value)}
      >
        {!data[k] && <option value="">{t("Please select", "Choisir")}</option>}
        {options.map((o) => (
          <option value={o.en} key={o.en}>
            {o[language]}
          </option>
        ))}
      </select>,
      required,
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
  const addItem = () => {
    const quantity = Number(qty);
    if (
      !item ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 999
    ) {
      setError(
        t(
          "Choose an extra and a quantity from 1 to 999.",
          "Choisissez un supplément et une quantité de 1 à 999.",
        ),
      );
      return;
    }
    const previous = items.find((x) => x.name === item);
    if (previous && previous.quantity + quantity > 999) {
      setError(
        t("The maximum quantity is 999.", "La quantité maximale est de 999."),
      );
      return;
    }
    setItems(
      previous
        ? items.map((x) =>
            x.name === item ? { ...x, quantity: x.quantity + quantity } : x,
          )
        : [...items, { name: item, quantity }],
    );
    setItem("");
    setQty("1");
    setError("");
  };
  const validateMenu = () => {
    if (style !== "undecided" && !currentMenu) {
      setError(
        t(
          "Choose a menu or select “Help me choose”.",
          "Sélectionnez un menu ou « Aidez-moi à choisir ».",
        ),
      );
      return false;
    }
    if (style === "sharing" && Number(data.guests) < 8) {
      setError(
        t(
          "Sharing menus are for eight guests or more. Choose individual dining or ask us for guidance.",
          "Les menus à partager sont offerts aux groupes de huit ou plus. Choisissez un repas individuel ou demandez conseil.",
        ),
      );
      return false;
    }
    if (item) {
      setError(
        t(
          "Add your selected extra or clear the selection to continue.",
          "Ajoutez le supplément choisi ou effacez votre sélection pour continuer.",
        ),
      );
      return false;
    }
    return true;
  };
  const sections = [
    {
      title: steps[0],
      rows: [
        [t("Occasion", "Occasion"), selected(data.occasion, occasions)],
        [
          t("Date and time", "Date et heure"),
          [
            data.date,
            data.time,
            data.endTime && t("until ", "jusqu’à ") + data.endTime,
          ]
            .filter(Boolean)
            .join(" · "),
        ],
        [t("Alternate date", "Autre date"), data.alternateDate],
        [
          t("Guests", "Convives"),
          data.guests +
            (Number(data.children) > 0
              ? t(", including ", ", dont ") +
                data.children +
                t(" children", " enfants")
              : ""),
        ],
        [t("Service", "Service"), selected(data.meal, meals)],
        [t("Space", "Espace"), selected(data.space, spaces)],
      ],
    },
    {
      title: steps[1],
      rows: [
        [t("Dining style", "Style de service"), styles[style][language]],
        [
          t("Menu", "Menu"),
          currentMenu
            ? currentMenu.name +
              " · " +
              money(currentMenu.price, language) +
              t(" per guest", " par personne")
            : styles.undecided[language],
        ],
        [
          t("Extras", "Suppléments"),
          items
            .map((x) => {
              const extra = choices.find((o) => o.en === x.name)!;
              return (
                x.quantity +
                " × " +
                extra[language] +
                " (" +
                money(extra.price, language) +
                " / " +
                extra.unit[language] +
                ")"
              );
            })
            .join(", ") || t("None selected", "Aucun"),
        ],
        [t("Beverages", "Boissons"), selected(data.drinks, drinks)],
        [t("Billing", "Facturation"), selected(data.billing, bills)],
        [t("Budget", "Budget"), data.budget],
        [t("Dietary needs", "Besoins alimentaires"), data.dietary],
        [t("Other requests", "Autres demandes"), data.notes],
      ],
    },
    {
      title: steps[2],
      rows: [
        [t("Organizer", "Responsable"), data.name],
        [t("Email", "Courriel"), data.email],
        [t("Phone", "Téléphone"), data.phone],
        [t("Organization", "Organisation"), data.company],
      ],
    },
  ];
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (step === 1 && !validateMenu()) return;
    if (step < 3) {
      direct(step + 1);
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
  return (
    <>
      <ol
        className={css.progress}
        aria-label={t("Request progress", "Progression de la demande")}
      >
        {steps.map((s, i) => (
          <li
            key={i}
            aria-current={step === i ? "step" : undefined}
            className={i <= step ? css.reached : ""}
          >
            <span>{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
      <form onSubmit={submit} className={css.form}>
        <h2 ref={heading} tabIndex={-1}>
          {titles[step]}
        </h2>
        {step < 3 && (
          <p className={css.fine}>
            {t(
              "Fields marked * are required.",
              "Les champs marqués d’un astérisque (*) sont obligatoires.",
            )}
          </p>
        )}
        {step === 0 && (
          <div className={css.grid}>
            {select("occasion", t("Occasion", "Occasion"), occasions, true)}
            {select(
              "meal",
              t("Meal or reception", "Repas ou réception"),
              meals,
              true,
            )}
            {input(
              "date",
              t("Preferred date", "Date souhaitée"),
              "date",
              true,
              { min: today },
            )}
            {input(
              "time",
              t("Preferred start time", "Heure de début souhaitée"),
              "time",
              true,
            )}
            {input(
              "guests",
              t(
                "Estimated guests, including children",
                "Nombre de convives, enfants compris",
              ),
              "number",
              true,
              { min: 1, max: 1000, step: 1 },
            )}
            {input(
              "children",
              t("Children in the group", "Enfants dans le groupe"),
              "number",
              false,
              { min: 0, max: Number(data.guests) || 1000, step: 1 },
            )}
            <div>
              {select(
                "space",
                t("Space preference", "Espace souhaité"),
                spaces,
              )}
              {data.space === "Private room" && (
                <p className={css.fine}>
                  {t(
                    "The private room seats up to 10. For larger groups, we can discuss the dining room or a buyout.",
                    "Le salon privé accueille jusqu’à 10 personnes. Pour un groupe plus nombreux, nous pouvons vous proposer la salle à manger ou une privatisation.",
                  )}
                </p>
              )}
            </div>
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
        )}
        {step === 1 && (
          <>
            <fieldset>
              <legend>{t("Dining style", "Style de service")} *</legend>
              <div className={css.styleOptions}>
                {(Object.keys(styles) as Style[]).map((s) => (
                  <label key={s}>
                    <input
                      type="radio"
                      name="service"
                      checked={style === s}
                      onChange={() => selectStyle(s)}
                    />
                    {styles[s][language]}
                  </label>
                ))}
              </div>
            </fieldset>
            {style !== "undecided" && (
              <fieldset>
                <legend>
                  {t("One menu for your group", "Un menu pour votre groupe")} *
                </legend>
                <div className={css.menuOptions}>
                  {available.map((m) => (
                    <label key={m.name}>
                      <input
                        type="radio"
                        required
                        checked={data.menu === m.name}
                        onChange={() => setMenu(m.name)}
                        name="menu"
                      />
                      <span>
                        <strong>
                          {m.name} · {money(m.price, language)}
                        </strong>
                        <small>{m.detail[language]}</small>
                      </span>
                    </label>
                  ))}
                </div>
                <p className={css.fine}>
                  {t(
                    "Per guest, before tax and service. BOUS will confirm availability and any supplements.",
                    "Par personne, avant taxes et service. BOUS confirmera la disponibilité et les suppléments.",
                  )}
                </p>
              </fieldset>
            )}
            <fieldset>
              <legend>
                {t(
                  "Add plates or pairings",
                  "Ajouter des plats ou des accords",
                )}{" "}
                <small>({hint})</small>
              </legend>
              <div className={css.extraControls}>
                {label(
                  t("Extra", "Supplément"),
                  <select
                    value={item}
                    onChange={(e) => {
                      setItem(e.target.value);
                      setError("");
                    }}
                  >
                    <option value="">
                      {t("Select an extra", "Choisir un supplément")}
                    </option>
                    {["pairing", "food"].map((c) => (
                      <optgroup
                        key={c}
                        label={
                          c === "pairing"
                            ? t("Drink pairings", "Accords boissons")
                            : t("Additional plates", "Plats supplémentaires")
                        }
                      >
                        {choices
                          .filter((x) => x.category === c)
                          .map((x) => (
                            <option key={x.en} value={x.en}>
                              {x[language]} · {money(x.price, language)} /{" "}
                              {x.unit[language]}
                            </option>
                          ))}
                      </optgroup>
                    ))}
                  </select>,
                )}
                {label(
                  t("Quantity", "Quantité"),
                  <input
                    type="number"
                    min={1}
                    max={999}
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  />,
                )}
                <button
                  type="button"
                  className={css.secondary}
                  onClick={addItem}
                >
                  {t("Add", "Ajouter")}
                </button>
              </div>
              {items.length > 0 && (
                <ul className={css.added}>
                  {items.map((x) => (
                    <li key={x.name}>
                      <span>
                        {x.quantity} × {selected(x.name, choices)}
                      </span>
                      <button
                        type="button"
                        aria-label={
                          t("Remove ", "Retirer ") + selected(x.name, choices)
                        }
                        onClick={() =>
                          setItems(items.filter((i) => i.name !== x.name))
                        }
                      >
                        {t("Remove", "Retirer")}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </fieldset>
            <div className={css.grid}>
              {select(
                "drinks",
                t("Beverage arrangements", "Service des boissons"),
                drinks,
              )}
              {select(
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
                {
                  maxLength: 120,
                  placeholder: t(
                    "e.g. $120 per guest",
                    "p. ex. 120 $ par personne",
                  ),
                },
              )}
            </div>
            {textarea(
              "dietary",
              t(
                "Allergies and dietary needs",
                "Allergies et restrictions alimentaires",
              ),
              t(
                "Include how many guests are affected, if known.",
                "Si possible, précisez le nombre de personnes concernées.",
              ),
            )}
            {textarea(
              "notes",
              t(
                "Anything else we should plan for?",
                "D’autres détails à prévoir ?",
              ),
              t(
                "A long table, accessibility, a cake, children’s ages, speeches or audiovisual needs…",
                "Une longue table, l’accessibilité, un gâteau, l’âge des enfants, un discours ou du matériel audiovisuel…",
              ),
            )}
          </>
        )}
        {step === 2 && (
          <div className={css.grid}>
            {input("name", t("Full name", "Nom complet"), "text", true, {
              autoComplete: "name",
              maxLength: 100,
              pattern: ".*\\S.*",
            })}
            {input(
              "email",
              t("Email address", "Adresse courriel"),
              "email",
              true,
              { autoComplete: "email", maxLength: 254 },
            )}
            {input("phone", t("Phone number", "Téléphone"), "tel", false, {
              autoComplete: "tel",
              maxLength: 32,
            })}
            {input(
              "company",
              t("Company or organization", "Entreprise ou organisation"),
              "text",
              false,
              { autoComplete: "organization", maxLength: 120 },
            )}
          </div>
        )}
        {step === 3 && (
          <>
            {sections.map((section, i) => (
              <section className={css.review} key={i}>
                <div>
                  <h3>{section.title}</h3>
                  <button
                    type="button"
                    disabled={sending || ambiguous}
                    onClick={() => direct(i)}
                  >
                    {t("Edit", "Modifier")}
                  </button>
                </div>
                <dl>
                  {section.rows
                    .filter((r) => r[1])
                    .map(([key, value]) => (
                      <div key={key}>
                        <dt>{key}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                </dl>
              </section>
            ))}
            <p className={css.notice}>
              {t(
                "Submitting sends your request to BOUS for review. Your event is booked once our team contacts you and confirms the arrangements.",
                "Votre demande sera transmise à BOUS pour vérification. Votre événement sera réservé une fois que notre équipe vous aura contacté et aura confirmé les modalités.",
              )}
            </p>
          </>
        )}
        {error && (
          <p className={css.error} role="alert">
            {error}
          </p>
        )}
        <div className={css.formActions}>
          {step > 0 && (
            <button
              className={css.textLink}
              type="button"
              disabled={sending || ambiguous}
              onClick={() => direct(step - 1)}
            >
              {t("Back", "Retour")}
            </button>
          )}
          <button className={css.primary} type="submit" disabled={sending}>
            {step < 3
              ? t("Continue", "Continuer")
              : sending
                ? t("Sending…", "Envoi…")
                : t("Submit event request", "Envoyer la demande")}
          </button>
        </div>
      </form>
    </>
  );
}
