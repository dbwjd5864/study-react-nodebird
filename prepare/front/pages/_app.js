// 페이지에 완전히 공통되는 것들 처리
// Layout: 페이지에 일부만 공통인 것들 처리

import React from 'react';
import PropTypes from 'prop-types';
// 헤드부분 수정을 위해서
// 공통되지 않는 헤드라면 index에 Head를 추가해서 처리 가능
import Head from 'next/head';
import 'antd/dist/antd.css';

const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default NodeBird;
