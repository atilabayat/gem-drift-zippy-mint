export type Generation = "prior" | "prime" | "rising";

export type SchoolId =
  | "ionian"
  | "eleatic"
  | "pluralist"
  | "atomist"
  | "pythagorean"
  | "sophist"
  | "medical"
  | "historia"
  | "athenian";

export type Doctrine = {
  title: string;
  text: string;
  quote?: string;
  cite?: string;
};

export type Source = {
  label: string;
  note: string;
  href?: string;
};

export type Thinker = {
  id: string;
  name: string;
  greek: string;
  generation: Generation;
  originId: string;
  /** Cities, other than the origin, where a source puts them to work. */
  seats: string[];
  /** First entry is the badge on the map. */
  schools: SchoolId[];
  dates: string;
  stance: string;
  caution?: string;
  doctrines: Doctrine[];
  sources: Source[];
};
