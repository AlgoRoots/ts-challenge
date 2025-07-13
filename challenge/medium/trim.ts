import { Expect, Equal } from "@lib/testing";
type TrimLeft<S extends string> = S extends `${" " | "\n" | "\t"}${infer Rest}`
  ? TrimLeft<Rest>
  : S;

type TrimRight<S extends string> = S extends `${infer Rest}${" " | "\n" | "\t"}`
  ? TrimRight<Rest>
  : S;

type Trim<S extends string> = TrimLeft<S> extends `${infer Rest}${
  | " "
  | "\n"
  | "\t"}`
  ? TrimRight<Rest>
  : TrimLeft<S>;

type Trim00<S extends string> = TrimLeft<TrimRight<S>>;

// @TIP union type
type Whitespace = " " | "\n" | "\t";

type Trim2<S extends string> = S extends
  | `${Whitespace}${infer Word}`
  | `${infer Word}${Whitespace}`
  ? Trim<Word>
  : S;

type Trim3<S extends string> = S extends `${Whitespace}${infer Right}`
  ? Trim<Right>
  : S extends `${infer R}${Whitespace}`
  ? Trim<R>
  : S;

type a = Trim<" str ">;

type cases = [
  Expect<Equal<Trim<"str">, "str">>,
  Expect<Equal<Trim<" str">, "str">>,
  Expect<Equal<Trim<"     str">, "str">>,
  Expect<Equal<Trim<"str   ">, "str">>,
  Expect<Equal<Trim<"     str     ">, "str">>,
  Expect<Equal<Trim<"   \n\t foo bar \t">, "foo bar">>,
  Expect<Equal<Trim<"">, "">>,
  Expect<Equal<Trim<" \n\t ">, "">>
];
