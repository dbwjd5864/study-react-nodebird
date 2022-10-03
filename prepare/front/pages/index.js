// next는 imoprt React가 불필요
// import React from 'react'

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

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

export default Home;

// pages 폴더 안에 있어야만 코드 스필릿팅이 가능하기 때문에 무조건 폴더이름은 pages여야한다
