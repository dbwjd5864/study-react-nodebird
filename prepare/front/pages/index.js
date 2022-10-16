// next는 imoprt React가 불필요
// import React from 'react'

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_USER_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

function Home() {
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post,
  );

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);

  useEffect(() => {
    function onScroll() {
      // window.scrollY, : 얼마나 내렸는지
      // document.documentElement.clientHeight : 화면에 보이는 부분, 변하지 않음
      // document.documentElement.scrollHeight : 총 길이, 변하지 않음
      // window.scrollY + clientHeight = scrollHeight
      if (
        window.scrollY + document.documentElement.clientHeight
        > document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_POSTS_REQUEST,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    // useEffect에서 window에 이벤트 리스너를 걸때는 꼭 return으로 해제해줘야함. 그렇지 않으면 메모리에 계속 쌓여있음
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {/* 반복문이 바뀌는경우 index를 키로 쓰면 안됨, 예를 들어, 포스트같이 지워질 수 있는 경우는 index를 키로 쓰는것은 안티패턴 */}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
}

// getInitialProps 는 더이상 사용 안함
// Next 9버전부터 getServerSideProps, getStaticPath, getStaticProps 사용
// 이렇게 선언을 해두면 Home 부분 보다 먼저 실행 됨 => 데이터를 채운 후 화면 렌더링
// 화면 렌더링 될 때는 데이터가 채워진 상태로 존재
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  context.store.dispatch({
    // request 이기 때문에 loading 상태가 true로 바로 브라우저로 돌아오게 된다.
    // 하지만 원하는 바는 서버쪽에서 success 까지 이뤄져서 프론트로 돌아오기를 바람.
    type: LOAD_USER_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
  });
  // 이 부분까지 실행된 부분이 HYDRATE로 간다

  // 이후에 request가 success로 바뀔때까지 기다려준는 장치
  context.store.dispatch(END);
  // store에서 store.sagaTask 등록해 둔 부분
  await context.store.sagaTask.toPromise();
});

export default Home;

// pages 폴더 안에 있어야만 코드 스필릿팅이 가능하기 때문에 무조건 폴더이름은 pages여야한다
