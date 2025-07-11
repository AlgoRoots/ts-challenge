export type Expect<T extends true> = (<T>() => T extends T ? 1 : 2) extends <
  T
>() => T extends true ? 1 : 2
  ? true
  : false;

// @TIP 함수 시그니처 비교로 확인, 타입은 값비교가 안되고, 범위비교라서 이렇게 한듯
export type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T
>() => T extends B ? 1 : 2
  ? true
  : false;

export type IsAny<T> = 0 extends 1 & T ? true : false;
export type NotAny<T> = true extends IsAny<T> ? false : true;

export type Extends<A, B> = A extends B ? true : false;
