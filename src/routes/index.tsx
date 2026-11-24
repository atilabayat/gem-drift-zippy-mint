import { createFileRoute } from "@tanstack/react-router";
import { AtlasApp, isSchoolId, type PlateSearch } from "@/components/atlas/AtlasApp";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): PlateSearch => {
    const gen =
      search.gen === "prior" || search.gen === "prime" || search.gen === "rising"
        ? search.gen
        : undefined;
    const panel = search.panel === "desk" || search.panel === "note" ? search.panel : undefined;
    const school =
      typeof search.school === "string" && isSchoolId(search.school) ? search.school : undefined;
    const q = typeof search.q === "string" && search.q.trim() ? search.q : undefined;
    const t = typeof search.t === "string" && search.t.trim() ? search.t : undefined;
    return { t, school, gen, q, panel };
  },
  component: AtlasApp,
});
