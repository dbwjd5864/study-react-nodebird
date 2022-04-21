import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  // name: 'yujeong',
  // age: 26,
  // password: 'babo',
  user: {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData: {},
  },
  post: {
    mainPosts: [],
  },
};

// async action creator

// action creator
export const loginAction = (data) => {
  return { type: 'LOG_IN', data };
};

export const logoutAction = () => {
  return { type: 'LOG_OUT' };
};
// const changeNickname = (data) => {
//   return { type: 'CHANGE_NICKNAME', data };
// };

// (이전상태, 액션) => 다음상태
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE');
      return { ...state, ...action.payload };
    // ...state처럼 불변셩을 유지해서 return을 하기때문에 history추적이 가능해진다 => redux devtools로 추적 가능해진다
    case 'LOG_IN':
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          user: action.data,
        },
      };
    case 'LOG_OUT':
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: false,
          user: null,
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
