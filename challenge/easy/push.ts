import { Equal, Expect } from "@lib/testing";

type Push<T extends unknown[], U> = [...T, U];

type a = Push<[], 1>;
type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], "3">, [1, 2, "3"]>>,
  Expect<Equal<Push<["1", 2, "3"], boolean>, ["1", 2, "3", boolean]>>
];
