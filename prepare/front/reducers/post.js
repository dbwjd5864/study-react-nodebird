const initialState = {
  mainPosts: [
    {
      // id, content같은 경우는 포스트 자체에 정보지만 다른 User, Images, Commnets은 같은 경우는 다른 정보들과 합쳐서 내려오기때문에 대문자로 기본 설정
      id: 1,
      User: {
        id: 1,
        nickname: '제이드',
      },
      content: '첫 번째 게시글 #해시태그 #익스프레스',
      Images: [
        {
          src: '',
        },
      ],
      Comments: [
        {
          User: {
            nickname: 'Test',
          },
          content: '우와',
        },
        {
          User: {
            nickname: 'Test2',
          },
          content: '우와222',
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const addPost = data => ({
  type: ADD_POST_REQUEST,
  data
});

const dummyPost = {
  id: 2,
  content: 'dummy post',
  User: {
    id: 1,
    nickname: '제이드',
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
    case ADD_POST_SUCCESS:
      return {
        ...state,
        // 앞에 추가해줘야 게시글 위로 올라감
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
