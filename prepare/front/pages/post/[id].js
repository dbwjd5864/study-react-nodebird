// 동적 라우팅
// post/[id].js
import React, { useRouter } from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_POST_REQUEST } from '../../reducers/post';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';

function Post() {
  const router = useRouter();
  const { id } = router.query;

  const { singlePost } = useSelector((state) => state.post);

  return (
    <AppLayout>
      <Head>
        <title>
          {singlePost.User.nickname}
          님의 글
        </title>
        {/* og가 카톡 공유하기시 미리보기로 보여지는 것들 */}
        {/* 알아서 서버사이드 렌더링이 된다. */}
        <meta name="description" content={singlePost.content} />
        <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
        <meta property="og:description" content={singlePost.content} />
        <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : 'https://nodebird.com/favicon.ico'} />
        <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';

  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    // context.params.id 또는 context.query.id를 활용하여 useRouter에 똑같이 접근가능
    data: context.params.id,
  });

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Post;
