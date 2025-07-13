import { Expect, Equal } from "@lib/testing";

type AppendToObject<T, U extends PropertyKey, V> = {
  [K in keyof (T & Record<U, V>)]: (T & Record<U, V>)[K];
};

// @TIP PropertyKey, Omit
// Use Omit<T,never> to flat the object.
type AppendToObject2<T, U extends PropertyKey, V> = Omit<
  T & Record<U, V>,
  never
>;
type AppendToObject3<T, U extends PropertyKey, V> = {
  [K in keyof (T & Record<U, V>)]: K extends keyof T ? T[K] : V;
};

type test1 = {
  key: "cat";
  value: "green";
};

type a = AppendToObject<test1, "home", boolean>;
const c: a = {
  home: true,
  key: "cat",
  value: "green",
};
type testExpect1 = {
  key: "cat";
  value: "green";
  home: boolean;
};

type test2 = {
  key: "dog" | undefined;
  value: "white";
  sun: true;
};

type testExpect2 = {
  key: "dog" | undefined;
  value: "white";
  sun: true;
  home: 1;
};

type test3 = {
  key: "cow";
  value: "yellow";
  sun: false;
};

type testExpect3 = {
  key: "cow";
  value: "yellow";
  sun: false;
  moon: false | undefined;
};

type cases = [
  Expect<Equal<AppendToObject<test1, "home", boolean>, testExpect1>>,
  Expect<Equal<AppendToObject<test2, "home", 1>, testExpect2>>,
  Expect<Equal<AppendToObject<test3, "moon", false | undefined>, testExpect3>>
];
