import { placesById } from "@/data/places";
import { schoolById } from "@/data/schools";
import type { Thinker } from "@/data/types";

const P = "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:";
const SEP = "https://plato.stanford.edu/entries/";
const IEP = "https://iep.utm.edu/";
const MIT = "http://classics.mit.edu/";

export const thinkers: Thinker[] = [
  {
    id: "thales",
    name: "Thales",
    greek: "Θαλῆς",
    generation: "prior",
    originId: "miletus",
    seats: [],
    schools: ["ionian"],
    dates: "fl. c. 585 BCE",
    stance:
      "Of Miletus. Aristotle starts the succession of archai with him. By 450 he has been dead for a century. The arguments have not.",
    caution:
      "No book is securely his, and the tradition that he wrote none may be right. Aristotle is reporting a view, not quoting a text. The eclipse, the olive presses, and the well are stories about a sage.",
    doctrines: [
      {
        title: "Water",
        text: "Water is the archē: the starting-point of the things that are, and what they resolve back into. That is Aristotle’s sentence, in Metaphysics A. He also reports that the earth rests on water. Neither claim comes to us in Thales’ own words.",
        cite: "Aristotle, Metaphysics A.3, 983b6–27",
      },
      {
        title: "Soul in the magnet",
        text: "Soul, he is said to have held, is mixed through the universe. The evidence he gave was the magnet, which moves iron, and amber. The same reports have him say that all things are full of gods. Treat both as Aristotle’s summary of a reputation.",
        cite: "Aristotle, De anima 1.2, 405a19",
      },
    ],
    sources: [
      {
        label: "Aristotle, Metaphysics A",
        note: "Where the water thesis enters the philosophical tradition. Aristotle is building his own history of causes.",
        href: `${P}1999.01.0052`,
      },
      {
        label: "Herodotus 1.74",
        note: "The eclipse that ended a battle between Lydians and Medes. A witness for the prediction, not for a cosmology.",
        href: `${P}1999.01.0126:book=1:chapter=74`,
      },
      {
        label: "Stanford Encyclopedia — Presocratics",
        note: "The Milesians, treated together, which is how the evidence actually comes.",
        href: `${SEP}presocratics/`,
      },
    ],
  },
  {
    id: "anaximander",
    name: "Anaximander",
    greek: "Ἀναξίμανδρος",
    generation: "prior",
    originId: "miletus",
    seats: [],
    schools: ["ionian"],
    dates: "c. 610–c. 546 BCE",
    stance:
      "Of Miletus, in the generation after Thales. His one fragment is the earliest piece of Greek philosophical prose we still have. He is also credited with the first Greek map of the inhabited world.",
    caution:
      "How much of the ‘justice’ sentence is his wording, and how much is Theophrastus’ paraphrase as Simplicius copied it, is still argued. Do not print the whole of Simplicius’ paragraph as a fragment.",
    doctrines: [
      {
        title: "The boundless",
        text: "The archē is the apeiron: not one of the familiar elements, ageless and deathless, and what steers all things. It surrounds the world. Naming it is the move that gets Ionian inquiry out of ‘which familiar stuff is first.’",
        cite: "DK 12 A9, B1",
      },
      {
        title: "Justice and time",
        text: "The things that are perish back into the things they came from, paying penalty and recompense to one another for their injustice, according to the assessment of time. That is the fragment. It is about a cosmic order, not about a city.",
        quote: "according to the assessment of time",
        cite: "DK 12 B1",
      },
      {
        title: "An earth that hangs free",
        text: "The earth stays at rest because it is equally related to the extremes — there is no reason it should drift one way rather than another. Aristotle reports the shape as a column-drum. This is the first Greek argument for a free-floating earth.",
        cite: "Aristotle, On the Heavens 2.13, 295b10",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia — Presocratics",
        note: "The fragment, the apeiron, and the problem of how much Simplicius is quoting.",
        href: `${SEP}presocratics/`,
      },
      {
        label: "Diogenes Laertius 2.1",
        note: "The short life: the gnomon, and an outline of earth and sea. Late, and brief.",
        href: `${P}1999.01.0258`,
      },
    ],
  },
  {
    id: "anaximenes",
    name: "Anaximenes",
    greek: "Ἀναξιμένης",
    generation: "prior",
    originId: "miletus",
    seats: [],
    schools: ["ionian"],
    dates: "fl. c. 546–525 BCE",
    stance:
      "Of Miletus, the third of the succession Aristotle tells. Dead long before 450. Diogenes of Apollonia, on this same plate, will put air back to work and give it a mind.",
    caution:
      "The sentence ‘as our soul, being air, holds us together, so breath and air surround the whole cosmos’ is a late report. Do not treat the wording as a recovered book.",
    doctrines: [
      {
        title: "Air, thinned and thickened",
        text: "Air is the archē. Rarefied, it becomes fire. Condensed, it becomes wind, then cloud, water, earth, and stone. The mechanism matters as much as the element: a process you can watch in breath and in felt, instead of a boundless that is not an ordinary body.",
        cite: "DK 13 A5",
      },
      {
        title: "The earth rides on air",
        text: "The earth is flat and rides on air, and the heavenly bodies too. Aristotle files him after Anaximander in the list of people who named a material archē. That filing is why he is on this plate: the Milesian sequence is the argument the fifth century inherits.",
        cite: "Aristotle, Metaphysics A.3, 984a5",
      },
    ],
    sources: [
      {
        label: "Aristotle, Metaphysics A",
        note: "Air, placed in the succession after the boundless.",
        href: `${P}1999.01.0052`,
      },
      {
        label: "Stanford Encyclopedia — Presocratics",
        note: "Rarefaction and condensation, and what Theophrastus actually says.",
        href: `${SEP}presocratics/`,
      },
      {
        label: "Diogenes Laertius 2.3",
        note: "The life is a few lines. Read it as a notice, not a biography.",
        href: `${P}1999.01.0258`,
      },
    ],
  },
  {
    id: "xenophanes",
    name: "Xenophanes",
    greek: "Ξενοφάνης",
    generation: "prior",
    originId: "colophon",
    seats: [],
    schools: ["ionian"],
    dates: "c. 570–c. 478 BCE",
    stance: "A poet from Colophon who spent a long life on the road, attacking the gods of Homer and the honors paid to athletes.",
    caution:
      "He is not an Eleatic. Later writers, Aristotle among them, treat him as a forerunner of Parmenides. That is a schoolmaster’s genealogy, not a membership.",
    doctrines: [
      {
        title: "Gods made in our image",
        text: "Ethiopians, he says, make their gods dark and snub-nosed; Thracians make them pale and red-haired. Horses, if they could draw, would draw horse-gods. The attack is on anthropomorphic cult, not on the existence of the divine.",
        cite: "DK 21 B15–B16",
      },
      {
        title: "One god, and a limit on knowledge",
        text: "One god, greatest among gods and men, unlike mortals in body and in thought, who shakes all things by the thought of his mind. Beside that, a hard epistemic line: no man has seen what is clear, and even if he happened to say the complete truth he would not know it. What Xenophanes offers of earth and water and of the sun is put forward as opinion of that kind.",
        cite: "DK 21 B23–B26, B34",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia — Xenophanes",
        note: "The best short scholarly account, with the fragments in translation and the Eleatic question handled carefully.",
        href: `${SEP}xenophanes/`,
      },
      {
        label: "Diogenes Laertius, Lives 9",
        note: "A late biography. Useful for what antiquity repeated; not a witness.",
        href: `${P}1999.01.0258`,
      },
    ],
  },
  {
    id: "pythagoras",
    name: "Pythagoras",
    greek: "Πυθαγόρας",
    generation: "prior",
    originId: "samos",
    seats: ["croton"],
    schools: ["pythagorean"],
    dates: "c. 570–c. 490 BCE",
    stance: "Born on Samos, founder of a community at Croton. By 450 the man is gone and the houses of the school have been broken up. The way of life has not.",
    caution:
      "He wrote nothing that we can read. ‘All things are number’ is Aristotle’s description of later Pythagoreans, not a sentence from Pythagoras. The theorem that carries his name is not a signed result.",
    doctrines: [
      {
        title: "A life, not a treatise",
        text: "What is early and reasonably secure is a community with rules, silence toward outsiders, and a political role in the cities of southern Italy that ended in violence. The dietary lore and the taboos multiply in later centuries. Treat them as school tradition unless a near-contemporary is speaking.",
      },
      {
        title: "The soul returns",
        text: "Transmigration is the doctrine most securely tied to his name, because Xenophanes — a near-contemporary — already mocks it: Pythagoras recognizing a friend’s voice in a dog being beaten. That joke is worth more than the later golden biographies.",
        cite: "Xenophanes DK 21 B7",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia — Pythagoras",
        note: "Separates the man, the early community, and the legend.",
        href: `${SEP}pythagoras/`,
      },
      {
        label: "Stanford Encyclopedia — Pythagoreanism",
        note: "The tradition after him, which is what 450 actually inherits. Alcmaeon, Parmenides, and Empedocles are not thereby made Pythagoreans.",
        href: `${SEP}pythagoreanism/`,
      },
    ],
  },
  {
    id: "heraclitus",
    name: "Heraclitus",
    greek: "Ἡράκλειτος",
    generation: "prior",
    originId: "ephesus",
    seats: [],
    schools: ["ionian"],
    dates: "active c. 500 BCE",
    stance: "Of Ephesus. Not a voice of 450, but the voice 450 is still answering: a kosmos that is process, held in measure, and a logos most people live beside without hearing.",
    caution:
      "‘Everything flows’ is not a fragment. It is a later summary. The river sentence we actually have is stricter than the slogan.",
    doctrines: [
      {
        title: "The river, correctly quoted",
        text: "On those who step into the same rivers, different and different waters flow. The rivers stay; the waters do not. Stability and change are not an either-or.",
        quote: "On those who step into the same rivers, different and again different waters flow.",
        cite: "DK 22 B12",
      },
      {
        title: "Fire in measures",
        text: "The world-order was not made by a god or a man. It always was and is and will be an ever-living fire, kindling in measures and going out in measures. Fire here is not a stuff chosen from a list of elements so much as the name of a regulated process. The unity of opposites — road up and road down, one and the same — belongs with this, not with a doctrine of chaos.",
        cite: "DK 22 B30, B60",
      },
      {
        title: "Listen to the logos",
        text: "He tells his readers not to listen to him but to the logos, and that it is wise to agree that all things are one. People are at odds with the logos that governs the things they deal with every day.",
        quote: "Listening not to me but to the logos, it is wise to agree that all things are one.",
        cite: "DK 22 B50",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia — Heraclitus",
        note: "Fragments, the flux slogan, and the later reception, kept apart.",
        href: `${SEP}heraclitus/`,
      },
      {
        label: "Internet Encyclopedia of Philosophy — Heraclitus",
        note: "A second scholarly overview, useful beside the Stanford entry.",
        href: `${IEP}heraclit/`,
      },
    ],
  },
  {
    id: "alcmaeon",
    name: "Alcmaeon",
    greek: "Ἀλκμαίων",
    generation: "prior",
    originId: "croton",
    seats: [],
    schools: ["medical"],
    dates: "early 5th century BCE",
    stance: "Of Croton, son of Peirithous. A book on nature that begins by naming three hearers — a rare first person on this plate. Physician or physiologos: the sources do not agree, and both labels are modern.",
    caution:
      "Aristotle distinguishes him from the Pythagoreans. The catalogue that files him with them is not decisive. Croton’s medical fame is real — Herodotus says its physicians were the best in the Greek world — and Alcmaeon belongs in that city, not automatically in that sect.",
    doctrines: [
      {
        title: "Health is equality",
        text: "Health is an isonomia, an equal balance, of powers: wet and dry, cold and hot, and the rest. Disease is monarchia, one of them ruling alone. The political metaphor is the argument. Cause is a relation among bodily powers, not a god’s anger and not a single arche.",
        cite: "DK 24 B4",
      },
      {
        title: "The brain",
        text: "Sensation and thought are seated in the brain. This is the earliest clear Greek statement of that claim, if the reports are his. Channels run from the eyes and ears to it. He also argues that the soul’s immortality is inferred from its being like the heavenly bodies in eternal motion — a step beyond the medical book, and more exposed to doxographical smoothing.",
        cite: "DK 24 A5, A8, A12",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia — Alcmaeon",
        note: "The controversy over whether he was a doctor at all is the right place to start.",
        href: `${SEP}alcmaeon/`,
      },
      {
        label: "Herodotus 3.131",
        note: "Croton’s physicians, and Democedes. The civic background, not Alcmaeon’s own words.",
        href: `${P}1999.01.0126:book=3:chapter=131`,
      },
    ],
  },
  {
    id: "parmenides",
    name: "Parmenides",
    greek: "Παρμενίδης",
    generation: "prior",
    originId: "elea",
    seats: [],
    schools: ["eleatic"],
    dates: "early 5th century BCE",
    stance: "Of Elea. A poem in hexameters, spoken by a goddess to a young man on a chariot. The book of the generation before this plate, and the book the plate cannot get out from under.",
    caution:
      "Plato’s Parmenides stages him in Athens, about sixty-five, talking to a very young Socrates. The dialogue is not a report of a visit. Do not date his life from it.",
    doctrines: [
      {
        title: "Two paths",
        text: "The goddess marks two roads of inquiry. One, that it is and that it cannot not be, is the path of persuasion. The other, that it is not, cannot be known or pointed out: you cannot know what is not, nor declare it. A third way, the way mortals wander — it is and it is not — she treats as a trap.",
        cite: "DK 28 B2, B6",
      },
      {
        title: "What-is",
        text: "What-is is ungenerated and imperishable, whole, unmoving, and complete. It did not come from what-is-not, and it will not perish into it. Coming-to-be is the thing the argument is built to refuse. The sign ‘like the bulk of a well-rounded sphere’ is in the poem; Melissus will deny the limit.",
        cite: "DK 28 B8",
      },
      {
        title: "The deceptive order",
        text: "The poem does not stop at the signs of what-is. A second part sets out a cosmology of Light and Night which the goddess calls deceptive, and then develops in detail. He is not a thinker who refused to speak about the world. He is a thinker who marked that speech as mortal.",
        cite: "DK 28 B8.50 ff., B9–B19",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia — Parmenides",
        note: "Text, argument, and the status of the second half of the poem.",
        href: `${SEP}parmenides/`,
      },
      {
        label: "Internet Encyclopedia of Philosophy — Parmenides",
        note: "A second pass over the same fragments.",
        href: `${IEP}parmenid/`,
      },
      {
        label: "Plato, Parmenides",
        note: "A philosophical drama, not minutes of a meeting. Greek and English on Perseus.",
        href: `${P}1999.01.0174`,
      },
    ],
  },
  {
    id: "zeno",
    name: "Zeno",
    greek: "Ζήνων",
    generation: "prime",
    originId: "elea",
    seats: [],
    schools: ["eleatic"],
    dates: "mid-5th century BCE",
    stance: "Of Elea, the associate of Parmenides. His book, now lost, put paradoxes in the way of anyone who wanted to keep plurality and motion after the poem.",
    caution:
      "We do not have the book. The arguments come through Aristotle’s Physics, and through Simplicius quoting him in order to explain Aristotle. What Zeno himself thought the arguments proved is partly Aristotle’s framing.",
    doctrines: [
      {
        title: "Against plurality",
        text: "If there are many things, they are both so small as to have no size and so large as to be unlimited. The argument is a trap for the claim that the world is made of parts. It is the sister of the motion paradoxes, not a separate hobby.",
        cite: "DK 29 B1–B2, via Simplicius",
      },
      {
        title: "The motion paradoxes",
        text: "Achilles will not catch the tortoise. The arrow, occupying a place equal to itself at each now, is at rest. You cannot finish crossing the stadium, because you must first reach the halfway point, and the halfway of that. Aristotle takes these as puzzles about the continuous, and answers them as such. Read his answers as answers, not as Zeno’s own last page.",
        cite: "Aristotle, Physics 6",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia — Zeno of Elea",
        note: "The paradoxes, and what is quotation rather than report.",
        href: `${SEP}zeno-elea/`,
      },
      {
        label: "Aristotle, Physics",
        note: "Public-domain English. Book 6 is the motion paradoxes. This is a report and a reply, not Zeno’s text.",
        href: `${MIT}Aristotle/physics.html`,
      },
    ],
  },
  {
    id: "melissus",
    name: "Melissus",
    greek: "Μέλισσος",
    generation: "prime",
    originId: "samos",
    seats: [],
    schools: ["eleatic"],
    dates: "active c. 440 BCE",
    stance: "Of Samos. The one person on this plate with a date you can almost touch: the tradition has him command the Samian fleet against Pericles in 441/0.",
    caution:
      "That he commanded the fleet is Plutarch’s report (Pericles 26), in a campaign Thucydides describes without naming the philosopher. Hold the identification as probable, not as an inscription.",
    doctrines: [
      {
        title: "Unlimited, where Parmenides said complete",
        text: "What-is did not come to be and will not perish, so it has no temporal beginning or end. From that everlastingness Melissus argues that it is also unlimited in magnitude. Parmenides’ ‘well-rounded sphere’ is refused. The Eleatic school is already a disagreement, not a catechism.",
        cite: "DK 30 B1–B4",
      },
      {
        title: "No void, no motion, no pain",
        text: "There is no void, so there is no motion: a body would need somewhere to move into. What-is feels no pain and no grief; those would be additions, and what-is does not acquire. He also says, more bluntly than the poem, that the many things we see and hear are not real.",
        cite: "DK 30 B7, B8",
      },
    ],
    sources: [
      {
        label: "Internet Encyclopedia of Philosophy — Presocratics",
        note: "The Melissus section states the differences from Parmenides without inventing a lost biography.",
        href: `${IEP}presocra/`,
      },
      {
        label: "Thucydides 1.115–117",
        note: "The Samian revolt. The campaign, not the philosophy. English on Perseus.",
        href: `${P}1999.01.0200:book=1:chapter=115`,
      },
      {
        label: "Stanford Encyclopedia — Parmenides",
        note: "Melissus is discussed here as the prose restatement, and the revision, of the poem.",
        href: `${SEP}parmenides/`,
      },
    ],
  },
  {
    id: "empedocles",
    name: "Empedocles",
    greek: "Ἐμπεδοκλῆς",
    generation: "prime",
    originId: "acragas",
    seats: [],
    schools: ["pluralist"],
    dates: "c. 492–c. 432 BCE",
    stance: "Of Acragas. Two poems come down in fragments: On Nature, and the Purifications. A democrat in a rich Sicilian city, a writer of oracles about the elements, and a voice that claims more than a physicist’s brief.",
    caution:
      "The story that he leapt into Etna is a late legend. Nothing contemporary supports it. Gorgias is sometimes called his student; that too is doxography.",
    doctrines: [
      {
        title: "Four roots",
        text: "Fire, air, water, and earth — he calls them roots, and he names them as gods: Zeus, Hera, Aidoneus, Nestis. Which name is which element was already disputed in antiquity. The roots do not come to be and do not perish. What comes to be is their mixture.",
        cite: "DK 31 B6, B17",
      },
      {
        title: "Love and Strife",
        text: "Two forces, Philotēs and Neikos, mix the roots and pull them apart. The cosmos runs a cycle between a condition in which Love has made them one and a condition in which Strife has sorted them out. Mortal things, including ourselves, are temporary mixtures, borrowed from the roots and given back.",
        cite: "DK 31 B17, B26, B35",
      },
      {
        title: "The fallen daimōn",
        text: "The Purifications speak of a daimōn exiled from the company of the blessed for shedding blood, clothed in alien garments of flesh, passing from plant to animal to human. How this fits the physics of the roots is not settled by the fragments we have. Do not force a harmony the poems may not have wanted.",
        cite: "DK 31 B115, B117",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia — Empedocles",
        note: "Fragments, the two poems, and the cycle.",
        href: `${SEP}empedocles/`,
      },
      {
        label: "Internet Encyclopedia of Philosophy — Empedocles",
        note: "A clear second account of roots, Love, and Strife.",
        href: `${IEP}empedocl/`,
      },
    ],
  },
  {
    id: "anaxagoras",
    name: "Anaxagoras",
    greek: "Ἀναξαγόρας",
    generation: "prime",
    originId: "clazomenae",
    seats: ["athens", "lampsacus"],
    schools: ["pluralist", "athenian"],
    dates: "c. 500–428 BCE",
    stance: "Of Clazomenae. He came to Athens, was close to Pericles, and left under a charge of impiety. He died at Lampsacus. In 450 this is the natural philosopher of the imperial city.",
    caution:
      "The reports of the trial do not agree on the procedure, the date, or the penalty. What is firm is that he left, and that the charge had to do with the sun and the moon.",
    doctrines: [
      {
        title: "All things were together",
        text: "In the beginning everything was together, unlimited in amount and in smallness. In everything there is a portion of everything. What we call a thing by one name — gold, flesh, hair — is that in which those portions predominate. Coming-to-be is separation, not the birth of the new from nothing.",
        quote: "All things were together.",
        cite: "DK 59 B1",
      },
      {
        title: "Nous",
        text: "Mind is unlimited, self-ruled, and mixed with nothing. If it were mixed it would be hindered. It knows all things, and it set the mixture into rotation. It is not a creator out of nothing, and it is not, in the fragments, a moral providence. Socrates, in Plato’s Phaedo, says he hoped Nous would explain why the world is arranged for the best, and was disappointed to find only mechanical causes. That disappointment is Plato’s scene. It is also a fair reading of how little the fragments moralize.",
        cite: "DK 59 B12",
      },
      {
        title: "The sun is a stone",
        text: "The sun is a red-hot stone and the moon an earth. That is the sentence Athens could prosecute. Plato’s Apology has Meletus confuse Socrates with the man who says these things. The confusion is the joke, and the historical point: in Athens the doctrines had a public name, and the name was Anaxagoras.",
        cite: "Plato, Apology 26d; DK 59 A42",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia — Anaxagoras",
        note: "Nous, the mixture, and the Athenian years.",
        href: `${SEP}anaxagoras/`,
      },
      {
        label: "Plato, Apology",
        note: "Jowett’s public-domain English. 26d is the Meletus passage. Not a transcript of the historical speech.",
        href: `${MIT}Plato/apology.html`,
      },
      {
        label: "Diogenes Laertius 2",
        note: "The late life, including the trial stories you should not take at face value. Read them as the tradition.",
        href: `${P}1999.01.0258`,
      },
    ],
  },
  {
    id: "archelaus",
    name: "Archelaus",
    greek: "Ἀρχέλαος",
    generation: "prime",
    originId: "athens",
    seats: [],
    schools: ["athenian", "pluralist"],
    dates: "mid-5th century BCE",
    stance: "Called Athenian, and also Milesian. Pupil of Anaxagoras, and — this is the tradition, not a document — the teacher of Socrates. The hinge between the Ionian book and the man who wrote nothing.",
    caution:
      "Diogenes Laertius is the source for the succession Anaxagoras–Archelaus–Socrates. Successions are a genre. They are often too neat. No sentence of Archelaus survives that we can separate cleanly from the handbook that reports him.",
    doctrines: [
      {
        title: "A cosmogony with a moral tail",
        text: "The reports give him a cosmogony in the manner of Anaxagoras: mind, separation, hot and cold. They also have him say something the older physiologoi are not usually credited with — that the just and the shameful exist by convention, not by nature. If that clause is his, he is already on the sophistic side of the street, inside a physical book.",
        cite: "DK 60 A1–A4",
      },
      {
        title: "Why he is on this plate",
        text: "Not for a system you can reconstruct. For the geography of a classroom. Anaxagoras’s Nous, in Athens, has a local heir, and the tradition runs that heir into Socrates. The map would lie if it showed the Ionian and the Athenian as adjacent cities only.",
      },
    ],
    sources: [
      {
        label: "Diogenes Laertius, Lives",
        note: "Book 2.16 is the short life. Late, schematic, and the reason the succession exists in the tradition at all.",
        href: `${P}1999.01.0258`,
      },
      {
        label: "Stanford Encyclopedia — Presocratics",
        note: "Where to put a figure who left no book, in the larger map of the century.",
        href: `${SEP}presocratics/`,
      },
    ],
  },
  {
    id: "leucippus",
    name: "Leucippus",
    greek: "Λεύκιππος",
    generation: "prime",
    originId: "miletus",
    seats: [],
    schools: ["atomist"],
    dates: "mid-5th century BCE",
    stance: "The founder of atomism, if anyone was. The pin sits at Miletus because that is the affiliation most often repeated. Elea and Abdera are also claimed. None of the three is secure.",
    caution:
      "Epicurus is reported to have denied that Leucippus ever existed. That denial is not believed, but it measures how thoroughly Democritus absorbed him. Many ‘atomist’ sentences cannot be given to one of them rather than the other.",
    doctrines: [
      {
        title: "Atoms and the void",
        text: "The Eleatic ban on what-is-not is the problem. Leucippus’ answer, as Aristotle and Theophrastus report it, is that what-is (the full, the atom) is no more real than what-is-not (the empty). Atoms are indivisible, solid, and infinite in number. Worlds form where many of them, moving in the void, fall into a vortex.",
        cite: "DK 67 A6–A8; Aristotle, Metaphysics A.4",
      },
      {
        title: "The lost book",
        text: "A Great World-System (Megas diakosmos) is attributed to him, and sometimes to Democritus. We do not have it. ‘Nothing happens in vain, but everything from a logos and by necessity’ is given as his by a late source. Treat the wording as a report of the school’s determinism, not as a recovered sentence you can parse in Greek.",
        cite: "DK 67 B2",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia — Leucippus",
        note: "Existence, city, and what can be separated from Democritus.",
        href: `${SEP}leucippus/`,
      },
      {
        label: "Stanford Encyclopedia — Ancient atomism",
        note: "The school as a single argument, which is how Aristotle read it.",
        href: `${SEP}atomism-ancient/`,
      },
      {
        label: "Aristotle, Metaphysics A",
        note: "English on Perseus. Chapter 4 is his account of the atomists, inside an argument of his own.",
        href: `${P}1999.01.0052`,
      },
    ],
  },
  {
    id: "protagoras",
    name: "Protagoras",
    greek: "Πρωταγόρας",
    generation: "prime",
    originId: "abdera",
    seats: ["athens", "thurii"],
    schools: ["sophist"],
    dates: "c. 490–c. 420 BCE",
    stance: "Of Abdera. The first man we hear of who took pay to teach excellence at speaking and judging, and who said so in public. In Athens in the 440s, and connected with the foundation of Thurii.",
    caution:
      "Stories of a trial for impiety and of a public burning of his book are late and not secure. Do not repeat them as events.",
    doctrines: [
      {
        title: "The measure",
        text: "The sentence is quoted by Plato as the opening of a book called Truth. Chrēmata is broader than ‘objects’: things one deals with, matters. Plato reads it as: whatever appears to a person is true for that person. Whether Protagoras meant something that narrow is the argument of the Theaetetus, not a fact underneath it. He also held that on every matter there are two logoi, opposed to each other.",
        quote:
          "Of all things the measure is man: of the things that are, that they are, and of the things that are not, that they are not.",
        cite: "Plato, Theaetetus 152a; DK 80 B1",
      },
      {
        title: "The gods",
        text: "About the gods he said he could not know that they are, or that they are not, or what they are like. The obstacles he names are the obscurity of the subject and the shortness of a human life. It is a suspension, not a denial. Later antiquity turned it into a martyrdom. The fragment itself is quieter.",
        cite: "DK 80 B4",
      },
      {
        title: "Teachable excellence",
        text: "Plato’s Protagoras gives him a great speech: justice and aidōs were distributed to all, because a city cannot exist if only a few have them, and yet they can be taught — that is why punishment and education exist. The speech is Plato’s composition. It is also the clearest ancient statement of what a sophist of this generation claimed to be selling, and why a democracy might buy it.",
        cite: "Plato, Protagoras 320c–328d",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia — Protagoras",
        note: "Measure, gods, and the two-logoi fragment, with the sources graded.",
        href: `${SEP}protagoras/`,
      },
      {
        label: "Plato, Theaetetus",
        note: "Jowett’s public-domain English. The measure doctrine is examined, and rewritten, here.",
        href: `${MIT}Plato/theatu.html`,
      },
      {
        label: "Plato, Protagoras",
        note: "The great speech and the question whether excellence can be taught. A dialogue, not a biography.",
        href: `${MIT}Plato/protagoras.html`,
      },
    ],
  },
  {
    id: "gorgias",
    name: "Gorgias",
    greek: "Γοργίας",
    generation: "prime",
    originId: "leontini",
    seats: ["athens"],
    schools: ["sophist"],
    dates: "c. 485–c. 380 BCE",
    stance: "Of Leontini. A rhetor. His embassy to Athens in 427 falls just after this plate’s year; the style, and the argument of On Non-Being, belong to the same generation.",
    caution:
      "On Non-Being survives only as two later summaries, Sextus Empiricus and the pseudo-Aristotelian On Melissus, Xenophanes, and Gorgias. They do not match in every step. Do not stitch them into one speech and call it his wording.",
    doctrines: [
      {
        title: "Three theses",
        text: "Nothing is. If it is, it cannot be known. If it can be known, it cannot be communicated to another. The argument is aimed at Eleatic confidence that thinking and being are locked together. A chariot racing on the sea can be thought and spoken; it does not follow that it is. Logos is not a window. It is a power.",
        cite: "DK 82 B3; Sextus, Against the Mathematicians 7.65 ff.",
      },
      {
        title: "Helen and the force of speech",
        text: "The Encomium of Helen, which we do have, defends Helen by arguing that speech is a great dynast: it can drug the soul, and a person persuaded is not to blame. Palamedes is the companion piece, a defense speech. These are display works. They are also a theory of logos, written as oratory rather than as a treatise.",
        cite: "DK 82 B11, B11a",
      },
    ],
    sources: [
      {
        label: "Internet Encyclopedia of Philosophy — Gorgias",
        note: "On Non-Being, Helen, and the two summarizing sources, kept distinct.",
        href: `${IEP}gorgias/`,
      },
      {
        label: "Stanford Encyclopedia — Intentionality in ancient philosophy",
        note: "A careful account of the second thesis: thought does not drag being with it.",
        href: `${SEP}intentionality-ancient/`,
      },
      {
        label: "Plato, Gorgias",
        note: "A generation later, Plato’s argument with what rhetoric is. Not a portrait you can treat as minutes.",
        href: `${MIT}Plato/gorgias.html`,
      },
    ],
  },
  {
    id: "philolaus",
    name: "Philolaus",
    greek: "Φιλόλαος",
    generation: "prime",
    originId: "croton",
    seats: ["tarentum"],
    schools: ["pythagorean"],
    dates: "c. 470–c. 385 BCE",
    stance: "Of Croton, later at Tarentum. The first Pythagorean of whom we have book-fragments. In 450 he is a young man. The written form of the school starts with his generation.",
    caution:
      "‘Things are numbers’ is Aristotle’s report about Pythagoreans, and Aristotle does not always say which ones. Philolaus’ own opening is about limiters and unlimiteds, not about integers as the substance of things. Some fragments printed under his name in older collections are forged. Huffman’s edition is the sieve.",
    doctrines: [
      {
        title: "Limiters and unlimiteds",
        text: "Nature in the cosmos was fitted together from unlimiteds and limiters, both of them required. A harmony holds them. Without number, he says, nothing could be known — number is the condition of knowledge of the fitting-together, which is not the same claim as ‘a horse is the number four.’",
        cite: "DK 44 B1, B2, B4, B6",
      },
      {
        title: "The hearth is not the earth",
        text: "The system credited to him puts fire at the center, a hearth, and makes the earth one of the bodies that move around it. There is also a counter-earth in the reports. How much of this is his wording and how much is Aristotle’s ‘the Pythagoreans’ is exactly the scholarly argument. What is safe: this astronomy is not geocentric, and it is not yet the astronomy of Plato’s Timaeus.",
        cite: "DK 44 A16–A17; Aristotle, On the Heavens",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia — Philolaus",
        note: "Carl Huffman’s entry. Use it before any older collection of the fragments.",
        href: `${SEP}philolaus/`,
      },
      {
        label: "Stanford Encyclopedia — Pythagoreanism",
        note: "Where he sits in the school that Pythagoras himself did not write down.",
        href: `${SEP}pythagoreanism/`,
      },
    ],
  },
  {
    id: "diogenes",
    name: "Diogenes of Apollonia",
    greek: "Διογένης",
    generation: "prime",
    originId: "apollonia",
    seats: [],
    schools: ["ionian"],
    dates: "active c. 440–430 BCE",
    stance: "Air is the arche, and air is intelligent. An Ionian book written late enough to have heard Anaxagoras, and simple enough that Aristophanes can put a version of it on the comic stage.",
    caution:
      "Which Apollonia is not known. The pin marks Apollonia on the Pontus, modern Sozopol, one candidate. Crete and a Phrygian Apollonia have also been argued. Do not treat the dot as a birth certificate. He was read in Athens; that part is the point of the Clouds parody.",
    doctrines: [
      {
        title: "One arche, or else no mixture",
        text: "If the things that are now in this cosmos — earth, air, fire — were different in their own nature, they could not mix and affect one another. So they are forms of one underlying thing. The argument is explicit about why a monism is required. It is a reply to pluralists, not an ignorance of them.",
        cite: "DK 64 B2",
      },
      {
        title: "Air that knows",
        text: "That one thing is air. Air differs in heat, in density, and in intelligence: the warmer and the finer knows more. Humans and other animals live by breathing a portion of it. God is air, and air steers all things. The steering is what he takes from Anaxagoras, relocated into the arche itself rather than into a Mind that is mixed with nothing.",
        cite: "DK 64 B4, B5",
      },
    ],
    sources: [
      {
        label: "Internet Encyclopedia of Philosophy — Diogenes of Apollonia",
        note: "Fragments B1–B5 and the relation to Anaximenes and Anaxagoras.",
        href: `${IEP}diogenes-of-apollonia/`,
      },
      {
        label: "Aristophanes, Clouds",
        note: "English on Perseus. Produced in 423. The phrontistērion’s air-doctrine is a caricature aimed at this kind of book, and at Socrates, who did not write it.",
        href: `${P}1999.01.0241`,
      },
    ],
  },
  {
    id: "antiphon-sophist",
    name: "Antiphon the Sophist",
    greek: "Ἀντιφῶν",
    generation: "prime",
    originId: "athens",
    seats: [],
    schools: ["sophist", "athenian"],
    dates: "later 5th century BCE",
    stance: "An Athenian book, On Truth, recovered in part from a papyrus. Justice, in those columns, is a convention. Nature is what you follow when no one is watching.",
    caution:
      "Whether this Antiphon is Antiphon of Rhamnus — the logographer executed in 411 — is a real dispute, not a footnote. This plate keeps them apart, because the evidence does not force them together. Pendrick’s commentary is the sober case for separation; unitarians remain. If you merge them, merge them on purpose.",
    doctrines: [
      {
        title: "Nature and the law",
        text: "Justice is not violating the laws of the city you live in. The laws are imposed; the dictates of nature are necessary. Most of what the law calls just is hostile to nature. A man gets more if he follows nature when there are no witnesses, and the law when there are. The fragment does not blush about this. It is an analysis of what a conventional justice can actually enforce.",
        cite: "DK 87 B44, P.Oxy. 1364",
      },
      {
        title: "What the papyrus is not",
        text: "It is not a political program, and it is not yet a theory of rights. Later readers have wanted egalitarianism from a column about Greeks and barbarians. Read the column before you adopt the moral. The other titles under his name — On Concord, on the interpretation of dreams — survive as quotations, not as books.",
      },
    ],
    sources: [
      {
        label: "Internet Encyclopedia of Philosophy — Sophists",
        note: "The Antiphon section, including the identity question and B44.",
        href: `${IEP}sophists/`,
      },
      {
        label: "Stanford Encyclopedia — Ancient political philosophy",
        note: "The fifth-century section places Antiphon’s papyrus in the nomos and physis argument, beside the speeches Plato writes for Thrasymachus and Callicles.",
        href: `${SEP}ancient-political/`,
      },
    ],
  },
  {
    id: "antiphon-rhamnus",
    name: "Antiphon of Rhamnus",
    greek: "Ἀντιφῶν",
    generation: "prime",
    originId: "athens",
    seats: [],
    schools: ["athenian"],
    dates: "c. 480–411 BCE",
    stance: "Of the deme Rhamnus. A logographer: he wrote speeches for other men to deliver in court. In 411 he was a leader of the oligarchy of the Four Hundred, defended himself in a speech Thucydides calls the best of its time, and was executed.",
    caution:
      "The Tetralogies — three sets of model homicide speeches, each with accusation, defense, and replies — are transmitted under his name. Their date and their relation to On Truth are part of the same identity dispute. They may be exercises by the orator, or they may not be his.",
    doctrines: [
      {
        title: "Probability in court",
        text: "The Tetralogies argue homicide cases where the facts are thin, by eikos: what a person of that sort would probably have done. This is the sophistic art inside Athenian procedure. A death can be constructed, on either side, out of character and likelihood. That is a doctrine about logos whether or not the author is the author of On Truth.",
        cite: "Tetralogies 1–3",
      },
      {
        title: "411",
        text: "Thucydides marks him as the man who planned the oligarchy and who, when it fell, stayed to stand trial rather than flee. The historian’s praise of the defense speech is almost the only contemporary literary judgment we have of him. The speech itself is lost.",
        cite: "Thucydides 8.68",
      },
    ],
    sources: [
      {
        label: "Thucydides, Book 8",
        note: "English on Perseus. Chapter 68 is the portrait; the surrounding narrative is the coup.",
        href: `${P}1999.01.0200:book=8:chapter=68`,
      },
      {
        label: "Internet Encyclopedia of Philosophy — Sophists",
        note: "States the identity problem without pretending it has been closed.",
        href: `${IEP}sophists/`,
      },
    ],
  },
  {
    id: "herodotus",
    name: "Herodotus",
    greek: "Ἡρόδοτος",
    generation: "prime",
    originId: "halicarnassus",
    seats: ["athens", "thurii"],
    schools: ["historia"],
    dates: "c. 484–c. 425 BCE",
    stance: "Of Halicarnassus. His inquiry — he is the one who uses historiē of his own work — is the Persian wars, and everything a person would have to know to see why they were fought. Athens knew the work in the 440s. Later tradition settles him at Thurii.",
    caution:
      "He is not a philosopher of the schools above, and this plate does not pretend he is. He is here because 450 has no honest intellectual map that omits the invention of prose inquiry on this scale. The causes he gives are his causes. Check them against the inscriptions and against Aeschylus before you trust a speech he puts in a king’s mouth.",
    doctrines: [
      {
        title: "So that they not be without kleos",
        text: "The proem: so that what men have done not fade, and so that the great and wonderful works of Greeks and barbarians not lose their glory, and in particular the cause for which they warred. Greeks and barbarians are in the same sentence. That is a method, not a courtesy.",
        cite: "Histories 1.1",
      },
      {
        title: "Custom is king",
        text: "If someone set all human customs before men and told them to choose the finest, each would pick his own. Darius’ experiment — Greeks horrified at eating their fathers, Callatian Indians horrified at burning them — is the demonstration. He quotes Pindar: nomos is king of all. Custom is not a decoration on top of a universal human nature. It is what a people takes nature to be.",
        cite: "Histories 3.38",
      },
      {
        title: "The political argument",
        text: "The Persian debate (3.80–82) on democracy, oligarchy, and monarchy is not the minutes of a Persian cabinet. It is a Greek argument staged in Susa, and it belongs with the Athenian conversation of this generation about constitutions. Read it as thought, and say whose.",
        cite: "Histories 3.80–82",
      },
    ],
    sources: [
      {
        label: "Herodotus, Histories (Godley)",
        note: "English on Perseus, with the Greek one click away. Start at the proem, then 3.38.",
        href: `${P}1999.01.0126`,
      },
      {
        label: "Histories 3.38",
        note: "Custom is king. The chapter itself.",
        href: `${P}1999.01.0126:book=3:chapter=38`,
      },
      {
        label: "Stanford Encyclopedia — Doxography",
        note: "Not an article on Herodotus. The right warning about how later handbooks turn inquirers into ‘positions.’ He is a victim of that genre too.",
        href: `${SEP}doxography-ancient/`,
      },
    ],
  },
  {
    id: "ion",
    name: "Ion of Chios",
    greek: "Ἴων",
    generation: "prime",
    originId: "chios",
    seats: ["athens"],
    schools: ["ionian", "historia"],
    dates: "c. 480–c. 422 BCE",
    stance: "Of Chios. Tragedian, elegist, and the author of a book of visits — the Epidēmiai — in which Sophocles and Pericles appear as men he sat with. A polymath of the Athenian orbit who is not a school.",
    caution:
      "The Triagmoi, a prose book organized in threes, is sometimes filed as Pythagorean cosmology. The filing is speculative. We have quotations, not the book. Do not build a system out of the numeral three.",
    doctrines: [
      {
        title: "Memoir as inquiry",
        text: "The Epidēmiai are not history in Herodotus’ sense and not biography in Plutarch’s. They are a contemporary’s scenes: what Sophocles said at a dinner, how a politician behaved in a room. For 450 this is rare. Almost everyone else on the plate reaches us through a handbook or a hostile dialogue. Ion was in the room.",
        cite: "DK 36; Plutarch’s quotations",
      },
      {
        title: "A cosmology, thinly attested",
        text: "The Triagmoi is reported to have divided things by threes and to have touched the soul and the virtues. That is enough to show that a working tragedian of this generation also wrote a book of the physiologos type. It is not enough to reconstruct the book.",
      },
    ],
    sources: [
      {
        label: "Diogenes Laertius",
        note: "No real life of Ion. Listed here because the biographical genre that swallowed everyone else barely noticed him — which is itself a fact about the tradition.",
        href: `${P}1999.01.0258`,
      },
      {
        label: "Stanford Encyclopedia — Doxography of ancient philosophy",
        note: "How a book that survives only in other people’s quotations should be handled.",
        href: `${SEP}doxography-ancient/`,
      },
    ],
  },
  {
    id: "damon",
    name: "Damon",
    greek: "Δάμων",
    generation: "prime",
    originId: "athens",
    seats: [],
    schools: ["athenian"],
    dates: "mid-5th century BCE",
    stance: "Of the deme Oa, at Athens. A music theorist in the circle of Pericles, and in some reports a teacher of Socrates. The man who made the modes of the lyre into a question about character and about the city.",
    caution:
      "The treatise is lost. Plato’s Republic is our main window, and Plato has a constitutional project of his own: he wants the modes that soften or that intoxicate kept out of the guardians’ education. That is not a neutral report of Damon’s lecture. An ostracism is reported and the date floats. Do not invent the year.",
    doctrines: [
      {
        title: "Ethos of the modes",
        text: "Different harmoniai shape different characters. A city that lets every mode into its choruses is making a kind of citizen. The claim is older than Plato and narrower than ‘music is important.’ It says that rhythm and scale are already ethical, before anyone has spoken a proposition.",
        cite: "Plato, Republic 3, 400b and 424c",
      },
      {
        title: "Counselor, not founder",
        text: "He does not found a school you can list beside the Eleatics. He shows what the Athenian circle sounded like when it was not doing ontology: technical musical knowledge, used as political advice, close enough to Pericles to be worth exiling if the ostracism tradition is true.",
      },
    ],
    sources: [
      {
        label: "Plato, Republic",
        note: "English on Perseus. Book 3 is the education of the guardians and the discussion of modes. Damon is named, not quoted at length.",
        href: `${P}1999.01.0168`,
      },
      {
        label: "Stanford Encyclopedia — shorter ethical dialogues",
        note: "Not an article on Damon. The Laches, where he is also in the background of a conversation about courage and teaching, sits in this family of dialogues.",
        href: `${SEP}plato-ethics-shorter/`,
      },
    ],
  },
  {
    id: "socrates",
    name: "Socrates",
    greek: "Σωκράτης",
    generation: "rising",
    originId: "athens",
    seats: [],
    schools: ["athenian"],
    dates: "469–399 BCE",
    stance: "Athenian, son of Sophroniscus. In 450 he is about nineteen. Nothing of the elenchus, the trial, or the circles of Plato and Xenophon has happened. He is on the plate because those things are what this city’s streams become.",
    caution:
      "He wrote nothing. Plato’s Socrates, Xenophon’s Socrates, and the Socrates of Aristophanes’ Clouds (423) are three compositions. Aristotle, who was not an eyewitness either, says the historical man sought universal definitions and turned inquiry toward ethical questions. Where the three literary portraits disagree, say so. Do not average them into a person.",
    doctrines: [
      {
        title: "What the next decades will mean by him",
        text: "The examined life, the disavowal of knowledge, the question-and-answer that ends with the interlocutor’s contradiction rather than with a doctrine. ‘The unexamined life is not worth living’ is a sentence from Plato’s Apology, written after the execution. It is not a saying recorded in 450. It is where the story goes.",
        cite: "Plato, Apology 38a",
      },
      {
        title: "What 423 already thought he was",
        text: "Aristophanes puts him in a think-shop, mixing the weaker argument with the stronger and investigating the things in the air. That is a caricature with Anaxagoras and Diogenes of Apollonia folded in. It is also evidence that, twenty-seven years after this plate, a mass audience recognized the name and associated it with both argument and natural philosophy. The association with natural philosophy is exactly what Plato’s Apology denies.",
        cite: "Aristophanes, Clouds; Plato, Apology 19b–d",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia — Socrates",
        note: "The problem of the sources is the subject of the entry, not a preface to it.",
        href: `${SEP}socrates/`,
      },
      {
        label: "Plato, Apology",
        note: "Jowett’s public-domain English. A defense written by a philosopher, not a court stenographer.",
        href: `${MIT}Plato/apology.html`,
      },
      {
        label: "Xenophon, Memorabilia",
        note: "English on Perseus. A different Socrates: more practical, more conventionally pious, still not a transcript.",
        href: `${P}1999.01.0208`,
      },
      {
        label: "Aristophanes, Clouds",
        note: "English on Perseus. Comedy, 423, revised later. Use it as evidence of a public image.",
        href: `${P}1999.01.0241`,
      },
    ],
  },
  {
    id: "democritus",
    name: "Democritus",
    greek: "Δημόκριτος",
    generation: "rising",
    originId: "abdera",
    seats: [],
    schools: ["atomist"],
    dates: "c. 460–c. 370 BCE",
    stance: "Of Abdera. If the birth date holds, he is a child in 450. He is on the plate because Abdera’s atomism is the school this generation opens, and a pin that showed only Protagoras would misdraw the city.",
    caution:
      "The travels — Egypt, Persia, India — are a romantic biography. The ethical fragments are numerous and many are later paste. ‘By convention sweet, by convention bitter; in reality atoms and void’ is transmitted under his name (B9) and has also been associated with the school at large. Do not treat the wording as settled.",
    doctrines: [
      {
        title: "Atoms, void, necessity",
        text: "With Leucippus: indivisible bodies, different in shape and arrangement, moving in the empty. Perceptible qualities are not in the atoms as sweetness is in honey; they are what a composite does to a perceiver. Necessity, not a Nous that plans, governs the collisions. This is the pluralist answer to Parmenides that refuses a purpose.",
        cite: "DK 68 A37, B9; Aristotle, Metaphysics A.4",
      },
      {
        title: "Cheerfulness",
        text: "The ethical goal reported for him is euthymia, cheerfulness: a state in which the soul is not shaken by fear or superstition, and pleasure is measured rather than maximized in a heap. Whether the ethical books and the physical books were one project is a real question. The tradition thought they were one man.",
        cite: "DK 68 B191 and the ethical fragments",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia — Democritus",
        note: "Life, the catalogue of books, physics, and ethics.",
        href: `${SEP}democritus/`,
      },
      {
        label: "Stanford Encyclopedia — Ancient atomism",
        note: "The school he shares with Leucippus, where the authorship is honestly blurred.",
        href: `${SEP}atomism-ancient/`,
      },
      {
        label: "Aristotle, Metaphysics A",
        note: "English on Perseus. His chapter on the atomists is the most important ancient report, and it is not neutral.",
        href: `${P}1999.01.0052`,
      },
    ],
  },
  {
    id: "hippocrates",
    name: "Hippocrates",
    greek: "Ἱπποκράτης",
    generation: "rising",
    originId: "cos",
    seats: [],
    schools: ["medical"],
    dates: "traditional dates c. 460–c. 370 BCE",
    stance: "Of Cos. The name of a school and of a corpus. If the traditional birth year is right, the man is a child in 450. The treatises are later, and they are not one man’s book.",
    caution:
      "Almost nothing in the Hippocratic Corpus is signed, and the Oath’s date is disputed — it may be later than this century. ‘Hippocrates says’ is usually a way of saying ‘a treatise in the corpus says.’ The Coan and Cnidian collections were already being told apart in antiquity. This pin marks the Coan medical tradition, not an authorial hand.",
    doctrines: [
      {
        title: "The sacred disease is not more sacred",
        text: "On the Sacred Disease argues that epilepsy is no more divine than any other disease. It has a nature and a cause, and the cause is in the body — the brain, phlegm, bile — not in a god who can be bought off by a purifier. Calling a disease sacred is, the writer says, a cover for ignorance. This is the medical counterpart of Xenophanes’ attack on poetic theology.",
        cite: "On the Sacred Disease",
      },
      {
        title: "Place, season, people",
        text: "Airs, Waters, Places ties constitutions and even customs to winds, water, and exposure. A physician who does not know the city will misread the patient. It is also an ethnography of Europe and Asia that a reader of Herodotus will recognize as the same generation’s question: why are peoples different, and what kind of cause is allowed to count.",
        cite: "Airs, Waters, Places",
      },
      {
        title: "Prognosis, not a wonder",
        text: "The practical center of the corpus is prognosis: say what will happen, and say it from signs. That art is how a physician is distinguished from a magician in these texts. On Ancient Medicine argues, against philosophers, that medicine already has a method and does not need a new hypothesis about hot, cold, or a single arche. The polemic is aimed at people elsewhere on this plate.",
        cite: "Prognostic; On Ancient Medicine",
      },
    ],
    sources: [
      {
        label: "Internet Encyclopedia of Philosophy — Hippocrates",
        note: "Corpus, authorship, and the philosophical treatises, with the skepticism the case requires.",
        href: `${IEP}hippocra/`,
      },
      {
        label: "Hippocratic Corpus, volume I (Jones)",
        note: "English on Perseus. Includes On Ancient Medicine. Not a collected works you should treat as one author.",
        href: `${P}1999.01.0251`,
      },
      {
        label: "Airs, Waters, Places — public-domain English",
        note: "Internet Classics Archive. An older translation. Check a modern edition before you quote it in print.",
        href: `${MIT}Hippocrates/airwatpl.html`,
      },
      {
        label: "The Oath",
        note: "English on Perseus. Read it as a school document of uncertain date, not as his autograph.",
        href: `${P}1999.01.0252`,
      },
    ],
  },
  {
    id: "prodicus",
    name: "Prodicus",
    greek: "Πρόδικος",
    generation: "prime",
    originId: "ceos",
    seats: ["athens"],
    schools: ["sophist"],
    dates: "later 5th century BCE; the birth date is loose",
    stance: "Of Ioulis on Ceos. Plato presents him as younger than Protagoras and as a specialist: the man who distinguishes words the rest of us use as if they were the same.",
    caution:
      "Dates float. He may already have been teaching late in the 440s, or he may be a figure of the war years. He is filed here, not under Rising, because the sources do not fix a birth year the way they fix Socrates’.",
    doctrines: [
      {
        title: "The correctness of names",
        text: "Orthotēs onomatōn: near-synonyms are not synonyms. Plato has him separate ‘pleasure’ from ‘enjoyment’ and ‘delight’ until Socrates begs him to stop, which is comedy with a real practice underneath. If speech is the sophist’s instrument, the instrument has to be calibrated. Cratylus is Plato’s later dialogue about whether names are natural or conventional; Prodicus is one of the people that argument remembers.",
        cite: "Plato, Protagoras 337a–c; Cratylus",
      },
      {
        title: "The choice of Heracles",
        text: "Xenophon says he is paraphrasing a display-speech of Prodicus: Heracles at the crossroads, Virtue on one side and Vice on the other. The speech we have is Xenophon’s prose, not a transcript. What it shows is the form — a moral epideixis, suitable for the young, and famous enough to be retold.",
        cite: "Xenophon, Memorabilia 2.1.21–34",
      },
      {
        title: "How gods get their names",
        text: "A report, not a surviving essay: early humans treated as gods whatever benefited them — sun, moon, rivers, bread, wine — and the names followed the benefits. It is the most explicit fifth-century account we hear of religion as a human invention. Sextus and others are the reporters. Grade it as doxography.",
        cite: "DK 84 B5",
      },
    ],
    sources: [
      {
        label: "Internet Encyclopedia of Philosophy — Sophists",
        note: "The Prodicus section: synonyms, Heracles, and the theology.",
        href: `${IEP}sophists/`,
      },
      {
        label: "Xenophon, Memorabilia",
        note: "English on Perseus. Book 2, chapter 1 is the Choice of Heracles, explicitly marked as a paraphrase.",
        href: `${P}1999.01.0208:book=2:chapter=1`,
      },
      {
        label: "Plato, Cratylus",
        note: "English on Perseus. The dialogue about names. Prodicus is named; the theory is Plato’s.",
        href: `${P}1999.01.0172`,
      },
    ],
  },
  {
    id: "hippias",
    name: "Hippias",
    greek: "Ἱππίας",
    generation: "rising",
    originId: "elis",
    seats: ["athens"],
    schools: ["sophist"],
    dates: "later 5th century BCE",
    stance: "Of Elis. A polymath who showed at Olympia: memory systems, mathematics, poetry, the making of his own clothes and rings. Documented activity belongs to the last third of the century. In 450 he is at most a boy.",
    caution:
      "Plato’s Hippias Major and Hippias Minor are hostile portraits. The Major’s authenticity has been doubted. Neither is a source for his wording. The quadratrix sometimes called the quadratrix of Hippias may belong to a later Hippias. Do not give him the curve without a warning.",
    doctrines: [
      {
        title: "The polymath as a program",
        text: "Where Protagoras sells political excellence and Prodicus sells distinctions, Hippias sells range. Plato has him claim to arrive at Olympia wearing and using only what he had made himself, and to be ready to speak on anything from memory. Even as mockery, the scene preserves the advertisement: the sophist as a one-man encyclopedia, performing in the panhellenic circuit, not only in Athens.",
        cite: "Plato, Hippias Minor 368b–d",
      },
      {
        title: "Nature against the law of cities",
        text: "In the Protagoras, Plato gives him a speech to the effect that like-minded men are kin by nature, and the laws of cities, which treat them as strangers, do violence to that kinship. It is one sentence in a fictional gathering. It is also the nomos/physis thesis in a political key, parallel to Antiphon’s papyrus and not the same argument. Elis, not Athens, is his city — and in the war years Elis is not on Athens’ side.",
        cite: "Plato, Protagoras 337c–d",
      },
    ],
    sources: [
      {
        label: "Internet Encyclopedia of Philosophy — Sophists",
        note: "The Hippias section, with Plato’s mockery labeled as Plato’s.",
        href: `${IEP}sophists/`,
      },
      {
        label: "Plato, Greater Hippias",
        note: "English on Perseus. Authenticity disputed. A conversation about the fine (kalon), not a life.",
        href: `${P}1999.01.0180`,
      },
      {
        label: "Plato, Protagoras",
        note: "Public-domain English. The gathering of sophists in which Hippias is given his nature-and-law remark.",
        href: `${MIT}Plato/protagoras.html`,
      },
    ],
  },
];

const generationRank = { prior: 0, prime: 1, rising: 2 } as const;

export const thinkersById: Record<string, Thinker> = Object.fromEntries(
  thinkers.map((t) => [t.id, t]),
);

for (const t of thinkers) {
  if (!placesById[t.originId]) throw new Error(`Unknown origin for ${t.id}`);
  for (const seat of t.seats) {
    if (!placesById[seat]) throw new Error(`Unknown seat ${seat} for ${t.id}`);
  }
  for (const school of t.schools) {
    if (!schoolById[school]) throw new Error(`Unknown school ${school} for ${t.id}`);
  }
}

export function sortThinkers(list: Thinker[]): Thinker[] {
  return [...list].sort((a, b) => {
    const g = generationRank[a.generation] - generationRank[b.generation];
    if (g !== 0) return g;
    return a.name.localeCompare(b.name);
  });
}
