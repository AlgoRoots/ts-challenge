import { Expect, Equal } from "@lib/testing";
type First<T extends any[]> = T extends [] ? never : T[0];

// @TIP length
type First2<T extends any[]> = T["length"] extends 0 ? never : T[0];

type First3<T extends any[]> = T extends [infer First, ...any[]]
  ? First
  : never;

type a = First<[]>;
type b = First<[undefined]>;
type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>
];

type errors = [
  // @ts-expect-error
  First<"notArray">,
  // @ts-expect-error
  First<{ 0: "arrayLike" }>
];
