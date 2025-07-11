//#######################################################################

import { Equal, Expect, NotAny } from "@lib/testing";

/**
 * Default Generic Arguments
 */
type ApiMethod = "GET" | "POST" | "PUT" | "DELETE";
type ApiRequest<T, K extends ApiMethod = "GET"> = { data: T; method: K };

type TSConfig<T = { strict: true }> = T;

/////////////////////////////////TEST//////////////////////////////////
type test_ApiRequest_explicitPost = Expect<
  Equal<ApiRequest<string, "POST">, { data: string; method: "POST" }>
>;

type test_ApiRequest_implicitGet = Expect<
  Equal<ApiRequest<number>, { data: number; method: "GET" }>
>;

type test_TSConfig_default = Expect<Equal<TSConfig, { strict: true }>>;

type test_TSConfig_true = Expect<
  Equal<TSConfig<{ strict: true }>, { strict: true }>
>;

type test_TSConfig_false = Expect<
  Equal<TSConfig<{ strict: false }>, { strict: false }>
>;

type test_TSConfig_boolean = Expect<
  Equal<TSConfig<{ strict: boolean }>, { strict: boolean }>
>;

//#######################################################################
/**
 * Hello World
 */

type HelloWorld = string;

/////////////////////////////////TEST//////////////////////////////////
type cases = [Expect<NotAny<HelloWorld>>, Expect<Equal<HelloWorld, string>>];

//#######################################################################
/**
 * Generic Function Arguments
 */

const identity = <T>(arg: T): T => arg;

const mapArray = <T, U>(arr: T[], fn: (val: T) => U): U[] => arr.map(fn);

/////////////////////////////////TEST//////////////////////////////////

/** temporary */
const expect = <T>(a: T) => ({
  toEqual: (b: T) => a === b,
});

const identity_string = identity("this is a string");
expect(identity_string).toEqual("this is a string");
type test_identity_string = Expect<
  Equal<typeof identity_string, "this is a string">
>;

const identity_number = identity(123.45);
expect(identity_number).toEqual(123.45);
type test_identity_number = Expect<Equal<typeof identity_number, 123.45>>;

const identity_boolean = identity(false);
expect(identity_boolean).toEqual(false);
type test_identity_boolean = Expect<Equal<typeof identity_boolean, false>>;

const strings = ["1", "1", "2", "3", "5"];
const numbers = [1, 1, 2, 3, 5];

const stringsToNumbers = mapArray(strings, (str) => parseInt(str));
expect(stringsToNumbers).toEqual(numbers);
type test_stringsToNumber = Expect<Equal<typeof stringsToNumbers, number[]>>;

const numbersToStrings = mapArray(numbers, (num) => `${num}`);
expect(numbersToStrings).toEqual(strings);
type test_numbersToStrings = Expect<Equal<typeof numbersToStrings, string[]>>;

const numbersToNumbers = mapArray(numbers, (num) => num + 1);
expect(numbersToNumbers).toEqual([2, 2, 3, 4, 6]);
type test_numbersToNumbers = Expect<Equal<typeof numbersToNumbers, number[]>>;

const stringsToStrings = mapArray(strings, (str) => `${str}!`);
expect(stringsToStrings).toEqual(["1!", "1!", "2!", "3!", "5!"]);
type test_stringsToStrings = Expect<Equal<typeof stringsToStrings, string[]>>;

//#######################################################################
/**
 * Generic Type Arguments
 */

type GroceryStore<Name, City> = { name: Name; city: City };

type GroceryItem<Name, Price, InStock> = {
  name: Name;
  price: Price;
  inStock: InStock;
};

type CapreseSalad = GroceryItem<"Caprese Salad", 14.99, true>;

/////////////////////////////////TEST//////////////////////////////////

type test_CapreseSaladName = Expect<
  Equal<CapreseSalad["name"], "Caprese Salad">
>;

type test_CapreseSaladPrice = Expect<Equal<CapreseSalad["price"], 14.99>>;

type test_CapreseSaladInStock = Expect<Equal<CapreseSalad["inStock"], true>>;

type test_KrogerDetroit = Expect<
  Equal<GroceryStore<"Kroger", "Detroit">, { name: "Kroger"; city: "Detroit" }>
>;

type test_StopNShopMassachusetts = Expect<
  Equal<
    GroceryStore<"Stop 'N Shop", "Massachusetts">,
    { name: "Stop 'N Shop"; city: "Massachusetts" }
  >
>;

//#######################################################################

/**
 * Generic Type Constraints
 */

type AllowString<T extends string> = T;
type AllowNumber<T extends number> = T;
type CreateLogger<T extends (a: number) => void> = {
  log: T;
  exit: () => void;
};
/////////////////////////////////TEST//////////////////////////////////

type test_AllowStringString = Expect<Equal<AllowString<string>, string>>;

// @ts-expect-error invalid input
type error_AllowStringNumber = AllowString<number>;

// @ts-expect-error invalid input
type error_AllowStringBoolean = AllowString<boolean>;

// @ts-expect-error invalid input
type error_AllowNumberString = AllowNumber<string>;

type test_AllowNumberNumber = Expect<Equal<AllowNumber<number>, number>>;

// @ts-expect-error invalid input
type error_AllowNumberBoolean = AllowNumber<boolean>;

type test_CreateLogger = Expect<
  Equal<
    CreateLogger<(a: number) => void>,
    {
      log: (a: number) => void;
      exit: () => void;
    }
  >
>;

// @ts-expect-error invalid input
type error_CreateLoggerString = CreateLogger<string>;

type error_CreateLoggerStringArg =
  // @ts-expect-error invalid input
  CreateLogger<(a: string) => void>;

type error_CreateLoggerTwoArgs =
  // @ts-expect-error invalid input
  CreateLogger<(a: number, b: number) => void>;

//#######################################################################

/**
 * Hello World
 */

/////////////////////////////////TEST//////////////////////////////////

//#######################################################################

/**
 * Hello World
 */

/////////////////////////////////TEST//////////////////////////////////

//#######################################################################
