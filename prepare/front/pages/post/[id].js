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

  // if (router.isFallback) {
  //   return <div>로딩중..</div>;
  // }

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

// 다이나믹 라우팅에서 getStaticProps를 사용하려면 무조건 사용해야하는 것이 getStaticPaths이다. => 다이나믹 라우팅에서 사용된다.
// 두가지를 리턴해줘야한다. => path와 fallback
// 미리 적어둔 params를 이용해 html 파일을 만들어준다.
// 하지만 사용자들이 몇개의 포스팅을 만들지 모르는 상황에서 전부 다 html로 만들어둘 수 없다.
// 즉 어느정도 제한을 두고 만들어둬야한다.
// fallback을 true로 하면 미리 만들어두지 않은 페이지를 접근하려할 때 에러가 뜨지는 않지만 ssr이 되지는 않는다.
// 실제 그 페이지를 불러오는 동안 기다리게 만들 수 있다.
// export async function getStaticPaths() {
//   return {
//     paths: [{
//       params: { id: '1' },
//     }],
//     fallback: true,
//   };
// }

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
