// import { array, string } from "joi";

// let id: number = 5;
// let company: string = 'Nick Woodward';
// let ifPublished: boolean = true;
// let x: any = 'Hello';

// let ids: number[] = [1,2,3,4,5];

// // Tuple
// let person: [number, string, boolean] = [1, 'Nick', true];
// // Tuple array
// let employee: [number, string][];
// employee = [
//     [1, 'Brad'],
//     [2, 'Nick']
// ]

// // Union
// let pid: string | number;
// pid = 22;
// pid = '22';

// // Enum
// enum Direction1 {
//     Up, // 0
//     Down, // 1
//     Left, // 2
//     Right // 3
// }
// enum Direction2 {
//     Up = 1, // 1
//     Down, // 2
//     Left, // 3
//     Right // 4
// }
// enum Direction3 {
//     Up = 'Up',
//     Down = 'Down',
//     Left = 'Left',
//     Right = 'Right'
// }

// // Objects
// type User = {
//     id: number,
//     name: string,
// }

// const user: User = {
//     id: 1,
//     name: 'Nick'
// }

// // Type Assertion
// let cid: any = 1;
// // let customerId = <number>cid;
// let customerId = cid as number;

// // Functions
// function addNum(x: number, y: number): number {
//     return x + y;
// }
// function log(message: string | number): void {
//     console.log(message);
// }

// // Interfaces
// interface PersonInterface {
//     id: number,
//     name: string,
//     age?: number // optional
//     register?(): string
// }

// const user1: PersonInterface = {
//     id: 1,
//     name: 'Nick'
// }
// console.log(user1);

// // Can't use primatives or unions with an interface
// type Point = number | string;
// const p1: Point = 1;

// // interface AnotherPoint = number | string;

// interface MathFunc {
//     (x: number, y: number): number
// }

// const add: MathFunc = (x: number, y: number): number => x + y;
// const subtract: MathFunc = (x: number, y: number): number => x - y;

// // Classes
// class Person implements PersonInterface {
//     _id: number;
//     _name: string;

//     constructor(id: number, name: string) {
//         this._id = id;
//         this._name = name;
//     }

//     register() {
//         return `${this.name} is now registered`;
//     }

//     get id() {
//         return this._id;
//     }
//     get name() {
//         return this._name;
//     }
// }

// export const nick = new Person(1, 'Nick');

// class Employee extends Person {
//     _position: string;

//     constructor(id: number, name: string, position: string) {
//         super(id, name);
//         this._position = position;
//     }
// }

// const emp = new Employee(2, 'Jeff', 'Developer');

// // Generics
// function getArray<T>(items: T[]): T[] {
//     return new Array().concat(items);
// }

// let numArray = getArray<number>([1,2,3,4]);
// let strArray = getArray<string>(['brad', 'john', 'jill']);

// // numArray.push('hello'); // Generics prevents this

// // Funcs as params
// export function printToFile(text: string, callback: () => void): void {
//     console.log(text);
//     callback();
// }

// export type MutationFunction = (v: number) => number;

// const myNewMutationFunction: MutationFunction = (v: number) => v * 100;

// export function arrayMutate(numbers: number[], mutate: MutationFunction): number[] {
//     return numbers.map(mutate);
// }
// console.log(arrayMutate([1,2,3], (v) => v * 10));
// console.log(arrayMutate([1,2,3], myNewMutationFunction));

// export type AdderFunction = (v: number) => number;

// // Return functions
// export function createAdder(num: number): AdderFunction {
//     return (val: number) => num + val;
// }

// const addOne = createAdder(1);
// console.log(addOne(55));

// // Overloading
// interface Coordinate {
//     x: number;
//     y: number;
//   }
  
//   function parseCoordinate(str: string): Coordinate;
//   function parseCoordinate(obj: Coordinate): Coordinate;
//   function parseCoordinate(x: number, y: number): Coordinate;
//   function parseCoordinate(arg1: unknown, arg2?: unknown): Coordinate {
//     let coord: Coordinate = {
//       x: 0,
//       y: 0,
//     };


//     if (typeof arg1 === "string") {
//         (arg1 as string).split(",").forEach((str) => {
//           const [key, value] = str.split(":");
//           coord[key as "x" | "y"] = parseInt(value, 10);
//         });
//     } else if (typeof arg1 === "object") {
//         coord = {
//           ...(arg1 as Coordinate),
//         };
//     } else {
//         coord = {
//             x: arg1 as number,
//             y: arg2 as number,
//         };
//     }
//     return coord;
// }

// console.log(parseCoordinate(10,20));
// console.log(parseCoordinate({x: 52, y: 35}));
// console.log(parseCoordinate("x:12,y:22"));