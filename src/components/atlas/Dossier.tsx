import { Bookmark, ChevronLeft, ExternalLink } from "lucide-react";
import { placesById } from "@/data/places";
import { generationById, schoolById } from "@/data/schools";
import type { Thinker } from "@/data/types";
import { thinkers } from "@/data/thinkers";

export function Dossier({
  thinker,
  saved,
  onBack,
  onToggleSave,
  onSelect,
}: {
  thinker: Thinker;
  saved: boolean;
  onBack: () => void;
  onToggleSave: () => void;
  onSelect: (id: string) => void;
}) {
  const origin = placesById[thinker.originId];
  const seats = thinker.seats.map((id) => placesById[id]).filter(Boolean);
  const sameCity = thinkers.filter((item) => item.id !== thinker.id && item.originId === thinker.originId);
  const sameSchool = thinkers.filter(
    (item) => item.id !== thinker.id && item.schools[0] === thinker.schools[0],
  );

  return (
    <article className="flex flex-col gap-5 px-4 py-4">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-11 items-center gap-1 text-sm font-semibold text-sea"
        >
          <ChevronLeft className="size-4" aria-hidden />
          All thinkers
        </button>
        <button
          type="button"
          onClick={onToggleSave}
          aria-pressed={saved}
          className={`inline-flex h-11 items-center gap-2 border px-3 text-sm font-semibold ${
            saved
              ? "border-cinnabar bg-cinnabar-soft text-cinnabar"
              : "border-line bg-folio text-ink hover:border-sea"
          }`}
        >
          <Bookmark className={`size-4 ${saved ? "fill-cinnabar" : ""}`} aria-hidden />
          {saved ? "On the desk" : "Set aside"}
        </button>
      </div>

      <header>
        <p className="text-xs font-semibold tracking-wide text-cinnabar uppercase">
          {generationById[thinker.generation].label}
          <span className="text-muted"> · </span>
          {thinker.schools.map((id) => schoolById[id].name).join(" · ")}
        </p>
        <h2 className="mt-1 font-display text-4xl leading-none text-balance text-ink">{thinker.name}</h2>
        <p className="mt-1 font-display text-xl text-sea italic">{thinker.greek}</p>
        <p className="mt-2 text-sm text-muted">{thinker.dates}</p>
      </header>

      <p className="text-base leading-relaxed text-pretty text-ink">{thinker.stance}</p>

      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
        <dt className="text-muted">Origin</dt>
        <dd>
          {origin?.name}
          {origin?.greek ? <span className="text-muted"> · {origin.greek}</span> : null}
          <span className="text-muted"> · {origin?.region}</span>
          {origin?.uncertain ? <span className="text-cinnabar"> · site disputed</span> : null}
        </dd>
        {seats.length > 0 ? (
          <>
            <dt className="text-muted">Also attested</dt>
            <dd>{seats.map((seat) => seat.name).join(", ")}</dd>
          </>
        ) : null}
      </dl>

      {thinker.caution ? (
        <p className="border border-line bg-parchment px-3 py-2 text-sm leading-relaxed text-pretty text-ink">
          {thinker.caution}
        </p>
      ) : null}

      <section className="flex flex-col gap-4">
        <h3 className="font-display text-2xl leading-none text-ink">Doctrines</h3>
        {thinker.doctrines.map((doctrine) => (
          <div key={doctrine.title} className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold tracking-wide text-ink uppercase">{doctrine.title}</h4>
            <p className="text-sm leading-relaxed text-pretty text-ink">{doctrine.text}</p>
            {doctrine.quote ? (
              <blockquote className="border-l-2 border-cinnabar pl-3 font-display text-lg leading-snug text-ink italic">
                {doctrine.quote}
              </blockquote>
            ) : null}
            {doctrine.cite ? <p className="text-xs text-muted">{doctrine.cite}</p> : null}
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-2">
        <h3 className="font-display text-2xl leading-none text-ink">Primary sources</h3>
        <ul className="flex flex-col gap-2">
          {thinker.sources.map((source) => (
            <li key={source.label} className="border-t border-line pt-2">
              {source.href ? (
                <a
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-start gap-1 text-sm font-semibold text-sea"
                >
                  {source.label}
                  <ExternalLink className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                </a>
              ) : (
                <p className="text-sm font-semibold text-ink">{source.label}</p>
              )}
              <p className="mt-0.5 text-sm leading-relaxed text-pretty text-muted">{source.note}</p>
            </li>
          ))}
        </ul>
      </section>

      {sameCity.length > 0 || sameSchool.length > 0 ? (
        <section className="flex flex-col gap-2 pb-4">
          <h3 className="font-display text-2xl leading-none text-ink">On the same plate</h3>
          <div className="flex flex-wrap gap-2">
            {[...sameCity, ...sameSchool.filter((item) => item.originId !== thinker.originId)]
              .filter((item, index, all) => all.findIndex((other) => other.id === item.id) === index)
              .slice(0, 8)
              .map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect(item.id)}
                  className="h-11 border border-line bg-folio px-3 text-sm text-ink hover:border-sea"
                >
                  {item.name}
                  <span className="text-muted"> · {placesById[item.originId]?.name}</span>
                </button>
              ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
