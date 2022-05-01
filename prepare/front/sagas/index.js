import { all, fork, take, call, put } from 'redux0-saga/effects';
import axios from 'axios';

function logInAPI(data) {
  return axios.post('/api/login', data);
}

// LOG_IN_REQUEST 의 action 자체가 매개변수로 넘어옴
function* login(action) {
  // put은 dispatch와 비슷
  try {
    // 서버의 결고 요청값을 받음
    // 무조건 결과값을 받아와야하기때문에 fork가 아닌 call
    const result = yield call(logInAPI, action.data);
    yield put({ type: 'LOG_IN_SUCCESS', data: result.data });
  } catch (err) {
    yield put({ type: 'LOG_IN_FAILURE', data: err.response.data });
  }
}

function logOutAPI() {
  return axios.post('/api/logout');
}

function* logOut() {
  try {
    const result = yield call(logOutAPI);
    yield put({ type: 'LOG_OUT_SUCCESS', data: result.data });
  } catch (err) {
    yield put({ type: 'LOG_OUT_FAILURE', data: err.response.data });
  }
}

function addPostAPI(data) {
  return axios.post('/api/post', data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({ type: 'ADD_POST_SUCCESS', data: result.data });
  } catch (err) {
    yield put({ type: 'ADD_POST_FAILURE', data: err.response.data });
  }
}

// LOG_IN 이라는 액션이 시작될때까지 기다림을 의미
function* watchLogin() {
  // LOG_IN이라는 액션이 시작되면 login이 시작됨
  yield take('LOG_IN_REQUEST', login);
}

function* watchLogout() {
  yield take('LOG_OUT_REQUEST', logOut);
}

function* watchAddPost() {
  yield take('ADD_POST_REQUEST', addPost);
}

// rootSaga를 만들어두고 거기에 사용하고싶은 비동기 액션들을 넣어준다
export default function* rootSaga() {
  // all은 배열안에 있는 모든것들을 한번에 실행
  // fork는 함수를 실행하는 것을 의미
  yield all([fork(watchLogin), fork(watchLogout), fork(watchAddPost)]);
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
