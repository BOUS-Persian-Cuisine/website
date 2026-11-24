import { useRef, useState, type KeyboardEvent } from "react";
import { useLanguage } from "@/context/LanguageContext";
import css from "@/styles/group-event.module.css";

const selectionLimit = 31;
const dayKey = (date: Date) => date.toISOString().slice(0, 10);
const parseDay = (key: string) => new Date(key + "T12:00:00Z");

type Props = {
  today: string;
  selected: string[];
  onChange: (dates: string[]) => void;
  invalid: boolean;
};

export function PreferredDatesCalendar({
  today,
  selected,
  onChange,
  invalid,
}: Props) {
  const { language } = useLanguage();
  const fr = language === "fr";
  const locale = fr ? "fr-CA" : "en-CA";
  const [activeDay, setActiveDay] = useState(selected[0] || today);
  const calendar = useRef<HTMLFieldSetElement>(null);
  const active = parseDay(activeDay);
  const year = active.getUTCFullYear();
  const month = active.getUTCMonth();
  const at = (monthOffset: number, day: number) =>
    new Date(Date.UTC(year, month + monthOffset, day, 12));
  const first = at(0, 1);
  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(first);
  const fullDate = new Intl.DateTimeFormat(locale, {
    dateStyle: "full",
    timeZone: "UTC",
  });
  const shortDate = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
  const daysInMonth = at(1, 0).getUTCDate();
  const atLimit = selected.length >= selectionLimit;
  function toggle(key: string) {
    if (selected.includes(key)) onChange(selected.filter((day) => day !== key));
    else if (!atLimit && key >= today) onChange([...selected, key]);
  }
  function moveTo(date: Date, focus = false) {
    const key = dayKey(date) < today ? today : dayKey(date);
    setActiveDay(key);
    if (focus)
      requestAnimationFrame(() =>
        calendar.current
          ?.querySelector<HTMLButtonElement>('[data-day="' + key + '"]')
          ?.focus(),
      );
  }
  function navigateDay(event: KeyboardEvent<HTMLButtonElement>, date: Date) {
    if (event.key === "PageUp" || event.key === "PageDown") {
      event.preventDefault();
      const offset = event.key === "PageUp" ? -1 : 1;
      moveTo(
        at(offset, Math.min(date.getUTCDate(), at(offset + 1, 0).getUTCDate())),
        true,
      );
      return;
    }
    const weekday = date.getUTCDay();
    const offsets: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
      Home: -weekday,
      End: 6 - weekday,
    };
    if (!(event.key in offsets)) return;
    event.preventDefault();
    moveTo(at(0, date.getUTCDate() + offsets[event.key]), true);
  }
  return (
    <fieldset
      className={css.choiceGroup}
      ref={calendar}
      id="event-preferred-dates"
      tabIndex={-1}
      aria-describedby={
        invalid ? "date-instructions date-error" : "date-instructions"
      }
      aria-invalid={invalid || undefined}
    >
      <legend>{fr ? "Dates souhaitées" : "Preferred dates"} *</legend>
      <p id="date-instructions" className={css.fine}>
        {fr
          ? "Choisissez toutes les dates qui vous conviennent. Appuyez de nouveau sur une date pour la retirer."
          : "Select all the dates that work for you. Select a date again to remove it."}
        <span className={css.srOnly}>
          {fr
            ? " Utilisez les flèches pour parcourir les dates."
            : " Use the arrow keys to move between dates."}
        </span>
      </p>
      {invalid && (
        <p id="date-error" className={css.error} role="alert">
          {fr
            ? "Choisissez au moins une date."
            : "Select at least one preferred date."}
        </p>
      )}
      <div className={css.calendar}>
        <div className={css.monthHeader}>
          <button
            type="button"
            disabled={today.slice(0, 7) === activeDay.slice(0, 7)}
            aria-label={fr ? "Mois précédent" : "Previous month"}
            onClick={() => moveTo(at(-1, 1))}
          >
            ‹
          </button>
          <strong aria-live="polite">{monthLabel}</strong>
          <button
            type="button"
            aria-label={fr ? "Mois suivant" : "Next month"}
            onClick={() => moveTo(at(1, 1))}
          >
            ›
          </button>
        </div>
        <div className={css.dayGrid} role="group" aria-label={monthLabel}>
          {(fr
            ? ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."]
            : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
          ).map((day) => (
            <span aria-hidden="true" key={day}>
              {day}
            </span>
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const date = at(0, i + 1),
              key = dayKey(date),
              chosen = selected.includes(key);
            return (
              <button
                key={key}
                type="button"
                data-day={key}
                className={css.day}
                style={
                  i === 0
                    ? { gridColumnStart: first.getUTCDay() + 1 }
                    : undefined
                }
                disabled={key < today}
                aria-disabled={key < today || (atLimit && !chosen)}
                aria-current={key === today ? "date" : undefined}
                aria-pressed={chosen}
                aria-label={fullDate.format(date)}
                tabIndex={key === activeDay ? 0 : -1}
                onFocus={() => setActiveDay(key)}
                onClick={() => toggle(key)}
                onKeyDown={(event) => navigateDay(event, date)}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>
      {selected.length > 0 && (
        <ul
          className={css.dateChips}
          aria-label={fr ? "Dates choisies" : "Selected dates"}
        >
          {selected.map((key) => (
            <li key={key}>
              <button
                type="button"
                onClick={() => {
                  toggle(key);
                  moveTo(parseDay(key), true);
                }}
                aria-label={
                  (fr ? "Retirer le " : "Remove ") +
                  fullDate.format(parseDay(key))
                }
              >
                {shortDate.format(parseDay(key))}{" "}
                <span aria-hidden="true">×</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {atLimit && (
        <p role="status" className={css.fine}>
          {fr
            ? "Vous avez choisi 31 dates. Retirez-en une pour en ajouter une autre."
            : "You’ve selected 31 dates. Remove one to add another."}
        </p>
      )}
    </fieldset>
  );
}
