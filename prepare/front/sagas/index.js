import {
  all,
  fork,
} from 'redux-saga/effects';

import postSaga from "./post";
import userSaga from "./user";

// rootSaga를 만들어두고 거기에 사용하고싶은 비동기 액션들을 넣어준다
export default function* rootSaga() {
  // all은 배열안에 있는 모든것들을 한번에 실행
  // fork는 함수를 실행하는 것을 의미
  yield all([fork(postSaga), fork(userSaga)]);
}

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

// thunk에서는 비동기 액션을 직접 실행했지만 saga에서는 비동기 액션 크리에이터가 직접 실행되는것이 아니라 이벤트 리스너같은 역할을 한다

// fork vs call
// call은 동기 함수 호출
// fort는 비동기 함수 호출
