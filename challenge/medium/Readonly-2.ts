import { Alike, Expect } from "@lib/testing";

// @TIP readonly 만들고 K 아닌건 따로 join
type MyReadonly2<T extends object, K extends keyof T = keyof T> = {
  readonly [Key in K]: T[Key];
} & {
  [Key in keyof T as Key extends K ? never : Key]: T[Key];
};

type a = MyReadonly2<Todo1>;
type b = MyReadonly2<Todo2>;
type c = MyReadonly2<Todo2, "description">;

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, "title" | "description">, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, "title" | "description">, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, "description">, Expected>>
];

// @ts-expect-error
type error = MyReadonly2<Todo1, "title" | "invalid">;

interface Todo1 {
  title: string;
  description?: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  description?: string;
  completed: boolean;
}

interface Expected {
  readonly title: string;
  readonly description?: string;
  completed: boolean;
}
