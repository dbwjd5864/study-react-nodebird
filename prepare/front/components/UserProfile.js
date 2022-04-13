import React, { useCallback } from 'react';
import { Card, Button } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';

const UserProfile = ({ setIsLoggedIn }) => {
  const onLogOut = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <Card
      actions={[
        <div key={'twit'}>
          짹짹
          <br />0
        </div>,
        <div key={'followings'}>
          팔로잉
          <br />0
        </div>,
        <div key={'followers'}>
          팔로워
          <br />0
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>YC</Avatar>} title={'Yujeong Choung'} />
      <Button onClick={onLogOut}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
