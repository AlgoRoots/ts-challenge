import { Equal, Expect } from "@lib/testing";

type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

interface Pokemon {
  name: string;
  type: string;
  hitPoints: number;
  stage: string;
  evolutionStage: number;
  attacks: string[];
  weakness: string;
  resilience: string;
}

function foo(arg1: string, arg2: number): void {}
function bar(arg1: boolean, arg2: { a: "A" }): void {}
function baz(): void {}

type a = MyParameters<typeof foo>;
type b = typeof foo;

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: "A" }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>
];
