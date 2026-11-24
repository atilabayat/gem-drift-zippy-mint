export type TextAnchor = "start" | "middle" | "end";
export type PlaceKind = "origin" | "seat" | "landmark";

export type Place = {
  id: string;
  name: string;
  greek?: string;
  region: string;
  lat: number;
  lon: number;
  kind: PlaceKind;
  /** Minimum camera scale at which the name is drawn. */
  nameAt: number;
  dx: number;
  dy: number;
  anchor: TextAnchor;
  /** Pin location is a scholarly choice, not a surveyed fact. */
  uncertain?: boolean;
};

export type PlateLabel = {
  id: string;
  text: string;
  lat: number;
  lon: number;
  kind: "sea" | "region" | "island";
};

/** Ancient sites. Coordinates are the archaeological centers, WGS84. */
export const places: Place[] = [
  { id: "athens", name: "Athens", greek: "Ἀθῆναι", region: "Attica", lat: 37.9715, lon: 23.7267, kind: "origin", nameAt: 1, dx: -10, dy: -12, anchor: "end" },
  { id: "elea", name: "Elea", greek: "Ἐλέα", region: "Magna Graecia", lat: 40.1597, lon: 15.155, kind: "origin", nameAt: 1, dx: -8, dy: 4, anchor: "end" },
  { id: "acragas", name: "Acragas", greek: "Ἀκράγας", region: "Sicily", lat: 37.311, lon: 13.577, kind: "origin", nameAt: 1, dx: 0, dy: 16, anchor: "middle" },
  { id: "abdera", name: "Abdera", greek: "Ἄβδηρα", region: "Thrace", lat: 40.933, lon: 24.973, kind: "origin", nameAt: 1, dx: 0, dy: -14, anchor: "middle" },
  { id: "clazomenae", name: "Clazomenae", greek: "Κλαζομεναί", region: "Ionia", lat: 38.36, lon: 26.77, kind: "origin", nameAt: 1.65, dx: -8, dy: -12, anchor: "end" },
  { id: "ephesus", name: "Ephesus", greek: "Ἔφεσος", region: "Ionia", lat: 37.9397, lon: 27.341, kind: "origin", nameAt: 1.7, dx: 8, dy: -8, anchor: "start" },
  { id: "miletus", name: "Miletus", greek: "Μίλητος", region: "Ionia", lat: 37.5306, lon: 27.278, kind: "origin", nameAt: 1.55, dx: 8, dy: 12, anchor: "start" },
  { id: "samos", name: "Samos", greek: "Σάμος", region: "Ionia", lat: 37.6905, lon: 26.9436, kind: "origin", nameAt: 1.35, dx: -8, dy: 14, anchor: "end" },
  { id: "croton", name: "Croton", greek: "Κρότων", region: "Magna Graecia", lat: 39.08, lon: 17.127, kind: "origin", nameAt: 1, dx: 8, dy: 4, anchor: "start" },
  { id: "leontini", name: "Leontini", greek: "Λεοντῖνοι", region: "Sicily", lat: 37.284, lon: 15.003, kind: "origin", nameAt: 1.45, dx: 8, dy: -10, anchor: "start" },
  { id: "cos", name: "Cos", greek: "Κῶς", region: "Aegean", lat: 36.892, lon: 27.288, kind: "origin", nameAt: 1.7, dx: 8, dy: 4, anchor: "start" },
  { id: "halicarnassus", name: "Halicarnassus", greek: "Ἁλικαρνασσός", region: "Caria", lat: 37.0379, lon: 27.4241, kind: "origin", nameAt: 1.55, dx: 8, dy: 14, anchor: "start" },
  { id: "ceos", name: "Ceos", greek: "Κέως", region: "Cyclades", lat: 37.661, lon: 24.343, kind: "origin", nameAt: 1.4, dx: -8, dy: 12, anchor: "end" },
  { id: "elis", name: "Elis", greek: "Ἦλις", region: "Peloponnesus", lat: 37.893, lon: 21.374, kind: "origin", nameAt: 1.15, dx: -8, dy: -12, anchor: "end" },
  { id: "apollonia", name: "Apollonia", greek: "Ἀπολλωνία", region: "Pontus", lat: 42.424, lon: 27.695, kind: "origin", nameAt: 1, dx: -8, dy: -12, anchor: "end", uncertain: true },
  { id: "colophon", name: "Colophon", greek: "Κολοφών", region: "Ionia", lat: 38.114, lon: 27.139, kind: "origin", nameAt: 1.85, dx: 8, dy: -4, anchor: "start" },
  { id: "chios", name: "Chios", greek: "Χίος", region: "Ionia", lat: 38.368, lon: 26.136, kind: "origin", nameAt: 1.45, dx: -8, dy: -4, anchor: "end" },
  { id: "lampsacus", name: "Lampsacus", greek: "Λάμψακος", region: "Hellespont", lat: 40.345, lon: 26.682, kind: "seat", nameAt: 1.7, dx: 8, dy: -10, anchor: "start" },
  { id: "tarentum", name: "Tarentum", greek: "Τάρας", region: "Magna Graecia", lat: 40.476, lon: 17.23, kind: "seat", nameAt: 1.35, dx: 8, dy: -8, anchor: "start" },
  { id: "thurii", name: "Thurii", greek: "Θούριοι", region: "Magna Graecia", lat: 39.724, lon: 16.495, kind: "seat", nameAt: 1.5, dx: -8, dy: 14, anchor: "end" },
  { id: "sparta", name: "Sparta", greek: "Σπάρτη", region: "Peloponnesus", lat: 37.082, lon: 22.423, kind: "landmark", nameAt: 1.5, dx: 0, dy: 14, anchor: "middle" },
  { id: "corinth", name: "Corinth", greek: "Κόρινθος", region: "Hellas", lat: 37.906, lon: 22.879, kind: "landmark", nameAt: 1.6, dx: -8, dy: 12, anchor: "end" },
  { id: "thebes", name: "Thebes", greek: "Θῆβαι", region: "Boeotia", lat: 38.319, lon: 23.318, kind: "landmark", nameAt: 1.7, dx: 8, dy: -10, anchor: "start" },
  { id: "syracuse", name: "Syracuse", greek: "Συράκουσαι", region: "Sicily", lat: 37.064, lon: 15.293, kind: "landmark", nameAt: 1.45, dx: 8, dy: 4, anchor: "start" },
  { id: "delphi", name: "Delphi", greek: "Δελφοί", region: "Phocis", lat: 38.482, lon: 22.501, kind: "landmark", nameAt: 1.6, dx: -8, dy: -10, anchor: "end" },
  { id: "byzantion", name: "Byzantion", greek: "Βυζάντιον", region: "Propontis", lat: 41.008, lon: 28.978, kind: "landmark", nameAt: 1.4, dx: 8, dy: 4, anchor: "start" },
  { id: "olympia", name: "Olympia", greek: "Ὀλυμπία", region: "Peloponnesus", lat: 37.638, lon: 21.63, kind: "landmark", nameAt: 1.7, dx: 0, dy: 14, anchor: "middle" },
];

export const plateLabels: PlateLabel[] = [
  { id: "aegean", text: "Aegean Sea", lat: 37.55, lon: 25.15, kind: "sea" },
  { id: "ionian-sea", text: "Ionian Sea", lat: 37.7, lon: 18.7, kind: "sea" },
  { id: "crete-sea", text: "Sea of Crete", lat: 35.55, lon: 24.6, kind: "sea" },
  { id: "libyan", text: "Libyan Sea", lat: 35.15, lon: 18.4, kind: "sea" },
  { id: "propontis", text: "Propontis", lat: 40.8, lon: 28.2, kind: "sea" },
  { id: "pontus", text: "Pontus Euxinus", lat: 42.55, lon: 29.3, kind: "sea" },
  { id: "sicily", text: "Sicily", lat: 37.55, lon: 14.15, kind: "region" },
  { id: "magna", text: "Magna Graecia", lat: 40.55, lon: 16.15, kind: "region" },
  { id: "pelop", text: "Peloponnesus", lat: 37.4, lon: 22.15, kind: "region" },
  { id: "thrace", text: "Thrace", lat: 41.25, lon: 25.15, kind: "region" },
  { id: "ionia", text: "Ionia", lat: 38.15, lon: 28.35, kind: "region" },
  { id: "crete", text: "Crete", lat: 35.22, lon: 24.85, kind: "island" },
  { id: "rhodes", text: "Rhodes", lat: 36.17, lon: 27.95, kind: "island" },
  { id: "lesbos", text: "Lesbos", lat: 39.17, lon: 26.28, kind: "island" },
  { id: "euboea", text: "Euboea", lat: 38.52, lon: 24.0, kind: "island" },
];

export const placesById: Record<string, Place> = Object.fromEntries(
  places.map((p) => [p.id, p]),
);

export const REGION_ORDER = [
  "Sicily",
  "Magna Graecia",
  "Attica",
  "Peloponnesus",
  "Hellas",
  "Boeotia",
  "Phocis",
  "Cyclades",
  "Aegean",
  "Ionia",
  "Caria",
  "Hellespont",
  "Thrace",
  "Propontis",
  "Pontus",
];
