import { Expect, Equal } from "@lib/testing";

// @TIP 튜플로 인자 추가 ...args:[...Args, x:A]
type AppendArgument<Fn extends (...args: any) => any, A> = Fn extends (
  ...args: infer Args
) => infer Return
  ? (...args: [...Args, x: A]) => Return
  : Fn;

type Case1 = AppendArgument<(a: number, b: string) => number, boolean>;
type Result1 = (a: number, b: string, x: boolean) => number;

type Case2 = AppendArgument<() => void, undefined>;
type Result2 = (x: undefined) => void;

type cases = [
  Expect<Equal<Case1, Result1>>,
  Expect<Equal<Case2, Result2>>,
  // @ts-expect-error
  AppendArgument<unknown, undefined>
];
