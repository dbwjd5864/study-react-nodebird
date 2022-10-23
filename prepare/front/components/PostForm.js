import React, { useCallback, useRef, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addPost } from '../reducers/post';

import useInput from '../hooks/useInput';

const StyledForm = styled(Form)`
  margin: '10px 0 20px'
`;

const ImageContainer = styled.div`
  display: 'inline-block'
`;

const SubmitButton = styled(Button)`
  float: 'right'
`;

const Img = styled.img`
  width: '200px'
`;

function PostForm() {
  const dispatch = useDispatch();
  // 실제 돔에 접근하기 위해 ref를 사용한다.
  const imageInput = useRef();
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const [text, onChangeText, setText] = useInput('');

  useEffect(() => {
    // 이렇게 setText 쓰는 위치를 해줘야 만약에 addPost를 하여 에러가 발생했을 때 text를 초기화 시키는걸 막을 수 있음
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    // addPost, action은 객체
    // 동적으로 action이 필요할 경우에는 action creator 라는 함수를 만들어 준다.
    dispatch(addPost(text));
  }, [text]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current?.click();
  }, [imageInput.current]);

  return (
    <StyledForm
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input type="file" name="image" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <SubmitButton type="primary" htmlType="submit">
          짹짹
        </SubmitButton>
      </div>
      <div>
        {imagePaths.map((v) => (
          <ImageContainer key={v}>
            <Img
              src={v.replace(/\/thumb\//, '/original/')}
              alt={v}
            />
            <div>
              <Button>제거</Button>
            </div>
          </ImageContainer>
        ))}
      </div>
    </StyledForm>
  );
}

export default PostForm;
