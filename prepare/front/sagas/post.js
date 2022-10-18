import axios from 'axios';
import {
  all,
  call,
  delay,
  fork,
  put,
  takeEvery,
  takeLatest,
  throttle,
} from 'redux-saga/effects';
import shortid from 'shortid';
import {
  ADD_POST_SUCCESS,
  ADD_POST_REQUEST,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  REMOVE_POST_FAILURE,
  REMOVE_POST_SUCCESS,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  generateDummyPost, REMOVE_POST_REQUEST, LOAD_POST_REQUEST, LOAD_POST_FAILURE, LOAD_POST_SUCCESS,
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

function addPostAPI(data) {
  return axios.post('/api/post', data);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({ type: ADD_POST_SUCCESS, data: action.data });
  } catch (err) {
    yield put({ type: ADD_POST_FAILURE, data: err.response.data });
  }
}

function loadPostsAPI(lastId) {
  return axios.get(`/posts?lastId=${lastId || 0}`);
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.data);

    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadPostAPI(data) {
  return axios.get(`/post/${data}`);
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);

    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.delete('/api/post', data);
}

function* removePost(action) {
  try {
    // const result = yield call(removePostAPI, action.data);
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({ type: REMOVE_POST_OF_ME, data: action.data });
  } catch (err) {
    yield put({ type: REMOVE_POST_FAILURE, data: err.response.data });
  }
}

function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    // const result = yield call(addCommentAPI, action.data);
    yield delay(1000);
    const id = shortid.generate();
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
    yield put({ type: ADD_POST_TO_ME, data: id });
  } catch (err) {
    yield put({ type: ADD_COMMENT_FAILURE, data: err.response.data });
  }
}

function* watchAddPost() {
  yield takeEvery(ADD_POST_REQUEST, addPost);
}

function* watchLoadPost() {
  yield takeLatest(5000, LOAD_POST_REQUEST, loadPost);
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeEvery(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all(
    [fork(watchAddPost), fork(watchLoadPosts), fork(watchLoadPost), fork(watchAddComment)],
    fork(watchRemovePost),
  );
}
