import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';

import { Avatar, Card } from 'antd';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';
import { LOAD_USER_REQUEST } from '../reducers/user';

function About() {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <AppLayout>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      {/*  userInfo가 서버사이드 렌더링이 안되면 텅빈 페이지가 나 */}
      {userInfo ? (
        <Card actions={[
          <div key="twit">
            짹짹
            <br />
            {userInfo.Posts}
          </div>,
          <div key="followings">
            팔로잉
            <br />
            {userInfo.Followings}
          </div>,
          <div key="followers">
            팔로워
            <br />
            {userInfo.Followers}
          </div>,
        ]}
        ><Card.Meta avatar={<Avatar>{userInfo.nickname[0]}</Avatar>} title={userInfo.nickname} description="노드버드 매니아" />
        </Card>
      ) : null}
    </AppLayout>
  );
}

// 언제 접속해도 데이터가 바뀔일이 없다면 getStaticProps 사용
// 접속한 상황에 따라 화면이 바껴야하면 getServerSideProps 사용
// 거의 getServerSideProps만 사용
// getStaticProps를 사용하면 next에서 build를 해줄때 정적인 html 파일로 만들어 준다.
// 예를들어 프로필 페이지는 로그인한 사용자마다 다른 프로필을 보여줘야하기 때문에 getServerSideProps를 사용 해야한다.
export const getStaticProps = wrapper.getStaticProps(async (context) => {
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: 1,
  });

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default About;
