import { Expect, Equal } from "@lib/testing";

type MyReadonly<T extends object> = {
  readonly [K in keyof T]: T[K];
};

type cases = [Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>];

interface Todo1 {
  title: string;
  description: string;
  completed: boolean;
  meta: {
    author: string;
  };
}
type a = Readonly<Todo1>;
