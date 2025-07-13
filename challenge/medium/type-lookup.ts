import { Expect, Alike, Equal } from "@lib/testing";

type MyExtract<T, K> = T extends K ? T : never;
type LookUp<U extends { type: any }, T extends U["type"]> = MyExtract<
  U,
  { type: T }
>;

interface Cat {
  type: "cat";
  breeds: "Abyssinian" | "Shorthair" | "Curl" | "Bengal";
}

interface Dog {
  type: "dog";
  breeds: "Hound" | "Brittany" | "Bulldog" | "Boxer";
  color: "brown" | "white" | "black";
}

type Animal = Cat | Dog;

type cases = [
  Expect<Equal<LookUp<Animal, "dog">, Dog>>,
  Expect<Equal<LookUp<Animal, "cat">, Cat>>
];
