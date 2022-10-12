import { Form, Input, Button } from 'antd';
import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const FormItem = styled(Form.Item)`
  position: 'relative';
  margin: 0;
`;

const StyledButton = styled(Button)`
  position: 'absolute';
  right: 0;
  bottom: -40;
  zIndex: 1;
`;

function CommentForm({ post }) {
  const dispatch = useDispatch();
  const { addCommentDone, addCommentLoading } = useSelector(
    (state) => state.post,
  );
  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  const id = useSelector((state) => state.user.me?.id);

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id },
    });
  }, [commentText, id]);

  return (
    <Form onFinish={onSubmitComment}>
      <FormItem>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <StyledButton
          type="primary"
          htmlType="submit"
          loading={addCommentLoading}
        >
          삐약
        </StyledButton>
      </FormItem>
    </Form>
  );
}

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
