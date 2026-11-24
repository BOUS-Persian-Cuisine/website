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
  fullBuyout,
  lunchExtras,
  meals,
  allowsWeekdayLunch,
  isWeekday,
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
  billing: "",
  billingOther: "",
  billingNotes: "",
  drinks: "",
  drinksOther: "",
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
  const [lunchRemoved, setLunchRemoved] = useState(false);
  const [detailMenu, setDetailMenu] = useState("");
  const menuDialog = useRef<HTMLDialogElement>(null);
  const seating = useRef<HTMLDetailsElement>(null);
  const [items, setItems] = useState<Extra[]>([]);
  const [pairingMode, setPairingMode] = useState<"quantity" | "group">(
    "quantity",
  );
  const [groupPairing, setGroupPairing] = useState("");
  const [canapeNotes, setCanapeNotes] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState("");
  const [ambiguous, setAmbiguous] = useState(false);
  const id = useRef("");
  const submission = useRef("");
  const busy = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const isReception = data.meal === "Reception";
  const space = isReception ? fullBuyout.en : data.space;
  const hasCanapes = isReception && canapeNotes !== null;
  const available = menuChoices(style, data.meal, preferredDates);
  const currentMenu = available.find((m) => m.name === data.menu);
  const choices = currentMenu?.name === "Table d’Hôte" ? lunchExtras : extras;
  const groupSize = (name: string) =>
    Math.max(
      0,
      Number(data.guests) -
        (name === "Sharbat Pairing" ? 0 : Number(data.children)),
    );
  const groupChoice =
    pairingMode === "group" &&
    groupPairing &&
    (data.guests === "" || groupSize(groupPairing) > 0)
      ? groupPairing
      : "";
  const validItems = items.filter((item) =>
    choices.some(
      (extra) =>
        extra.en === item.name &&
        (extra.category === "food" || pairingMode === "quantity"),
    ),
  );
  if (groupChoice)
    validItems.push({ name: groupChoice, quantity: groupSize(groupChoice) });
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
    if (k === "meal" || (k === "menu" && value)) setLunchRemoved(false);
    if (k === "meal" && value !== "Reception") setCanapeNotes(null);
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
        name={k}
        rows={3}
        maxLength={1150}
        value={data[k]}
        placeholder={placeholder}
        onChange={(e) => change(k, e.target.value)}
      />,
    );
  const otherDetails = (
    key: "drinksOther" | "billingOther",
    title: string,
    maxLength: number,
  ) =>
    label(
      title,
      <textarea
        name={key}
        rows={2}
        required
        maxLength={maxLength}
        value={data[key]}
        ref={(el) => {
          el?.setCustomValidity(
            data[key] && !data[key].trim()
              ? t(
                  "Please describe your preference.",
                  "Veuillez préciser votre préférence.",
                )
              : "",
          );
        }}
        onChange={(e) => change(key, e.target.value)}
      />,
      true,
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
  const overRoomCapacity = space === "Private room" && Number(data.guests) > 10;
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
  const lunchWeekendDates =
    currentMenu?.name === "Table d’Hôte"
      ? preferredDates.filter((date) => !isWeekday(date))
      : [];
  const lunchDateNotice = lunchWeekendDates.length
    ? t(
        "A different menu is needed for these weekend dates",
        "Un autre menu sera nécessaire pour ces dates de fin de semaine",
      ) +
      " (" +
      lunchWeekendDates
        .map((date) => dateFormatter.format(new Date(date + "T12:00:00Z")))
        .join(", ") +
      ")."
    : "";
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const field = e.currentTarget.querySelector<
      HTMLInputElement | HTMLTextAreaElement
    >("input:invalid, textarea:invalid");
    const calendar = document.getElementById("event-preferred-dates");
    setMissingDates(!preferredDates.length);
    if (
      !preferredDates.length &&
      calendar &&
      (!field ||
        calendar.compareDocumentPosition(field) &
          Node.DOCUMENT_POSITION_FOLLOWING)
    ) {
      calendar.focus();
      return;
    }
    if (field) {
      const fold = field.closest("details");
      if (fold) fold.open = true;
      field.reportValidity();
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
          space,
          service: style,
          menu: currentMenu?.name ?? "Undecided",
          addons: [
            ...(hasCanapes
              ? [
                  "Passed canapés" +
                    (canapeNotes.trim() ? " — " + canapeNotes.trim() : ""),
                ]
              : []),
            ...validItems.map((x) => {
              const extra = choices.find((o) => o.en === x.name)!;
              return (
                x.quantity +
                " × " +
                (extra.category === "food" ? extra[language] : x.name) +
                (groupChoice === x.name ? " — whole group" : "") +
                " ($" +
                extra.price +
                " / " +
                extra.unit.en +
                ")"
              );
            }),
          ],
          dietary: data.dietary.trim(),
          notes: [
            data.endTime && "End time: " + data.endTime,
            data.drinks &&
              "Beverages: " +
                (data.drinks === "Other"
                  ? "Other: " + data.drinksOther.trim()
                  : data.drinks),
            data.notes.trim(),
          ]
            .filter(Boolean)
            .join("\n"),
          name: data.name.trim(),
          email: data.email.trim(),
          phone: data.phone.trim(),
          company: data.company.trim(),
          billingNotes: data.billingNotes.trim() || undefined,
          billing:
            data.billing === "Other"
              ? "Other: " + data.billingOther.trim()
              : data.billing,
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
        <h1 ref={heading} tabIndex={-1}>
          {t("Request received", "Demande reçue")}
        </h1>
        <p>
          {t("Your reference is ", "Votre numéro de référence est ")}
          <strong>{reference}</strong>.
        </p>
        <p>
          {t(
            "We’ll email a copy of your request to ",
            "Nous enverrons une copie de votre demande à ",
          )}
          <strong>{data.email}</strong>
          {t(
            " from info@bous.ca. Our events team will follow up to confirm availability and discuss the details with you.",
            " depuis info@bous.ca. Notre équipe vous contactera pour confirmer les disponibilités et discuter des détails avec vous.",
          )}
        </p>
        <dl className={css.receiptFacts}>
          <div>
            <dt>{t("Preferred dates", "Dates souhaitées")}</dt>
            <dd>{calendarDates}</dd>
          </div>
          <div>
            <dt>{t("Start time", "Heure de début")}</dt>
            <dd>{data.time}</dd>
          </div>
          <div>
            <dt>{t("Estimated guests", "Nombre estimé de convives")}</dt>
            <dd>{data.guests}</dd>
          </div>
          <div>
            <dt>{t("Menu", "Menu")}</dt>
            <dd>
              {currentMenu?.name ||
                t("To discuss with BOUS", "À déterminer avec BOUS")}
            </dd>
          </div>
        </dl>
        {lunchDateNotice && <p>{lunchDateNotice}</p>}
        <a
          className={css.textLink}
          href={
            "mailto:info@bous.ca?subject=" +
            encodeURIComponent("BOUS · " + reference)
          }
        >
          {t(
            "Contact BOUS about this request",
            "Écrire à BOUS au sujet de cette demande",
          )}
        </a>
      </section>
    );
  const eventSummary: [string, ReactNode][] = [
    [t("Occasion", "Occasion"), selected(data.occasion, occasions)],
    [
      t("Preferred dates", "Dates souhaitées"),
      preferredDates.length > 3 ? (
        <details className={css.summaryDates}>
          <summary>
            {preferredDates.length} {t("dates selected", "dates choisies")}
          </summary>
          {calendarDates}
        </details>
      ) : (
        calendarDates
      ),
    ],
    [t("Start time", "Heure de début"), data.time],
    [t("Estimated guests", "Nombre estimé de convives"), data.guests],
    [t("Service", "Service"), selected(data.meal, meals)],
    ...(space !== "No preference"
      ? [[t("Space", "Espace"), selected(space, spaces)] as [string, string]]
      : []),
    [
      t("Menu", "Menu"),
      currentMenu
        ? currentMenu.name +
          " · " +
          money(currentMenu.price, language) +
          t(" / guest", " / pers.")
        : style === "undecided"
          ? t("To discuss with BOUS", "À déterminer avec BOUS")
          : styles[style][language],
    ],
    ...(hasCanapes
      ? [
          [t("Canapés", "Canapés"), t("Requested", "Demandés")] as [
            string,
            string,
          ],
        ]
      : []),
  ];
  return (
    <form onSubmit={submit} noValidate className={css.planner}>
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
              if (data.menu === "Table d’Hôte" && !allowsWeekdayLunch(values)) {
                change("menu", "");
                setLunchRemoved(true);
              } else setLunchRemoved(false);
              setMissingDates(false);
              setError("");
            }}
          />
          {lunchDateNotice && (
            <p className={css.availability} role="status">
              {lunchDateNotice}
            </p>
          )}
          {lunchRemoved && (
            <p className={css.availability} role="status">
              {t(
                "Table d’Hôte is served on weekdays. Choose another menu for your weekend lunch.",
                "La table d’hôte est servie en semaine. Choisissez un autre menu pour votre dîner de fin de semaine.",
              )}
            </p>
          )}
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
                  max: space === "Private room" ? 10 : 1000,
                  "aria-invalid": shortGroup || overRoomCapacity || undefined,
                  "aria-describedby": shortGroup
                    ? "guest-count-hint group-size-hint"
                    : overRoomCapacity
                      ? "guest-count-hint room-capacity-hint"
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
          {overRoomCapacity && (
            <p className={css.error} id="room-capacity-hint">
              {t(
                "The private room seats up to 10 guests. ",
                "Le salon privé accueille jusqu’à 10 convives. ",
              )}
              <button
                type="button"
                className={css.textLink}
                onClick={() => {
                  if (!seating.current) return;
                  seating.current.open = true;
                  seating.current
                    .querySelector<HTMLInputElement>(
                      'input[name="space"]:checked',
                    )
                    ?.focus();
                }}
              >
                {t("Choose another space", "Choisir un autre espace")}
              </button>
            </p>
          )}
          <details
            ref={seating}
            key={isReception ? "reception" : "seating"}
            className={css.fold}
            open={isReception || undefined}
          >
            <summary>
              {t(
                "Seating, children & end time",
                "Espace, enfants et heure de fin",
              )}
            </summary>
            {isReception ? (
              <p className={css.requiredSpace}>
                <strong>{fullBuyout[language]}</strong>{" "}
                {t(
                  "Required for receptions.",
                  "Obligatoire pour les réceptions.",
                )}
              </p>
            ) : (
              options("space", t("Space preference", "Espace souhaité"), spaces)
            )}
            {space === "Private room" && (
              <p className={css.fine}>
                {t(
                  "The private room seats up to 10 guests and has a $1,500 minimum spend for the room.",
                  "Le salon privé accueille un maximum de 10 convives. Un minimum de consommation de 1 500 $ s’applique à la salle.",
                )}
              </p>
            )}
            {space === fullBuyout.en && (
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
        <section className={css.panel} aria-labelledby="event-table">
          <h2 id="event-table" tabIndex={-1}>
            {t("At the table", "À table")}
          </h2>
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
                      aria-haspopup="dialog"
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
          {isReception && (
            <div className={css.canapes}>
              <label>
                <input
                  type="checkbox"
                  checked={hasCanapes}
                  onChange={(e) => setCanapeNotes(e.target.checked ? "" : null)}
                />
                {t(
                  "Add passed canapés",
                  "Ajouter des canapés servis sur plateau",
                )}
              </label>
              {hasCanapes && (
                <>
                  <p className={css.fine}>
                    {t(
                      "Our team will help you choose bites for your reception, such as kuku sabzi with tomato or saffron chicken kabab.",
                      "Notre équipe vous aidera à choisir les bouchées pour votre réception, comme le kuku sabzi à la tomate ou le kabab de poulet au safran.",
                    )}
                  </p>
                  {label(
                    t(
                      "Canapé preferences (optional)",
                      "Préférences pour les canapés (facultatif)",
                    ),
                    <textarea
                      rows={2}
                      maxLength={140}
                      value={canapeNotes}
                      onChange={(e) => setCanapeNotes(e.target.value)}
                    />,
                  )}
                </>
              )}
            </div>
          )}
          {(["food", "pairing"] as const).map((category) => {
            const shownExtras = choices.filter(
              (extra) => extra.category === category,
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
                  {validItems.some((item) =>
                    choices.some(
                      (choice) =>
                        choice.category === category && choice.en === item.name,
                    ),
                  ) && (
                    <span className={css.foldSelected}>
                      {t("Added", "Ajouté")}
                    </span>
                  )}
                </summary>
                {category === "food" && (
                  <p className={css.fine}>
                    {t(
                      "You can add these dishes to the menu you’ve chosen for your table.",
                      "Vous pouvez ajouter ces plats au menu que vous avez choisi pour votre table.",
                    )}
                  </p>
                )}
                {category === "pairing" && (
                  <fieldset className={css.choiceGroup}>
                    <legend>
                      {t(
                        "How would you like to add pairings?",
                        "Comment souhaitez-vous ajouter les accords ?",
                      )}
                    </legend>
                    <div className={css.pills}>
                      {(["quantity", "group"] as const).map((mode) => (
                        <label key={mode}>
                          <input
                            type="radio"
                            name="pairing-mode"
                            checked={pairingMode === mode}
                            onChange={() => setPairingMode(mode)}
                          />
                          <span>
                            {mode === "group"
                              ? t(
                                  "One pairing for the whole group",
                                  "Un accord pour tout le groupe",
                                )
                              : t("Choose quantities", "Choisir les quantités")}
                          </span>
                        </label>
                      ))}
                    </div>
                    {pairingMode === "group" && (
                      <p className={css.fine}>
                        {t(
                          "Choose one pairing. Quantities follow your guest count. Alcoholic pairings count adults only.",
                          "Choisissez un accord. La quantité suit le nombre de convives. Les accords alcoolisés sont comptés pour les adultes seulement.",
                        )}
                      </p>
                    )}
                  </fieldset>
                )}
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
                                <small className={css.dishDescription}>
                                  {x.description[language]}
                                </small>
                                <small>
                                  {money(x.price, language)} /{" "}
                                  {x.unit[language]}
                                </small>
                              </div>
                              {category === "pairing" &&
                              pairingMode === "group" ? (
                                <button
                                  type="button"
                                  className={css.add}
                                  aria-pressed={groupChoice === x.en}
                                  aria-label={
                                    t(
                                      "Select for the whole group: ",
                                      "Choisir pour tout le groupe : ",
                                    ) + x[language]
                                  }
                                  disabled={
                                    Boolean(data.guests) &&
                                    groupSize(x.en) === 0
                                  }
                                  onClick={() =>
                                    setGroupPairing(
                                      groupChoice === x.en ? "" : x.en,
                                    )
                                  }
                                >
                                  {groupChoice === x.en
                                    ? t("Selected", "Choisi")
                                    : t("Select", "Choisir")}
                                </button>
                              ) : n > 0 ? (
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
              </details>
            );
          })}
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
          </div>
        </section>
        <section className={css.panel} aria-labelledby="event-billing">
          <h2 id="event-billing" tabIndex={-1}>
            {t("Billing", "Facturation")}
          </h2>
          {options(
            "billing",
            t("Billing preference", "Préférence de facturation"),
            bills,
          )}
          {data.billing === "Other" &&
            otherDetails(
              "billingOther",
              t(
                "Describe your billing preference",
                "Précisez votre préférence de facturation",
              ),
              174,
            )}
          {options(
            "drinks",
            t("Beverage arrangements", "Service des boissons"),
            drinks,
          )}
          {data.drinks === "Other" &&
            otherDetails(
              "drinksOther",
              t(
                "Describe your beverage arrangements",
                "Précisez le service des boissons souhaité",
              ),
              1150,
            )}
          <div className={css.notes}>
            {textarea(
              "billingNotes",
              t(
                "Notes or other requests (optional)",
                "Notes ou autres demandes (facultatif)",
              ),
              t(
                "Anything else we should know about billing?",
                "Avez-vous d’autres précisions concernant la facturation ?",
              ),
            )}
          </div>
        </section>
        <section className={css.panel}>
          <h2 id="event-contact" tabIndex={-1}>
            {t("Your contact details", "Vos coordonnées")}
          </h2>
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
        <section className={css.bookingTerms} aria-labelledby="booking-terms">
          <h2 id="booking-terms">
            {t("Terms and conditions", "Conditions de réservation")}
          </h2>
          <p>
            <strong>
              {t(
                "Reservations for 10 or more.",
                "Réservations de 10 personnes ou plus.",
              )}
            </strong>{" "}
            {t(
              "A credit card is required to confirm your reservation.",
              "Une carte de crédit est requise pour confirmer votre réservation.",
            )}
          </p>
          <p>
            <strong>
              {t("Final guest count.", "Nombre final de convives.")}
            </strong>{" "}
            {t(
              "Please confirm your final guest count at least two business days before your event, excluding weekends. If we do not receive your final count by then, the number in your original contract becomes the guaranteed count. You will be billed for the guaranteed number of guests or the number who attend, whichever is greater.",
              "Veuillez confirmer le nombre final de convives au moins deux jours ouvrables avant votre événement, sans compter les fins de semaine. Sans confirmation de votre part dans ce délai, le nombre prévu au contrat initial devient le nombre garanti. Votre facture sera calculée selon le nombre garanti ou le nombre de convives présents, selon le nombre le plus élevé.",
            )}
          </p>
          <p>
            <strong>
              {t("Changes and cancellations.", "Modifications et annulations.")}
            </strong>{" "}
            {t(
              "If you need to cancel or your guest count changes, please contact BOUS as soon as possible. Changes or cancellations with less than 48 hours’ notice carry a $25 per-person fee.",
              "Si vous devez annuler ou si le nombre de convives change, veuillez en informer BOUS dès que possible. Toute modification ou annulation à moins de 48 heures de l’événement entraîne des frais de 25 $ par personne.",
            )}
          </p>
          <p>
            <strong>{t("Food allergies.", "Allergies alimentaires.")}</strong>{" "}
            {t(
              "Please let us know about any food allergies at least 48 hours before your event. With less notice, we can’t guarantee that our kitchen can accommodate your request.",
              "Veuillez nous signaler toute allergie alimentaire au moins 48 heures avant votre événement. Avec un préavis plus court, nous ne pouvons pas garantir que notre équipe pourra adapter le menu.",
            )}
          </p>
        </section>
      </fieldset>
      <aside
        className={css.summary}
        aria-label={t("Your request", "Votre demande")}
      >
        <div aria-hidden="true" className={css.summaryPhoto} />
        <div className={css.summaryBody}>
          <h2 id="event-summary" tabIndex={-1}>
            {t("Your event at BOUS", "Votre événement chez BOUS")}
          </h2>
          <div className={css.summaryScroll}>
            <dl>
              {eventSummary.map(
                ([key, value]) =>
                  value && (
                    <div key={key}>
                      <dt>{key}</dt>
                      <dd>{value}</dd>
                    </div>
                  ),
              )}
            </dl>
            {lunchDateNotice && (
              <p className={css.availability}>{lunchDateNotice}</p>
            )}
            {validItems.length > 0 && (
              <ul className={css.selectedExtras}>
                {validItems.map((x) => (
                  <li key={x.name}>
                    {x.quantity > 0 && x.quantity + " × "}
                    {selected(x.name, choices)}
                    {x.name === groupChoice &&
                      t(" · Whole group", " · Tout le groupe")}
                  </li>
                ))}
              </ul>
            )}
          </div>
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
