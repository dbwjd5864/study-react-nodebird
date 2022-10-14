import {
  all,
  fork,
} from 'redux-saga/effects';

import axios from 'axios';
import postSaga from './post';
import userSaga from './user';

axios.defaults.baseURL = 'http://localhost:3065';

// rootSaga를 만들어두고 거기에 사용하고싶은 비동기 액션들을 넣어준다
export default function* rootSaga() {
  // all은 배열안에 있는 모든것들을 한번에 실행
  // fork는 함수를 실행하는 것을 의미
  // fork나 call로 제너레이터 함수를 실행 => all은 그런애들을 동시에 실행할 수 있게 해준려ㅜ
  yield all([fork(postSaga), fork(userSaga)]);
}

// generator는 yield가 있는 곳에서 멈춤
// 중단점이 있는 함수이다
// const gen = function* {
//   console.log(1);
//   yield;
//   console.log(2);
//   yield;
//   console.log(3);
//   yield 4;
// }

// const generator = gen();
// generator.next() // 1 {value: undefined, done: false}
// generator.next() // 2 {value: undefined, done: false}
// generator.next() // 3 {value: 4, done: false}
// generator.next() // {value: undefined, done: true}

// generator로 무한의 개념을 표현할 수 있다
// let i = 0;
// const gen = function*() {
//   while(true){
//     yield i++;
//   }
// }

// thunk에서는 비동기 액션을 직접 실행했지만 saga에서는 비동기 액션 크리에이터가 직접 실행되는것이 아니라 이벤트 리스너같은 역할을 한다

// fork vs call
// call은 동기 함수 호출
// fort는 비동기 함수 호출

// 1.
// take("LOG_IN"): LOG_IN 이라는 액션이 실행 될 때까지 기다리겠다
// LOG_IN이 실행되면 logIn이라는 제너레이터 함수가 실행된다
// function* watchLogIn() {
//   yield take('LOG_IN', logIn)
// }

// 2.
// function* logIn() {
// 요청이 실패하는것을 대비하기 위해 try.. catch..
//  성공 결과는 result.data,
//  실패 결과는 err.response.data에 담겨있다
//  try{
//    4. 서버로 로그인 하는 요청을 보낸 후 실제 결과값을 받을 수 있다
//    return result = yield call(logInAPI)
//    5. 결과를 받아서
//    yield put({
//      type: 'LOG_IN_SUCCESS',
//      data: result.data
//    })
//   }catch(err){
//      yield put({
//        type: 'LOG_IN_FAILURE',
//        data: err.response.data
//      })
//   }
// }

// 3.
// 제너레이터 아님
// 실제로 서버로 요청
// function logInAPI() {
//   return axios.post('/api/login')
// }
