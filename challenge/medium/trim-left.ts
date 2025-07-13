import { Expect, Equal } from "@lib/testing";

//@NOTE recursive
export type TrimLeft<S extends string> = S extends `${
  | " "
  | "\n"
  | "\t"}${infer Rest}`
  ? TrimLeft<Rest>
  : S;

type a = TrimLeft<"str">;
type b = TrimLeft<" str">;
type cases = [
  Expect<Equal<TrimLeft<"str">, "str">>,
  Expect<Equal<TrimLeft<" str">, "str">>,
  Expect<Equal<TrimLeft<"     str">, "str">>,
  Expect<Equal<TrimLeft<"     str     ">, "str     ">>,
  Expect<Equal<TrimLeft<"   \n\t foo bar ">, "foo bar ">>,
  Expect<Equal<TrimLeft<"">, "">>,
  Expect<Equal<TrimLeft<" \n\t">, "">>
];
