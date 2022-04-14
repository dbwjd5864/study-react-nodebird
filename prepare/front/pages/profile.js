import React from 'react';
import Head from 'next/head';

import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

import AppLayout from '../components/AppLayout';

const Profile = () => {
  const followerList = [
    { nickname: '제로초' },
    { nickname: '고라파덕' },
    { nickname: '피카츄' },
  ];
  const followingList = [
    { nickname: '제로초' },
    { nickname: '고라파덕' },
    { nickname: '피카츄' },
  ];

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={followingList} />
        <FollowList header="팔로워 목록" data={followerList} />
      </AppLayout>
    </>
  );
};

export default Profile;
