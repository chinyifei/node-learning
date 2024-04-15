//any 任意类型 unknown 未知类型
/**
 * 1.top type  顶级类型 any unknown
 * 2.Object
 * 3.Number String Boolean
 * 4.number string boolean
 * 5.never
 */
let num: Number = 1;
num = "true";

interface Person {
  name: string;
  age: number;
  [key: string]: any;
}

let p: Person = {
  name: "joke",
  age: 123,
  any: "any",
};

//联合类型和交叉类型
interface A {
  a: number;
  c?: string;
}
interface B {
  a: number;
  b: number;
  c?: string;
}
interface C extends A {
  b: number;
}
let c: A & B = { a: 1, b: 2 };
let cb: A | B = { a: 1, b: 2, c: "1" };
let cc: C = { a: 1, b: 2 };
let ccc: C = c;
c = cb;

var Types;
Types[(Types["a"] = "0")] = "a";
