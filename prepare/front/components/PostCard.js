import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, Popover, Avatar, List, Comment } from 'antd';
import {
  RetweetOutlined,
  EllipsisOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { REMOVE_POST_REQUEST } from '../reducers/post';
import FollowButton from './FollowButton';

const CardContainer = styled.div`
    margin-bottom: 20
`;

function PostCard({ post }) {
  // const { me } = useSelector((state) => state.user);
  // optional chaining
  // const id = me?.id;
  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state) => state.post);
  const id = useSelector((state) => state.user.me?.id);

  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const onClickUpdate = () => {};

  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  // const onLike = () => {};

  // const onUnlike = () => {};

  return (
    <CardContainer>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        // jsx안에 배열값에는 항상 키값이 필요
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onToggleLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={(
              <Button.Group>
                id && post.User.id === id ? (
                <>
                  {!post.RetweetId && (
                    <Button onClick={onClickUpdate}>수정</Button>
                  )}
                  <Button
                    type="danger"
                    loading={removePostLoading}
                    onClick={onRemovePost}
                  >
                    삭제
                  </Button>
                </>
                ) : (
                <Button>신고</Button>
                )
              </Button.Group>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={id && <FollowButton post={post} />}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {commentFormOpened && (
        <div>
          {/* 어떤 게시글에 댓글을 달것인지 정보가 필요 */}
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
      {/* <CommentForm /> */}
      {/* <Comments /> */}
    </CardContainer>
  );
}

PostCard.propTypes = {
  // shape는 속성들을 정의해줄 수 있다.
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    // 객체들의 배열
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
