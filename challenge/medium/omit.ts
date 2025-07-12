import { Expect, Equal } from "@lib/testing";

// @TIP keyof T as ...
// key remapping
type MyOmit<T, K extends keyof T> = {
  [Key in keyof T as Key extends K ? never : Key]: T[Key];
};

// readonly, optional 속성에서 에러
// @TIP Mapped Type 기본동작 : 속성의 Modifier(readonly, ?)를 보존하지 않는다.
type Exclude<T, U> = T extends U ? never : T;
type MyOmit3<T, K extends keyof T> = { [P in Exclude<keyof T, K>]: T[P] };

type a = MyOmit<Todo1, "description" | "completed">;

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, "description">>>,
  Expect<Equal<Expected2, MyOmit<Todo, "description" | "completed">>>,
  Expect<Equal<Expected3, MyOmit<Todo1, "description" | "completed">>>
];

// @ts-expect-error
type error = MyOmit<Todo, "description" | "invalid">;

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Todo1 {
  readonly title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
  completed: boolean;
}

interface Expected2 {
  title: string;
}

interface Expected3 {
  readonly title: string;
}
