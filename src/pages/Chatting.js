import React from "react";

import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

const Chatting = (props) => {
  const roomId = useParams();
  const channel_data = useSelector((state) => state.channel.list.id);
  console.log(channel_data);

  return (
    <React.Fragment>
      <p>Chatting</p>

      {/* {chat_data &&
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
        })} */}
    </React.Fragment>
  );
};
// params 받아온거를 api get요청 하나 더 만들어서 roomId를 디스패치하고
// chatList 부분에 noRoom && Chatting 비교해서 출력한다.

export default Chatting;
