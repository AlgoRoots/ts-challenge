import { Expect, Equal } from "@lib/testing";

type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer Start}${Exclude<From, "">}${infer End}`
  ? `${Start}${To}${ReplaceAll<End, From, To>}`
  : S;

type a = ReplaceAll<"foobarfoobar", "ob", "b">; // fbarfbar // fobarfobar
type b = ReplaceAll<"foboorfoboar", "bo", "b">; //"fobrfobar" // foborfobar
type c = ReplaceAll<"t y p e s", " ", "">; //""typ e s"" // foborfobar
// t y p e s
// ty p e s
// typ e s
// type s
// types
type cases = [
  Expect<Equal<ReplaceAll<"foobar", "bar", "foo">, "foofoo">>,
  Expect<Equal<ReplaceAll<"foobar", "bag", "foo">, "foobar">>,
  Expect<Equal<ReplaceAll<"foobarbar", "bar", "foo">, "foofoofoo">>,
  Expect<Equal<ReplaceAll<"t y p e s", " ", "">, "types">>,
  Expect<Equal<ReplaceAll<"foobarbar", "", "foo">, "foobarbar">>,
  Expect<Equal<ReplaceAll<"barfoo", "bar", "foo">, "foofoo">>,
  Expect<Equal<ReplaceAll<"foobarfoobar", "ob", "b">, "fobarfobar">>,
  Expect<Equal<ReplaceAll<"foboorfoboar", "bo", "b">, "foborfobar">>,
  Expect<Equal<ReplaceAll<"", "", "">, "">>
];
