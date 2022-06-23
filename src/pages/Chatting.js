import React from "react";

import styled from "styled-components";

import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

const Chatting = (props) => {
  const roomId = useParams();
  const channel_data = useSelector((state) => state.channel.list);
  const chat_data = useSelector((state) => state.chat.list);

  console.log(channel_data);

  return (
    <React.Fragment>
      <p>Chatting</p>
      <ChatList>
        {chat_data &&
          chat_data.map((list, index) => {
            return (
              <ChatContent key={index}>
                <p>
                  userID : {list.id}
                  <br />
                  {list.message}
                </p>
              </ChatContent>
            );
          })}
      </ChatList>
    </React.Fragment>
  );
};

// params 받아온거를 api get요청 하나 더 만들어서 roomId를 디스패치하고
// chatList 부분에 noRoom && Chatting 비교해서 출력한다.

const ChatList = styled.div`
  width: 1150px;
  min-height: 100%;
  border: 1px white solid;
  background-color: lightgray;
  
  & p {
    color: black;
    padding: 15px;
  }
`;

const ChatContent = styled.div`
  width: 1140px;
  background-color: white;
  flex-direction: column;
  margin: 5px 5px auto;
  & p {
    color: black;
    padding: 15px;
  }
`;

export default Chatting;
