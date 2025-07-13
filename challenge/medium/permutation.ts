import { Expect, Equal } from "@lib/testing";

// @TIP @Check T extends T 분산 조건부 타입을 트리거함
// T = "A" | "B" | "C"일 때 각각에 대해 분기
// "A" extends "A" → ...
// "B" extends "B" → ...
// "C" extends "C" → ...
// 분산 막고 싶으면 [T] extends [T]

type Permutation<T, Acc = T> = [T] extends [never]
  ? []
  : Acc extends Acc
  ? [Acc, ...Permutation<Exclude<T, Acc>>]
  : never;

type cases = [
  Expect<Equal<Permutation<"A">, ["A"]>>,
  Expect<
    Equal<
      Permutation<"A" | "B" | "C">,
      | ["A", "B", "C"]
      | ["A", "C", "B"]
      | ["B", "A", "C"]
      | ["B", "C", "A"]
      | ["C", "A", "B"]
      | ["C", "B", "A"]
    >
  >,
  Expect<
    Equal<
      Permutation<"B" | "A" | "C">,
      | ["A", "B", "C"]
      | ["A", "C", "B"]
      | ["B", "A", "C"]
      | ["B", "C", "A"]
      | ["C", "A", "B"]
      | ["C", "B", "A"]
    >
  >,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>
];
