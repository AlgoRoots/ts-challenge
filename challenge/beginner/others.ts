//#######################################################################

import { Expect, Equal, Extends } from "@lib/testing";
/**
 * Index Signatures
 */

type GroceryList = {
  [name: string]: number;
};

type InappropriateActionBySituation = {
  [situation: string]: string[];
};

type CharactersById = {
  [id: number]: {
    id: number;
    name: string;
    status: string;
    species: string;
  };
};

/////////////////////////////////TEST//////////////////////////////////

const groceryList: GroceryList = {
  carrots: 5,
  potatoes: 12,
  sweetPotatoes: 2,
  turnips: 1,
  parsnips: 1,
  beets: 10,
  radishes: 2,
  rutabagas: 1,
  onions: 3,
  garlic: 2,

  // @ts-expect-error intentionally invalid because the value is a string, not a number
  shouldError: "because it's a string",

  // @ts-expect-error intentionally invalid because the value is a boolean, not a number
  shouldAlsoError: true,
};

const inappropriateActionBySituation: InappropriateActionBySituation = {
  funeral: [
    "excessive laughter",
    "bringing up personal achievements",
    'insisting everyone joins you in loudly singing the 1991 Queen track "The Show Must Go On"',
  ],
  medicalDiagnosis: [
    "jokes about American healthcare",
    "arguing that WebMD says otherwise",
    "doomscrolling twitter instead of listening",
  ],
  leetcodeInterview: [
    "praise of CSS",
    "citing XKCD comics by number from memory",
    "use of emojis in whiteboard exercises followed by pontificating about your deep knowledge of UTF-16",
  ],
  friendExperiencingHeartbreak: [
    "victory dance because you hated their S.O.",
    "offers to turn on the 1999 cinematic masterpiece, The Mummy, with Brendan Fraser and Rachel Weisz",
  ],

  // @ts-expect-error intentionally invalid because the value is a string, not a string array
  romanticDate:
    "checking your phone incessantly for a new Primeagen video to drop", // cspell:disable-line
};

const charactersById: CharactersById = {
  1: {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
  },
  2: {
    id: 2,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
  },
  3: {
    id: 3,
    name: "Summer Smith",
    status: "Alive",
    species: "Human",
  },
  4: {
    id: 4,
    name: "Beth Smith",
    status: "Alive",
    species: "Human",
  },
  5: {
    id: 5,
    name: "Jerry Smith",
    status: "Alive",
    species: "Human",
  },

  // @ts-expect-error string keys are not allowed
  unity: {
    id: 6,
    status: "Alive",
    species: "Hive Mind",
  },
};

//#######################################################################

/**
 * Indexed Types
 */

type TheCoolestCarEverMade = Cars[4];
type TruckDriverBonusGiver = Donations["Taylor Swift"];

/////////////////////////////////TEST//////////////////////////////////

type Cars = ["Bugatti", "Ferarri", "Lambo", "Porsche", "Toyota Corolla"];

type Donations = {
  Bono: 15_000_000;
  "J.K. Rowling": 160_000_000;
  "Taylor Swift": 45_000_000;
  "Elton John": 600_000_000;
  "Angelina Jolie and Brad Pitt": 100_000_000;
};

type test_TheCoolestCarEverMade = Expect<
  Equal<TheCoolestCarEverMade, "Toyota Corolla">
>;

type test_TruckDriverBonusGiver = Expect<
  Equal<TruckDriverBonusGiver, 45_000_000>
>;

//#######################################################################

/**
 * The `keyof` operator
 */

type Artist = keyof typeof casettesByArtist;

/////////////////////////////////TEST//////////////////////////////////

const casettesByArtist = {
  "Alanis Morissette": 2,
  "Mariah Carey": 8,
  Nirvana: 3,
  Oasis: 2,
  Radiohead: 3,
  "No Doubt": 3,
  "Backstreet Boys": 3,
  "Spice Girls": 2,
  "Green Day": 2,
  "Pearl Jam": 5,
  Metallica: 5,
  "Guns N' Roses": 2,
  U2: 3,
  Aerosmith: 4,
  "R.E.M.": 4,
  Blur: 3,
  "The Smashing Pumpkins": 5,
  "Britney Spears": 3,
  "Whitney Houston": 3,
};

const getCasetteCount = (artist: Artist) => {
  return casettesByArtist[artist];
};

// should work just fine for a valid artist
getCasetteCount("Mariah Carey");

// should error for artists that are not part of the original
// @ts-expect-error invalid input
getCasetteCount("Red Hot Chili Peppers");

//#######################################################################

/**
 * Literal Types
 */

type LiteralString = "chocolate chips";
type LiteralTrue = true;
type LiteralNumbers = 1 | 2 | 3 | 4 | 5 | 6;
type LiteralObject = {
  name: "chocolate chips";
  inStock: true;
  kilograms: 5;
};
type LiteralFunction = (a: number, b: number) => number;

const literalString = "Ziltoid the Omniscient";
const literalTrue = true;
const literalNumber = Math.random() > 0.5 ? 1 : 2;
const literalObject = {
  origin: "string",
  command: "string",
  item: "string",
  time: "string",
};
const almostPi = 3.141592653589793;

const literalFunction = (a: number, b: string) => {
  if (typeof a === "number") return a;
  if (typeof b === "string") return b;
  return a;
};

/////////////////////////////////TEST//////////////////////////////////

type test_LiteralString = Expect<Equal<LiteralString, "chocolate chips">>;

type test_LiteralTrue = Expect<Equal<LiteralTrue, true>>;

type test_LiteralNumber = Expect<Equal<LiteralNumbers, 1 | 2 | 3 | 4 | 5 | 6>>;

type test_LiteralObject = Expect<
  Equal<
    LiteralObject,
    {
      name: "chocolate chips";
      inStock: true;
      kilograms: 5;
    }
  >
>;

type test_LiteralFunction = Expect<
  Equal<LiteralFunction, (a: number, b: number) => number>
>;

type test_literalString = Expect<
  Equal<typeof literalString, "Ziltoid the Omniscient">
>;

type test_literalTrue = Expect<Equal<typeof literalTrue, true>>;

type test_literalNumber = Expect<Equal<typeof literalNumber, 1 | 2>>;

type test_almostPi = Expect<
  Equal<
    typeof almostPi,
    3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196442881097566593344612847564823378678316527120190914564856692346034861045432664821339360726024914127372458700660631558817488152092096282925409171536436789259036001133053054882046652138414695194151160943305727036575959195309218611738193261179310511854807446237996274956735188575272489122793818301194912983367336244065664308602139494639522473719070217986094370277053921717629317675238467481846766940513200056812714526356082778577134275778960917363717872146844090122495343014654958537105079227968925892354201995611212902196086403441815981362977477130996051870721134999999837297804995105973173281609631859502445945534690830264252230825334468503526193118817101000313783875288658753320838142061717766914730359825349042875546873115956286388235378759375195778185778053217122680661300192787661119590921642019891337
  >
>;

type test_literalObject = Expect<
  Equal<
    typeof literalObject,
    {
      origin: string;
      command: string;
      item: string;
      time: string;
    }
  >
>;

type test_literalFunction = Expect<
  Equal<typeof literalFunction, (a: number, b: string) => string | number>
>;

//#######################################################################
/**
 * Mapped Object Types
 */

type MovieInfoByGenre<T> = {
  [K in keyof T]: {
    name: string;
    year: number;
    director: string;
  };
};

/////////////////////////////////TEST//////////////////////////////////

type MoviesByGenre = {
  action: "Die Hard";
  comedy: "Groundhog Day";
  sciFi: "Blade Runner";
  fantasy: "The Lord of the Rings: The Fellowship of the Ring";
  drama: "The Shawshank Redemption";
  horror: "The Shining";
  romance: "Titanic";
  animation: "Toy Story";
  thriller: "The Silence of the Lambs";
};

const test_MoviesInfoByGenre: MovieInfoByGenre<MoviesByGenre> = {
  action: {
    name: "Die Hard",
    year: 1988,
    director: "John McTiernan",
  },
  comedy: {
    name: "Groundhog Day",
    year: 1993,
    director: "Harold Ramis",
  },
  sciFi: {
    name: "Blade Runner",
    year: 1982,
    director: "Ridley Scott",
  },
  fantasy: {
    name: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    director: "Peter Jackson",
  },
  drama: {
    name: "The Shawshank Redemption",
    year: 1994,
    director: "Frank Darabont",
  },
  horror: {
    name: "The Shining",
    year: 1980,
    director: "Stanley Kubrick",
  },
  romance: {
    name: "Titanic",
    year: 1997,
    director: "James Cameron",
  },
  animation: {
    name: "Toy Story",
    year: 1995,
    director: "John Lasseter",
  },
  thriller: {
    name: "The Silence of the Lambs",
    year: 1991,
    director: "Jonathan Demme",
  },
};

type test_MovieInfoByGenre = Expect<
  Equal<
    MovieInfoByGenre<MoviesByGenre>,
    {
      action: {
        name: string;
        year: number;
        director: string;
      };
      comedy: {
        name: string;
        year: number;
        director: string;
      };
      sciFi: {
        name: string;
        year: number;
        director: string;
      };
      fantasy: {
        name: string;
        year: number;
        director: string;
      };
      drama: {
        name: string;
        year: number;
        director: string;
      };
      horror: {
        name: string;
        year: number;
        director: string;
      };
      romance: {
        name: string;
        year: number;
        director: string;
      };
      animation: {
        name: string;
        year: number;
        director: string;
      };
      thriller: {
        name: string;
        year: number;
        director: string;
      };
    }
  >
>;

//#######################################################################
/**
 * Primitive Data Types
 */

const playSong = (artistName: string, year: number) => {
  return `${artistName} was released in the year ${year}`;
};

const artistName: string = "Frank Zappa";

const age: number = 52;

interface Musician {
  artistName: string;
  age: number;
  deceased: boolean;
}

const musicianInfo = ({ artistName, age, deceased }: Musician) => {
  return `${artistName}, age ${age}${deceased ? " (deceased)" : ""}`;
};

musicianInfo({
  artistName,
  age,
  deceased: true,
});

/*/////

Don't worry if you don't quite understand how these types work.

Just do your best to add type annotations wherever you can.

And if nothing else, there's no shame in looking at the solutions at this point. You're just getting warmed up!

/////*/

// this is correFct! :)
playSong("Demiurge", 2012);

// @ts-expect-error this is incorrect because the first argument should not be a number
playSong(8675309, 1982);

// @ts-expect-error this is incorrect because the second argument should not be a string
playSong("Blood and Thunder", "2006");

type test_playSong_Parameters = Expect<
  Equal<Parameters<typeof playSong>, [string, number]>
>;

type test_playSong_ReturnType = Expect<
  Equal<ReturnType<typeof playSong>, string>
>;

type test_age = Expect<Extends<number, typeof age>>;
type test_artistName = Expect<Extends<string, typeof artistName>>;

type test_Musician_artistName = Expect<Equal<Musician["artistName"], string>>;

type test_Musician_age = Expect<Equal<Musician["age"], number>>;

type test_Musician_deceased = Expect<Equal<Musician["deceased"], boolean>>;

type test_musicianInfo_Parameters = Expect<
  Equal<Parameters<typeof musicianInfo>[0], Musician>
>;

type test_musicianInfo_ReturnType = Expect<
  Equal<ReturnType<typeof musicianInfo>, string>
>;

/////////////////////////////////TEST//////////////////////////////////
/**
 * Mapped Object Types
 */

/////////////////////////////////TEST//////////////////////////////////
/**
 * Mapped Object Types
 */

/////////////////////////////////TEST//////////////////////////////////
/**
 * Mapped Object Types
 */

/////////////////////////////////TEST//////////////////////////////////
