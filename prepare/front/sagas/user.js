import {
  all,
  fork,
  put,
  takeEvery,
  takeLatest,
  delay, call,
} from 'redux-saga/effects';
import axios from 'axios';
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
} from '../reducers/user';

function followAPI(data) {
  return axios.patch('/user/follow');
}

function* follow(action) {
  try {
    //   const result = yield call(followAPI, action.data);
    yield delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function unfollowAPI(data) {
  return axios.delete('/user/unfollow');
}

function* unfollow(action) {
  try {
    // const result = yield call(unfollowAPI, action.data);
    yield delay(1000);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function logInAPI(data) {
  return axios.post('/user/login', data);
}

// LOG_IN_REQUEST 의 action 자체가 매개변수로 넘어옴
function* login(action) {
  // put은 dispatch와 비슷
  try {
    // 서버의 결고 요청값을 받음
    // 무조건 결과값을 받아와야하기때문에 fork가 아닌 call
    const result = yield call(logInAPI, action.data);

    yield put({ type: LOG_IN_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: LOG_IN_FAILURE, error: err.response.data });
  }
}

function logOutAPI() {
  return axios.post('/user/logout');
}

function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({ type: LOG_OUT_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: LOG_OUT_FAILURE, error: err.response.data });
  }
}

function signUpAPI(data) {
  return axios.post('/user', data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    yield put({ type: SIGN_UP_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: SIGN_UP_FAILURE, error: err.response.data });
  }
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

// LOG_IN 이라는 액션이 시작될때까지 기다림을 의미
function* watchLogin() {
  // LOG_IN이라는 액션이 시작되면 login이 시작됨
  // 딱 한번밖에 이벤트 리스너가 작동을 안하기 때문에 while로 감싸주는 것이 필요
  // 하지만 직관적이지 않기 때문에 보통은 takeEvery를 사용
  // while(true){
  //   yield take('LOG_IN_REQUEST', login);
  // }

  // while take는 동기적으로 동작하지만 takeEvery는 비동기적으로 동작한다는 차이가 존재한다
  // yield takeEvery('LOG_IN_REQUEST', login);

  // 앞에 실수로 눌렀던 것은 무시되고 마지막것만 실행된다
  // 하지만 요청은 그대로 가고 응답만 취소하는 것이기 때문에 backend단에서 데이터 처리시 유의해야함
  yield takeLatest(LOG_IN_REQUEST, login);
  // 첫번째 것만은 takeLeading

  // throttle
  // 2초동안 요청은 딱 한번만 존재할 수 있음을 의미
  // yield throttle('LOG_IN_REQUEST', login, 2000)
}

function* watchLogout() {
  yield takeEvery(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignUp),
  ]);
}
