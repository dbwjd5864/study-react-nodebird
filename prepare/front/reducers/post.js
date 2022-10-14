import shortid from 'shortid';
import produce from 'immer';
import faker from 'faker';
// react-virtualized를 통해 메모리를 아낄 수 있음

const initialState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
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

export const generateDummyPost = (number) => Array(number)
  .fill()
  .map(() => ({
    id: shortid.generate(),
    User: {
      id: shortid.generate(),
      nickname: faker.name.findName(),
    },
    content: faker.lorem.paragraph(),
    Images: [
      {
        src: faker.image.image(),
      },
    ],
    Comments: [
      {
        User: {
          id: shortid.generate(),
          nickname: faker.name.findName(),
        },
        content: faker.lorem.sentence(),
      },
    ],
  }));

// 대부분의 요청들은 다 비동기이다
// 게시글을 작성하던, 코멘트를 작성하던 모든 기록들이 다 서버로 한번 넘어갔다가 제대로 처리되면 성공, 실패했으면 실패
// 하지만 성공하고서 아무일도 안해도 상관은 없다
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

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

// const dummyComment = (data) => ({
//   id: shortid.generate(),
//   content: data,
//   User: {
//     id: 1,
//     nickname: '제이드',
//   },
// });

// 리듀서란 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수 (불변성은 지키면서)
const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_POSTS_REQUEST:
      draft.loadPostsLoading = true;
      draft.loadPostsDone = false;
      draft.loadPostsError = null;
      break;
    case LOAD_POSTS_SUCCESS:
      draft.loadPostsLoading = false;
      draft.loadPostsDone = true;
      draft.mainPosts = draft.mainPosts.concat(action.data);
      draft.hasMorePosts = draft.mainPosts.length < 50;
      break;
    case LOAD_POSTS_FAILURE:
      draft.loadPostsLoading = false;
      draft.loadPostsError = action.error;
      break;
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
      draft.addPostLoading = false;
      draft.addPostError = action.error;
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
        (v) => v.id !== action.data.PostId,
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

export default reducer;
