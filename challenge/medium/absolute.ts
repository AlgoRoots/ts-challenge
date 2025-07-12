import { Expect, Equal } from "@lib/testing";

// @TIP template literal types
type NumericString<T extends string> = `${T}` extends `${number}` ? T : never;
type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer R}`
  ? NumericString<R>
  : NumericString<`${T}`>;

type cases = [
  Expect<Equal<Absolute<0>, "0">>,
  Expect<Equal<Absolute<-0>, "0">>,
  Expect<Equal<Absolute<10>, "10">>,
  Expect<Equal<Absolute<-5>, "5">>,
  Expect<Equal<Absolute<"0">, "0">>,
  Expect<Equal<Absolute<"-0">, "0">>,
  Expect<Equal<Absolute<"10">, "10">>,
  Expect<Equal<Absolute<"-5">, "5">>,
  Expect<Equal<Absolute<-1_000_000n>, "1000000">>,
  Expect<Equal<Absolute<9_999n>, "9999">>
];
