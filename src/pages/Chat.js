import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { loadChat, postChat } from "../redux/modules/chatSlice";

const Chat = (props) => {
  const dispatch = useDispatch();

  const message_ref = React.useRef(null);
  const chat_data = useSelector((state) => state.chat.data);
  console.log(chat_data);

  React.useEffect(() => {
    dispatch(loadChat());
  }, [dispatch]);

  const postChatList = () => {
    dispatch(
      postChat({
        message: message_ref.current.value,
      })
    );
  };

  return (
    <React.Fragment>
      <Container>
        <Header></Header>
        <div style={{ display: "flex" }}>
          <LeftBar>
            <div id="circle"></div>
          </LeftBar>
          <div>
            <WorkSpace>
              <p>Hanghae99</p>
            </WorkSpace>
            <ChannelBox>
              <ChannelList1>
                <p>📬 스레드</p>
                <p>📮 멘션 및 반응</p>
                <p>📝 Slack Connect</p>
                <p>⛓ 더보기</p>
              </ChannelList1>
              <hr />
              <ChannelList2>
                <p>🔽 채널</p>
                {chat_data &&
                  chat_data.map((list, index) => {
                    return (
                      <ChannelListBox key={index}>
                        <p>🔒 {list.message}</p>
                      </ChannelListBox>
                    );
                  })}
                ;
              </ChannelList2>
            </ChannelBox>
          </div>
          <div>
            <ChannelTitle>
              <p>7기 공지방</p>
            </ChannelTitle>
            <BookMark>
              <p>+ 책갈피</p>
            </BookMark>
            <ChatBox>
              <ChatList>
                <ChatContent>
                  <p>프로필,닉네임,메시지,시간</p>
                </ChatContent>
                <ChatContent1>
                  역방향 아래서 위로 어카지 flex-direction, column-reverse 안됌
                </ChatContent1>
              </ChatList>
              <ChatPost>
                <ChatToolUp>
                  <p>🟠🟡🟢🟤🔵🟣</p>
                </ChatToolUp>
                <input
                  ref={message_ref}
                  className="Content"
                  type="text"
                  placeholder="7기 공지방에 메시지 보내기"
                ></input>

                <ChatToolDown>
                  <p>
                    🟣🔵🟤🟠🟡🟢
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/149/149446.png"
                      alt="Post"
                      onClick={() => {
                        postChatList();
                      }}
                    />
                  </p>
                </ChatToolDown>
              </ChatPost>
            </ChatBox>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};
const Container = styled.div`
  // width: 100%;
  // height: 100%;
`;
const LeftBar = styled.div`
  width: 70px;
  height: 680px;
  background-color: #19171D; 
  border: 1px white solid;
}
#circle {
  width : 50px;
  height : 50px;
  border-radius: 50%;
  background-color: tomato;
  margin: 10px auto;
}
`;
const WorkSpace = styled.div`
  width: 300px;
  height: 50px;
  border: 1px white solid;
  background-color: #19171d;
  & p {
    color: white;
    font-size: 25px;
    padding: 10px;
  }
`;

const ChannelBox = styled.div`
  width: 300px;
  height: 630px;
  border: 1px white solid;
  background-color: #19171d;
`;
const ChannelList1 = styled.div`
  width: 300px;
  height: 150px;
  background-color: #19171d;
  & p {
    color: white;
    padding: 10px;
  }
`;
const ChannelList2 = styled.div`
  width: 300px;
  height: 450px;
  background-color: #19171d;
  & p {
    color: white;
    padding: 10px;
  }
`;
const ChannelListBox = styled.div`
  width: 300px;
  height: 30px;
  background-color: #19171d;
  & p {
    color: white;
  }
`;

const ChannelTitle = styled.div`
  width: 1165px;
  height: 50px;
  border: 1px white solid;
  background-color: #19171d;
  & p {
    color: white;
    padding: 15px;
  }
`;

const BookMark = styled.div`
  width: 1165px;
  height: 30px;
  border: 1px white solid;
  background-color: #191454;
  & p {
    color: white;
    font-size: 12px;
    padding: 10px;
  }
`;

const ChatBox = styled.div`
  width: 1165px;
  height: 600px;
  border: 1px white solid;
  background-color: gray;
  & p {
    color: white;
    padding: 15px;
  }
`;

const ChatList = styled.div`
  width: 1164px;
  height: 480px;
  border: 1px white solid;
  background-color: gray;
  & p {
    color: white;
    padding: 15px;
  }
`;

const ChatContent = styled.div`
  width: 1150px;
  height: 50px;
  background-color: white;
  flex-direction: column;
  margin: 5px auto;
  & p {
    color: black;
    padding: 15px;
  }
`;
const ChatContent1 = styled.div`
  width: 1150px;
  height: 50px;
  background-color: white;
  margin: 5px auto;

  & p {
    color: black;
    padding: 15px;
  }
`;

const ChatPost = styled.div`
  width: 1150px;
  height: 110px;
  background-color: white;
  margin: 5px auto;
  border: 1px solid;
  border-radius: 10px;

  & input {
    margin-left: 5px;
    width: 1140px;
    height: 40px;
    border: none;
  }
  img {
    width: 15px;
    cursor: pointer;
    margin: -4px 4px;
  }
`;

const ChatToolUp = styled.div`
  width: 1148px;
  height: 30px;
  background-color: lightgray;
  border-radius: 10px 10px 0px 0px;
  margin: auto;
  & p {
    color: black;
    padding: 7px;
  }
`;

const ChatToolDown = styled.div`
  width: 1148px;
  height: 30px;
  background-color: lightgray;
  margin: 8px auto;
  border-radius: 0px 0px 10px 10px;
  & p {
    color: black;
    padding: 7px;
  }

  img {
    float: right;
    width: 25px;
    cursor: pointer;
  }
`;
export default Chat;
