import React from 'react';
import styled from "styled-components";


const Chat = (props) => {
  
  return (
    <React.Fragment>
      <TopBar>
      <p>검색창</p>
      </TopBar>
    </React.Fragment>
  );
}

const TopBar = styled.div`
  width: 100wh;
  height: 30px;
  margin: auto;
  padding: 16px;
  border: 2px solid;
  border-radius: 5px;
  display: flex;
  & input {
    border: none;
    margin: auto;
    width: 100px;
    height: 30px;
  }
  & span {
    cursor: pointer;
  }
`;

export default Chat;