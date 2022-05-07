// next는 imoprt React가 불필요
// import React from 'react'

import React from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm.js';
import PostCard from '../components/PostCard.js';

const Home = () => {
  const { me } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  return (
    <AppLayout>
      {me && <PostForm />}
      {/* 반복문이 바뀌는경우 index를 키로 쓰면 안됨, 예를 들어, 포스트같이 지워질 수 있는 경우는 index를 키로 쓰는것은 안티패턴 */}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;

// pages 폴더 안에 있어야만 코드 스필릿팅이 가능하기 때문에 무조건 폴더이름은 pages여야한다
