import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import LoginForm from '../components/LoginForm';
import UserProfile from '../components/UserProfile.js';
import { createGlobalStyle } from 'styled-components';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

// gutter scroll 문제 해결
const Global = createGlobalStyle`
  .ant-row{
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .ant-col:first-child{
    padding-left: 0 !important;
  }

  .ant-col:last-child{
    padding-right: 0 !important;
  }
`;

const AppLayout = ({ children }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // isLoggedIn이 바뀌면 알아서 Layout 컴포넌트가 리렌더링됨
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  //구조 분해 할당도 가능 const {isLoggedIn} = useSelector((state) => state.user);

  // const style = useMemo(() => ({marginTop: 10}), []);

  // return 부분이 virtualDom
  // 이전 부분과 현재 부분에서 달라진 부분만 다시 그려줌
  return (
    <div>
      <Global />
      <Menu mode="horizontal">
        {/* 리액트의 hot loader와 같은 기능 */}
        <Menu.Item>
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput />
          {/* styled-component를 사용하기 싫으나 리렌더링을 피해야 할 경우 useMemo도 사용가능 */}
          {/* <div style={style} /> */}
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>
      {/* gutter = 컬럼 사이에 간격 */}
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          {/* 보안상 문제로 target: _blank를 사용할 때는 rel에 noreferrer noopener 추가로 사용해야 한다 
          새 창을 누가 열었는지에 대한 정보를 아예 없애는 것
          */}
          <a
            href="https://yujeong-portfolio.netlify.app/"
            target={'_blank'}
            rel="noreferrer noopener"
          >
            Made by Yujeong
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  // 리액트에서 node란
  // 화면에 그릴 수 있는 모든 것
  children: PropTypes.node.isRequired,
};

export default AppLayout;
