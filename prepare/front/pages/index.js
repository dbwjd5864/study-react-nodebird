// next는 imoprt React가 불필요
// import React from 'react'

import React from 'react';
import AppLayout from '../components/AppLayout';

const Home = () => {
  return (
    <AppLayout>
      <div>Hello, Next!</div>
    </AppLayout>
  );
};

export default Home;

// pages 폴더 안에 있어야만 코드 스필릿팅이 가능하기 때문에 무조건 폴더이름은 pages여야한다
