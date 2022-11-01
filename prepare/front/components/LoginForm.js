import React, { useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { loginRequestAction } from '../reducers/user';

// styled-component를 서버 사이드 적용을 안해주면 바로 적용이 안됨
const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

// 함수형 컴포넌트에서 리렌더링이 될 때는 함수 안에 처음부터 끝까지 다시 실행된다.
// 하지만 return 부분을 다 다시 그리는 것이 아니라 그 안에서도 바뀌는 부분만 다시 그린다.
function LoginForm() {
  const dispatch = useDispatch();
  const { logInLoading, logInError } = useSelector((state) => state.user);
  // const [id, setId] = useState('');
  // const [password, setPassword] = useState('');
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  // useMemo는 값을 캐싱, useCallback은 함수를 캐싱
  // 컴포넌트에 props로 넘기는 함수는 useCallback 사용 권장 => 최적화를 위해
  // const onChangeId = useCallback((e) => {
  // setId(e.target.value);
  // }, []);

  // const onChangePassword = useCallback((e) => {
  //   setPassword(e.target.value);
  // }, []);

  // 아이디 비밀번호를 적고 로그인을 누르면
  // 로그인 리퀘스트 액션이 실행 => 사가의 이벤트 리스너 같은 역할을 하는 watchLogin에 잡히고 login이 실행
  // 그와 동시에 리듀서에 스위치의 로그인 리퀘스트도 동시 실행된다 (순서는 존재)
  // 로그인 석세스가 디스패치(put)되면 리듀서 스위치에서 로그인 석세스가 실행되고 me에 데이터가 들어간다
  const onSubmitForm = useCallback(() => {
    // antd e.preventDefault는 하면 안됨
    // onFinish에서 이미 적용되있기 때문에
    // setIsLoggedIn(true);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <br />
        <Input
          name="user-email"
          type="email"
          value={email}
          onChange={onChangeEmail}
          required
        />
      </div>

      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input name="user-password" onChange={onChangePassword} required />
      </div>

      {/* 객체는 리렌더링 될때마다 새로 생성되기 때문에 style에 객체를 넣어서는 안됨
        {} === {} => false
        <div style={{ marginTop: '10px' }}> 부분때문에 그 안에 Button과 Link과 리렌더링되는 결과를 초래
      */}
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={logInLoading}>
          로그인
        </Button>
        <Link href="/singup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
}

export default LoginForm;
