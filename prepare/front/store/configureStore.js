import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from '../reducers';

const configureStore = () => {
    const middlewares = [];
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  // 미들웨어는 enhancer를 통해 설정가능
  const store = createStore(reducer, enhancer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;

// redux: 코드량은 많으나 에러 발생률이 mobx에 비해서 적음
// mobx: 코드량이 줄어드나 에러가 발생했을 때 디버깅이 용이하지않음

// context API vs Redux, mobx: 비동기를 지원하기 쉽냐 어렵냐의 차이
// 서버에서 데이터를 받아오는것은 항상 비동기
// 비동기를 다룰때는 실패에 대비해줘야함 => 요청, 성공, 실패
// context API 에서는 이러한 요청, 성공, 실패를 직접 다 구현해줘야 함

// -----reducer-----
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

// const nest = {b: 'c'}
// const prev = {a: nest};
// const next = { ...prev };

// prev.a === next.a; // true
// prev === next // false
