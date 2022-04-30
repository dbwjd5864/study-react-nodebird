export default function* rootSaga() {}

// // generator는 yield가 있는 곳에서 멈춤
// // 중단점이 있는 함수이다
// const gen = function* {
//   console.log(1);
//   yield;
//   console.log(2);
//   yield;
//   console.log(3);
//   yield 4;
// }

// const generator = gen();
// generator.next() //1 {value: undefined, done: false}
// generator.next() //2 {value: undefined, done: false}
// generator.next() //3 {value: undefined, done: false}
// generator.next() // {value: 4, done: true}
