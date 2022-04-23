import { HYDRATE } from 'next-redux-wrapper';

import user from './user';
import post from './post';
// reducers를 하벼주는 메쏘드
// 리듀서가 함수기때문에 합치는게 쉽지 않기때문에 combineReducers에 도움을 받는다
import { combineReducers } from 'redux';

// async action creator

// const changeNickname = (data) => {
//   return { type: 'CHANGE_NICKNAME', data };
// };

// (이전상태, 액션) => 다음상태
const rootReducer = combineReducers({
  // 서버사이드 렌더링을 위해 HYDRATE를 추가하기위해 index가 필요
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log('HYDRATE');
        return { ...state, ...action.payload };
      // ...state처럼 불변셩을 유지해서 return을 하기때문에 history추적이 가능해진다 => redux devtools로 추적 가능해진다

      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
