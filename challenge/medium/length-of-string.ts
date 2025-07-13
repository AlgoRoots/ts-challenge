import { Expect, Equal } from "@lib/testing";

// @TIP @Check string length 세려면 배열로 만들기
type LengthOfString<
  S extends string,
  C extends string[] = []
> = S extends `${infer F}${infer A}`
  ? LengthOfString<A, [F, ...C]>
  : C["length"];

type a = LengthOfString<"">;
type b = LengthOfString<"kumiko">;
type cases = [
  Expect<Equal<LengthOfString<"">, 0>>,
  Expect<Equal<LengthOfString<"kumiko">, 6>>,
  Expect<Equal<LengthOfString<"reina">, 5>>,
  Expect<Equal<LengthOfString<"Sound! Euphonium">, 16>>
];
