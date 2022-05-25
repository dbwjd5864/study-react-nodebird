import shortid from 'shortid';
import produce from 'immer';
import faker from 'faker';

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
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
};

initialState.mainPosts = initialState.mainPosts.concat(
    Array(20).fill().map((v, i) => ({
        id: shortid.generate(),
        User:{
            id: shortid.generate(),
                nickname: faker.name.findName(),
        },
      content: faker.lorem.paragraph(),
      Images: [{
          src: faker.image.image(),
      }],
      Comments: [{
        User:{
          id: shortid.generate(),
          nickname: faker.name.findName()
        },
        content: faker.lorem.sentence()
      }]
    }))
);

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: '제이드',
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortid.generate(),
  content: data,
  User: {
    id: 1,
    nickname: '제이드',
  },
});

// 리듀서란 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수 (불변성은 지키면서)
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      // return {
      //   ...state,
      //   addPostLoading: true,
      //   addPostDone: false,
      //   addPostError: null,
      // };
      case ADD_POST_SUCCESS:
        draft.mainPosts.unshift(dummyPost(action.data));
        draft.addPostLoading = false;
        draft.addPostDone = true;
        break;
      // return {
      //   ...state,
      //   // 앞에 추가해줘야 게시글 위로 올라감
      //   mainPosts: [dummyPost(action.data), ...state.mainPosts],
      //   addPostLoading: false,
      //   addPostDone: true,
      // };
      case ADD_POST_FAILURE:
        (draft.addPostLoading = false), (draft.addPostError = action.error);
        break;
      // return {
      //   ...state,
      //   addPostLoading: false,
      //   addPostError: action.error,
      // };
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      // return {
      //   ...state,
      //   addCommentLoading: true,
      //   addCommentDone: false,
      //   addCommentError: null,
      // };
      case ADD_COMMENT_SUCCESS:
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      // 불변성의 핵심은 바뀌는것만 새로운 객체로 만들고 나머지는 참조를 유지하는 것 => 메모리 절약
      // 현재코드는 이를 잘 알 수없음. 따라서 immer를 사용
      // const postIndex = state.mainPosts.findIndex(
      //   (post) => post.id === action.data.postId
      // );
      // const post = { ...state.mainPosts[postIndex] };
      // post.Comments = [dummyComment(action.data.content), ...post.Comments];
      // const mainPosts = [...state.mainPosts];
      // mainPosts[postIndex] = post;

      // return {
      //   ...state,
      //   // 앞에 추가해줘야 게시글 위로 올라감
      //   mainPosts,
      //   addCommentLoading: false,
      //   addCommentDone: true,
      // };
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      // return {
      //   ...state,
      //   addCommentLoading: false,
      //   addCommentError: action.error,
      // };
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      // return {
      //   ...state,
      //   removePostLoading: true,
      //   removePostDone: false,
      //   removePostError: null,
      // };
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter(
          (v) => v.id !== action.data.PostId
        );
        break;
      // return {
      //   ...state,
      //   mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
      //   removePostLoading: false,
      //   removePostDone: true,
      // };
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      // return {
      //   ...state,
      //   removePostLoading: false,
      //   removePostError: action.error,
      // };
      default:
        break;
    }
  });
};

export default reducer;
