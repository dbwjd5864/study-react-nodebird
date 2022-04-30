const initialState = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
};

export const loginAction = (data) => {
  return (dispatch, getState) => {
    // initialState가 나올것
    const state = getState();
    dispatch(loginReuquestAction());
    axios
      .post('/api/login')
      .then((res) => {
        dispatch(loginSuccessAction(res.data));
      })
      .catch((err) => {
        dispatch(loginFailureAction(err));
      });
  };
};

// action creator
export const loginReuquestAction = (data) => {
  return { type: 'LOG_IN_REQUEST', data };
};

export const loginSuccessAction = (data) => {
  return { type: 'LOG_IN_SUCCESS', data };
};

export const loginFailureAction = (data) => {
  return { type: 'LOG_IN_FAUILURE', data };
};

export const logoutReuquestAction = () => {
  return { type: 'LOG_OUT_REQUEST' };
};

export const logoutSuccessAction = () => {
  return { type: 'LOG_OUT_SUCCESS' };
};

export const logoutFailureAction = () => {
  return { type: 'LOG_OUT_FAUILURE' };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,

        isLoggedIn: true,
        me: action.data,
      };
    case 'LOG_OUT':
      return {
        ...state,

        isLoggedIn: false,
        me: null,
      };

    default:
      return state;
  }
};

export default reducer;
