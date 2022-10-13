import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

function PostCardContent({ postData }) {
  return (
  // 첫 번째 게시글 #해시태그 #해시태그
  // 키에 i 값을 주는것은 좋지 않지만 변할리가 없는 값이기 때문에 크게 문제 없음

  // 정규표현식 뒤에 g가 붙으면 여러개를 의미 (해시태그 여러개)
  // []: 제외,\s: 공백
  // split에서는 ()를 이용해야 포함된다.
    <div>
      {postData.split(/(#[^\s#]+)/g).map((v, i) => {
        if (v.match(/(#[^\s#]+)/)) {
          return (
            <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={i}>
              <a>{v}</a>
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
}

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
