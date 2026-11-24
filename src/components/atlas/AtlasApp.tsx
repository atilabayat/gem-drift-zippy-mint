import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Info, Search } from "lucide-react";
import { AtlasMap } from "@/components/atlas/AtlasMap";
import { Dossier } from "@/components/atlas/Dossier";
import { REGION_ORDER, placesById } from "@/data/places";
import { generationById, generations, schoolById, schools } from "@/data/schools";
import { sortThinkers, thinkers, thinkersById } from "@/data/thinkers";
import type { Generation, SchoolId } from "@/data/types";
import { useDesk } from "@/lib/desk";

export type PlateSearch = {
  t?: string;
  school?: SchoolId;
  gen?: Generation;
  q?: string;
  panel?: "desk" | "note";
};

const schoolIds = new Set(schools.map((school) => school.id));

export function AtlasApp() {
  const search = useSearch({ strict: false }) as PlateSearch;
  const navigate = useNavigate({ from: "/" });
  const desk = useDesk();
  const [deskReady, setDeskReady] = useState(false);

  useEffect(() => {
    const pending = useDesk.persist.rehydrate();
    void Promise.resolve(pending).then(() => setDeskReady(true));
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && search.t) setSearch({ t: undefined });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [search.t]);

  function setSearch(patch: Partial<PlateSearch>) {
    void navigate({
      replace: true,
      search: (prev: PlateSearch) => ({ ...prev, ...patch }),
    });
  }

  const selected = search.t ? thinkersById[search.t] : undefined;
  const query = search.q?.trim().toLowerCase() ?? "";

  const matchedIds = useMemo(() => {
    const ids = new Set<string>();
    for (const thinker of thinkers) {
      if (search.school && !thinker.schools.includes(search.school)) continue;
      if (search.gen && thinker.generation !== search.gen) continue;
      if (query) {
        const place = placesById[thinker.originId];
        const blob = [
          thinker.name,
          thinker.greek,
          place?.name,
          place?.greek,
          place?.region,
          ...thinker.schools.map((id) => schoolById[id].name),
        ]
          .join(" ")
          .toLowerCase();
        if (!blob.includes(query)) continue;
      }
      ids.add(thinker.id);
    }
    return ids;
  }, [query, search.gen, search.school]);

  const dimmed = useMemo(() => {
    const set = new Set<string>();
    for (const thinker of thinkers) {
      if (!matchedIds.has(thinker.id)) set.add(thinker.id);
    }
    return set;
  }, [matchedIds]);

  const visible = sortThinkers(thinkers.filter((thinker) => matchedIds.has(thinker.id)));

  function openThinker(id: string) {
    setSearch({ t: id });
  }

  const sidebarProps = {
    search,
    setSearch,
    visible,
    selectedId: selected?.id,
    onSelect: openThinker,
    savedIds: deskReady ? desk.ids : [],
    onToggleSave: (id: string) => desk.toggle(id),
    saved: selected ? deskReady && desk.ids.includes(selected.id) : false,
  };

  return (
    <div className="flex h-dvh flex-col bg-folio text-ink lg:flex-row">
      <aside className="hidden min-h-0 w-96 shrink-0 flex-col border-line lg:flex lg:border-r">
        <Brand />
        <Sidebar {...sidebarProps} schools />
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="border-b border-line bg-folio px-3 py-2 lg:hidden">
          <p className="font-display text-3xl leading-none font-medium">Before Plato</p>
          <p className="mt-1 text-xs leading-snug text-muted">
            The PrePlatonic Thinkers, mid 5th century BCE
          </p>
        </header>
        <div className="relative aspect-[10/7] w-full shrink-0 lg:aspect-auto lg:min-h-0 lg:flex-1">
          <div className="absolute inset-0">
            <AtlasMap
              thinkers={thinkers}
              selectedId={selected?.id}
              dimmed={dimmed}
              onSelect={openThinker}
            />
          </div>
        </div>
        <div className="flex min-h-0 flex-1 flex-col border-t border-line lg:hidden">
          <div className="border-b border-line px-3 py-2">
            <SchoolChips active={search.school} onChange={(school) => setSearch({ school })} />
          </div>
          <Sidebar {...sidebarProps} />
        </div>
      </div>
    </div>
  );
}

function Brand() {
  return (
    <div className="border-b border-line px-4 py-4">
      <p className="font-display text-5xl leading-[0.9] font-medium tracking-tight">Before Plato</p>
      <p className="mt-2 text-sm leading-snug text-muted">
        The PrePlatonic Thinkers, mid 5th century BCE
      </p>
      <div className="mt-3 h-0.5 w-8 bg-cinnabar" />
    </div>
  );
}

function Sidebar({
  search,
  setSearch,
  visible,
  selectedId,
  onSelect,
  savedIds,
  onToggleSave,
  saved,
  schools: showSchools = false,
}: {
  search: PlateSearch;
  setSearch: (patch: Partial<PlateSearch>) => void;
  visible: typeof thinkers;
  selectedId?: string;
  onSelect: (id: string) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  saved: boolean;
  schools?: boolean;
}) {
  const selected = selectedId ? thinkersById[selectedId] : undefined;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-col gap-3 border-b border-line px-4 py-3">
        <label className="relative block">
          <span className="sr-only">Search thinkers, cities, schools</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
          <input
            value={search.q ?? ""}
            onChange={(event) => setSearch({ q: event.target.value || undefined })}
            placeholder="Search a name, a city, a school"
            className="h-11 w-full border border-line bg-folio pr-3 pl-9 text-sm text-ink outline-none placeholder:text-muted focus:border-sea"
          />
        </label>
        <div className="flex flex-wrap gap-1" role="group" aria-label="Generation">
          <FilterChip active={!search.gen} onClick={() => setSearch({ gen: undefined })}>
            All
          </FilterChip>
          {generations.map((generation) => (
            <FilterChip
              key={generation.id}
              active={search.gen === generation.id}
              onClick={() => setSearch({ gen: search.gen === generation.id ? undefined : generation.id })}
            >
              {generation.label}
            </FilterChip>
          ))}
        </div>
        {showSchools ? (
          <SchoolChips wrap active={search.school} onChange={(school) => setSearch({ school })} />
        ) : null}
        <p className="text-xs text-muted">{visible.length} on the plate</p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {selected ? (
          <Dossier
            thinker={selected}
            saved={saved}
            onBack={() => setSearch({ t: undefined })}
            onToggleSave={() => onToggleSave(selected.id)}
            onSelect={onSelect}
          />
        ) : (
          <>
            <div className="flex gap-1 px-4 pt-3" role="tablist">
              <FilterChip active={!search.panel} onClick={() => setSearch({ panel: undefined })}>
                Gazetteer
              </FilterChip>
              <FilterChip
                active={search.panel === "desk"}
                onClick={() => setSearch({ panel: search.panel === "desk" ? undefined : "desk" })}
              >
                Desk{savedIds.length ? ` (${savedIds.length})` : ""}
              </FilterChip>
              <FilterChip
                active={search.panel === "note"}
                onClick={() => setSearch({ panel: search.panel === "note" ? undefined : "note" })}
              >
                <span className="inline-flex items-center gap-1">
                  <Info className="size-3.5" aria-hidden />
                  Note
                </span>
              </FilterChip>
            </div>
            {search.panel === "note" ? (
              <Note />
            ) : search.panel === "desk" ? (
              <DeskList ids={savedIds} onSelect={onSelect} />
            ) : (
              <Gazetteer thinkers={visible} onSelect={onSelect} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

function SchoolChips({
  active,
  onChange,
  wrap = false,
}: {
  active?: SchoolId;
  onChange: (school: SchoolId | undefined) => void;
  wrap?: boolean;
}) {
  return (
    <div
      className={
        wrap ? "flex flex-wrap gap-1" : "-mx-1 flex gap-1 overflow-x-auto px-1 pb-1"
      }
      role="group"
      aria-label="Schools"
    >
      <FilterChip active={!active} onClick={() => onChange(undefined)}>
        All
      </FilterChip>
      {schools.map((school) => (
        <FilterChip
          key={school.id}
          active={active === school.id}
          onClick={() => onChange(active === school.id ? undefined : school.id)}
        >
          <span className="font-semibold">{school.mark}</span>
          <span className={active ? "text-folio" : "text-muted"}> {school.name}</span>
        </FilterChip>
      ))}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex h-11 shrink-0 items-center border px-3 text-sm ${
        active ? "border-ink bg-ink text-folio" : "border-line bg-folio text-ink hover:border-sea"
      }`}
    >
      {children}
    </button>
  );
}

function Gazetteer({
  thinkers: rows,
  onSelect,
}: {
  thinkers: typeof thinkers;
  onSelect: (id: string) => void;
}) {
  const groups = new Map<string, typeof rows>();
  for (const thinker of rows) {
    const region = placesById[thinker.originId]?.region ?? "Elsewhere";
    const list = groups.get(region) ?? [];
    list.push(thinker);
    groups.set(region, list);
  }
  const regions = [...groups.keys()].sort((a, b) => {
    const ai = REGION_ORDER.indexOf(a);
    const bi = REGION_ORDER.indexOf(b);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  if (rows.length === 0) {
    return <p className="px-4 py-6 text-sm text-muted">No one on the plate matches.</p>;
  }

  return (
    <div className="flex flex-col py-2">
      {regions.map((region) => (
        <section key={region}>
          <h2 className="px-4 pt-3 pb-1 text-xs font-semibold tracking-wide text-muted uppercase">
            {region}
          </h2>
          <ul>
            {(groups.get(region) ?? []).map((thinker) => {
              const place = placesById[thinker.originId];
              const school = schoolById[thinker.schools[0]];
              return (
                <li key={thinker.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(thinker.id)}
                    className="flex w-full items-baseline gap-3 px-4 py-2 text-left hover:bg-parchment"
                  >
                    <span className="w-8 shrink-0 font-semibold text-sea">{school.mark}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-ink">{thinker.name}</span>
                      <span className="block text-xs text-muted">
                        {place?.name} · {generationById[thinker.generation].label}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

function DeskList({ ids, onSelect }: { ids: string[]; onSelect: (id: string) => void }) {
  const rows = ids.map((id) => thinkersById[id]).filter(Boolean);
  if (rows.length === 0) {
    return (
      <p className="px-4 py-6 text-sm leading-relaxed text-pretty text-muted">
        Set a thinker aside from any dossier. The list stays in this browser.
      </p>
    );
  }
  return (
    <ul className="py-2">
      {rows.map((thinker) => (
        <li key={thinker.id}>
          <button
            type="button"
            onClick={() => onSelect(thinker.id)}
            className="flex w-full flex-col px-4 py-2 text-left hover:bg-parchment"
          >
            <span className="text-sm font-semibold">{thinker.name}</span>
            <span className="text-xs text-muted">
              {placesById[thinker.originId]?.name} · {schoolById[thinker.schools[0]].name}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function Note() {
  return (
    <div className="flex flex-col gap-3 px-4 py-4 text-sm leading-relaxed text-pretty text-ink">
      <p>
        Circa 450 BCE is a lens, not a census year. People marked Earlier were likely dead, or very old,
        by then; their arguments were not. People marked Rising were young; the books come later.
      </p>
      <p>
        Pins mark cities of origin. When a dossier names another city, the map draws a line to a seat the
        sources actually attest — an embassy, a school, an exile — not a grand tour.
      </p>
      <p>
        Dates are ancient and often insecure. Where the tradition is late, romantic, or split (Leucippus’
        city, Diogenes’ Apollonia, the two Antiphons, anything attributed to Pythagoras himself), the
        dossier says so. Fragment numbers follow Diels–Kranz. Wording in quotation marks is a translation;
        everything else is paraphrase.
      </p>
      <p>
        The coast is the modern shore. At this scale it is a fair proxy for the fifth-century coast. The
        bar at the southern edge is about 200 kilometers, measured near 35° N.
      </p>
      <p className="text-muted">
        Outbound links open Perseus (Greek and a facing English, where the hopper has the work), the
        Stanford Encyclopedia, the Internet Encyclopedia of Philosophy, or — for a few dialogues the hopper
        mirror does not carry — the Internet Classics Archive’s older public-domain English. Check a
        critical edition before you quote any of them in print.
      </p>
      <p className="text-muted">
        Aristotle’s <span className="italic">Metaphysics</span> A is the first surviving history of most of
        these people, and it is an argument, not a neutral report.
      </p>
    </div>
  );
}

export function isSchoolId(value: string): value is SchoolId {
  return schoolIds.has(value as SchoolId);
}
