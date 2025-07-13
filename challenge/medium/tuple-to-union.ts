import { Expect, Equal } from "@lib/testing";

type TupleToUnion<T extends any[]> = T extends Array<infer P> ? P : never;

type TupleToUnion2<T extends unknown[]> = T[number];

type cases = [
  Expect<Equal<TupleToUnion<[123, "456", true]>, 123 | "456" | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>
];
