import { HYDRATE } from 'next-redux-wrapper';

// reducers 들을 합쳐준다.
import { combineReducers } from 'redux';
import user from './user';
import post from './post';

// async action creator - redux-saga

// 액션은 객체다
// 동적 액션, 액션 생성 (액션을 만들어주는 함수)
// const changeNickname = (data) => {
//   return { type: 'CHANGE_NICKNAME', data };
// };

// state를 바꾸고 싶을 때는 액션을 만들어서 dispatch 한다.

// 리듀서는 (이전상태, 액션)을 이용하여 => 다음상태를 만들어낸다.
// combineReducers를 reducers 들을 합쳐준다. - 리듀서가 함수이기 때문에 합치는게 쉽지 않기때문에 combineReducers에 도움을 받는다

// 현재 이상태에서는 index안에 index, user, post가 추가되는 문제가 있음
// const rootReducer = combineReducers({
//   // 서버사이드 렌더링을 위해 HYDRATE를 추가하기위해 index reducer  가 필요
//   index: (state = {}, action) => {
//     switch (action.type) {
//       case HYDRATE:
//         console.log('HYDRATE');
//         return { ...state, ...action.payload };
//         // ...state처럼 불변셩을 유지해서 return을 하기때문에 history추적이 가능해진다 => redux devtools로 추적 가능해진다
//       // 리듀서 초기화 할때도 switch 문이 실행되기 때문에 default가 없다면 return 값이 undefined가 되기 때문에 에러가 발생한다.
//       default:
//         return state;
//     }
//   },
//   user,
//   post,
// });

// 이렇게 수정을 해줘야 HYDRATE 일 때 리듀서 전부를 덮어 씌울 수 있음
const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', action);
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        user,
        post,
      });
      return combineReducer(action, state);
    }
  }
};

export default rootReducer;
