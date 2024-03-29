import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import rootSaga from '../sagas';

// 액션이 디스패치 되는 것을 logging하는 미들웨어라 가정
const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  // action은 원래 객체인데 Thunk에서는 action을 function으로 둘 수 있음
  // action이 function인 경우에는 지연 함수이기때문에 나중에 실행할 수 있게됨
  // if (typeof action === 'function') {
  // return action(dispatch, getState);
  // }

  // 액션이 실행되기전에 console.log로 한번 찍어주는 미들웨어
  console.log(action);
  return next(action);
};

const configureStore = () => {
  // 미들웨어는 리덕스의 기능을 향상시켜주는 역할
  // 리덕스 덩크는 리덕스가 비동기 액션을 디스패치 하도록 해줌 => 하나의 비동기 액션안에 여러개의 동기 액션(디스패치)를 할 수 있게 됨
  // 예를들어, axios 요청을 보낼 때 request action을 (loadPostRequest) 디스패치:
  // 성공했을 때 다른 액션을 디스패치 (loadPostSuccess)
  // 실패했을 때 (loadPostFailure)
  // 덩크는 지연의 의미를 가지고 있음
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, loggerMiddleware];

  // 리덕스 데브 툴즈가 동작하는것도 미들웨어가 있기 때문에
  // 불변성을 지켜야지만 history가 유지된다.
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));
  // 미들웨어는 enhancer를 통해 설정가능
  // state와 reducer를 포함하는 것이 스토어
  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;

// redux: 코드량은 많으나 에러 발생률이 mobx에 비해서 적음
// mobx: 코드량이 줄어드나 에러가 발생했을 때 디버깅이 용이하지않음

// context API vs Redux, mobx: 비동기를 지원하기 쉽냐 어렵냐의 차이
// 중앙 저장소는 보통 서버에서 데이터를 많이 받아오는데 서버에서 데이터를 받아오는것은 항상 비동기
// 비동기를 다룰때는 실패에 대비해줘야함 => 요청, 성공, 실패
// context API 에서는 이러한 요청, 성공, 실패를 직접 다 구현해줘야 함

// -----reducer-----
// type이 액션의 이름
// switch (action.type){
//  case 'CHANGE_NAME'{
//      이름만 변경해주고 나머지는 그대로 돌려보내주되 객체는 새로만들어준다 => 객체를 새로 만들어야 변경내용들이 추적 가능해짐
// ...state를 해줘야 변하지 않는 애들은 참조관계를 유지하여 메모리를 아낄 수 있다
//      return{
//          ...state,
//          name: action.data
//      }
//  }
// }

// 액션을 하나씩 만드는 이유는 기록을 남기기 위해
// 액션을 디스패치 했을 때 어떻게 데이터를 변경할 것인지를 reducer에서 적어줘야 함

// const nest = {b: 'c'}
// const prev = {a: nest};
// const next = { ...prev };

// prev.a === next.a; // true
// prev === next // false
