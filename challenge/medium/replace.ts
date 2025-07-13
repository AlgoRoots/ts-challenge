import { Expect, Equal } from "@lib/testing";

export type Replace<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer Start}${From}${infer End}`
  ? From extends ""
    ? S
    : `${Start}${To}${End}`
  : S;

// @TIP exclude를 from에서 추상화하면 조건부 한번 더 안해도 됨
type Replace2<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer Start}${Exclude<From, "">}${infer End}`
  ? `${Start}${To}${End}`
  : S;

type a = Replace<"foobarbar", "bar", "foo">;
type b = Replace<"foobarbar", "", "foo">; // ffoooobarbar
type ㅊ = Replace<"types are fun!", "fun", "awesome">;

type cases = [
  Expect<Equal<Replace<"foobar", "bar", "foo">, "foofoo">>,
  Expect<Equal<Replace<"foobarbar", "bar", "foo">, "foofoobar">>,
  Expect<Equal<Replace<"foobarbar", "", "foo">, "foobarbar">>,
  Expect<Equal<Replace<"foobarbar", "bar", "">, "foobar">>,
  Expect<Equal<Replace<"foobarbar", "bra", "foo">, "foobarbar">>,
  Expect<Equal<Replace<"", "", "">, "">>
];
