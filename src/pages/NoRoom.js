import React from "react";
import styled from "styled-components";

const NoRoom = (props) => {
  return (
    <Container>
      <img
        src="https://a.slack-edge.com/production-standard-emoji-assets/13.0/google-large/1f331@2x.png"
        alt="thread"
      /><br/><br/>
      <h1>스레드 관리하기</h1><br/>
      <h5>고객님이 속한 스레드는 바로 여기에 수집됩니다.</h5><br/>

      <span>스레드에 관해 자세히 알아보기</span>
    </Container>
  );
};

const Container = styled.div`
  width: 310px;
  margin: 12% 35% auto;
  text-align: center;

  & h1 { 
    font-size: 20px;
    font-weight: bold;
  }

  & span {
    color : blue;
  }
`;

export default NoRoom;
