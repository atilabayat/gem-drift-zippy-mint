import type { Generation, SchoolId } from "@/data/types";

export type School = {
  id: SchoolId;
  mark: string;
  name: string;
  line: string;
};

export const schools: School[] = [
  {
    id: "ionian",
    mark: "Io",
    name: "Ionian",
    line: "Inquiry into nature, and the critique of what the poets had said the gods were.",
  },
  {
    id: "eleatic",
    mark: "El",
    name: "Eleatic",
    line: "What-is does not come to be. Motion and plurality have to answer for themselves.",
  },
  {
    id: "pluralist",
    mark: "Pl",
    name: "Pluralist",
    line: "The cosmos is more than one stuff, arranged by mind or by Love and Strife.",
  },
  {
    id: "atomist",
    mark: "At",
    name: "Atomist",
    line: "Indivisible bodies, and a void for them to move in.",
  },
  {
    id: "pythagorean",
    mark: "Py",
    name: "Pythagorean",
    line: "A way of life first. Number and harmonia come to us mostly through later members.",
  },
  {
    id: "sophist",
    mark: "So",
    name: "Sophistic",
    line: "Logos as a craft: argument, the correctness of names, teaching for a fee.",
  },
  {
    id: "medical",
    mark: "Md",
    name: "Medical",
    line: "The body observed. Regimen, prognosis, and a cause that is not a story about a god.",
  },
  {
    id: "historia",
    mark: "Hi",
    name: "Historia",
    line: "Inquiry into what was done, and into custom — nomos — as a cause in its own right.",
  },
  {
    id: "athenian",
    mark: "Ath",
    name: "Athenian circle",
    line: "Several of these streams are in one city. The next generation will be taught here.",
  },
];

export const schoolById: Record<SchoolId, School> = Object.fromEntries(
  schools.map((s) => [s.id, s]),
) as Record<SchoolId, School>;

export const generations: { id: Generation; label: string; hint: string }[] = [
  {
    id: "prior",
    label: "Earlier",
    hint: "A preceding generation. Dead, or at the edge of living memory, by 450. Plotted because the arguments of 450 are replies.",
  },
  {
    id: "prime",
    label: "c. 450",
    hint: "Active in the decades around the middle of the century.",
  },
  {
    id: "rising",
    label: "Rising",
    hint: "Young in 450. The books we read under these names come later.",
  },
];

export const generationById = Object.fromEntries(generations.map((g) => [g.id, g])) as Record<
  Generation,
  (typeof generations)[number]
>;
