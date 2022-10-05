import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { List, Button, Card } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const StyledList = styled(List)`
    margin-bottom: 20 
`;

const StyledListItem = styled(List.Item)`
    margin-top: 20 
`;

const ButtonContainer = styled.div`
    text-align: center;
    margin: 10px 0
`;

function FollowList({ header, data }) {
  const grid = useMemo(() => ({ gutter: 4, xs: 2, md: 3 }), []);

  return (
    <StyledList
      grid={grid}
      size="small"
      header={<div>{header}</div>}
      loadMore={(
        <ButtonContainer>
          <Button>더 보기</Button>
        </ButtonContainer>
      )}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <StyledListItem>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </StyledListItem>
      )}
    />
  );
}

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
