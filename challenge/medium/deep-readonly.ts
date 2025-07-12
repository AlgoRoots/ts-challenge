import { Expect, Equal } from "@lib/testing";

type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

// type DeepReadonly<T extends object> = T[keyof T] extends object
//   ? DeepReadonly<T[keyof T]>
//   : MyReadonly<T>;

type DeepReadonlyFailed<T extends object> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

/**
 * @NOTE 이 접근 방식이 안되는 이유.
 *
 * Function extends Record<string,any>!
 * ```
 * type IsTrue = Function extends Record<string, any> ? true : false // true
 * type StillTrue = Function extends { [key: string]: any } ? true : false // true
 * type OfCourseTrue = Function extends object ? true : false // true
 * ```
 *
 * Is Real Object ?
 * To solve this, we could write a IsObject utility to tell if a type is a real object:
 * ```
 * type IsObject<T> = T extends Record<string, any>
 * ? T extends Function ? false : true
 * : false
 *
 * ```
 * 
 * With this, we could then change our original answer to: 
 * ```
 * type DeepReadonly<T extends Record<string, any>> =
	{
		readonly [P in keyof T]: IsObject<T[P]> extends true
			? DeepReadonly<T[P]>
			: T[P]
	}
 * ```
 * Alternative Solution: Checking Type of Keys
 * If something doesn't have keys, it must be an object. This fact can even exclude functions:
 * ```
 * type IsNever = keyof (() => {}) // never
   type IsString = keyof Record<string, any> // string
   ```

    ```
    type DeepReadonly<T extends Record<string, any>> =
        {
            readonly [P in keyof T]: keyof T[P] extends string
                ? DeepReadonly<T[P]>
                : T[P]
        }
    ```
 * If keyof T[P] extends string - it is an object, then we go to next recursion, otherwise it is not an object,
 * we return it directly.

 * But this doesn't pass the test at all. If we take a depp look, everything is DeepReadonly ed. why? 
 * The reason is another deep hole: never extends anything is true!

  type neverCases = [
	Expect<Equal<never extends boolean ? true : false, true>>,
	Expect<Equal<never extends number ? true : false, true>>,
	Expect<Equal<never extends string ? true : false, true>>,
	Expect<Equal<never extends symbol ? true : false, true>>,
	Expect<Equal<never extends object ? true : false, true>>,
	Expect<Equal<never extends [] ? true : false, true>>,
	Expect<Equal<never extends Function ? true : false, true>>,
	Expect<Equal<never extends 'wtf' ? true : false, true>>,
]
 * 
 * To solve this, we should check if the key is never instead:
 * 
 * type DeepReadonly<T extends Record<string, any>> =
    {
        readonly [P in keyof T]: keyof T[P] extends never
            ? T[P]
            : DeepReadonly<T[P]>
    }
 *  */

type DeepReadonlyF2<T extends Record<string, any>> = {
  readonly [K in keyof T]: T[K] extends Record<string, any>
    ? DeepReadonlyF2<T[K]>
    : T[K];
};

// solution 1
type IsObject<T> = T extends Record<string, any>
  ? T extends Function
    ? false
    : true
  : false;

type DeepReadonly1<T extends Record<string, any>> = {
  readonly [P in keyof T]: IsObject<T[P]> extends true
    ? DeepReadonly1<T[P]>
    : T[P];
};

// @Note never 로 재귀 차단 ! never은 모든 타입의 서브타입, 어떤 조건에도 Extends 판별에서 true, Function 의 keyof 는 never
// type DeepReadonly<T extends Record<string, any>> = {
//   readonly [K in keyof T]: keyof T[K] extends never ? T[K] : DeepReadonly<T[K]>;
// };

type DeepReadonly<T extends Record<string, any>> = {
  readonly [P in keyof T]: keyof T[P] extends never ? T[P] : DeepReadonly<T[P]>;
};

type a = DeepReadonly<X1>;
type b = DeepReadonly<X2>;

type cases = [
  Expect<Equal<DeepReadonly<X1>, Expected1>>,
  Expect<Equal<DeepReadonly<X2>, Expected2>>
];

type X1 = {
  a: () => 22;
  b: string;
  c: {
    d: boolean;
    e: {
      g: {
        h: {
          i: true;
          j: "string";
        };
        k: "hello";
      };
      l: [
        "hi",
        {
          m: ["hey"];
        }
      ];
    };
  };
};

type X2 = { a: string } | { b: number };

type Expected1 = {
  readonly a: () => 22;
  readonly b: string;
  readonly c: {
    readonly d: boolean;
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true;
          readonly j: "string";
        };
        readonly k: "hello";
      };
      readonly l: readonly [
        "hi",
        {
          readonly m: readonly ["hey"];
        }
      ];
    };
  };
};

type Expected2 = { readonly a: string } | { readonly b: number };
