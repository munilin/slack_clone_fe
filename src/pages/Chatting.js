import React, { useRef } from 'react';

import styled from 'styled-components';

// 리덕스 = history가 browser_router느낌
import { useDispatch, useSelector } from 'react-redux';

// 소켓 통신
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

// components  = Notfound
import NoRoom from './NoRoom';
import { getStorage } from '../shared/localStorage';
import { loadChat, postChat } from '../redux/modules/chatSlice';

const Chatting = props => {
  const channel_data = useSelector(state => state.channel.list);
  const chat_data = useSelector(state => state.chat.list);

  console.log(`chat_data: ${chat_data}`);

  // 웹 소켓 통신
  const dispatch = useDispatch();

  // 소켓 통신 객체 // 백엔드서버
  const sock = new SockJS('http://13.125.4.231/chatting');
  const ws = Stomp.over(sock);

  // 채널id 가져오기
  const channel = useSelector(state => state.channel.channel);
  const channelId = useSelector(state => state.channel.id);

  // 토큰
  const token = getStorage('token');

  // 보낼 메시지 텍스트
  // const message = useSelector(state => state.chat.message);
  // console.log(`message: ${message}`);

  // sedner 정보 가져오기
  const sender = getStorage('nickname');
  console.log(`token: ${token}`);
  console.log(`sender: ${sender}`);

  // 렌더링 될 때마다 연결,구독 다른 방으로 옮길 때 연결, 구독 해제
  React.useEffect(() => {
    wsConnectSubscribe();
    return () => {
      wsDisConnectUnsubscribe();
    };
  }, []); //channelId

  // 웹소켓 연결, 구독
  function wsConnectSubscribe() {
    try {
      ws.connect(
        {
          token: token,
        },
        () => {
          ws.subscribe(
            `/sub/api/chat/rooms/${parseInt(props.id)}`,
            data => {
              const newMessage = JSON.parse(data.body);
              dispatch(loadChat(newMessage));
            },
            { token: token }
          );
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  // 연결해제, 구독해제
  function wsDisConnectUnsubscribe() {
    try {
      ws.disconnect(
        () => {
          ws.unsubscribe('sub-0');
        },
        { token: token }
      );
    } catch (error) {
      console.log(error);
    }
  }

  // 웹소켓이 연결될 때 까지 실행하는 함수
  function waitForConnection(ws, callback) {
    setTimeout(
      function () {
        // 연결되었을 때 콜백함수 실행
        if (ws.ws.readyState === 1) {
          callback();
          // 연결이 안 되었으면 재호출
        } else {
          waitForConnection(ws, callback);
        }
      },
      1 // 밀리초 간격으로 실행
    );
  }

  // 메시지 보내기
  function sendMessage() {
    try {
      // token이 없으면 로그인 페이지로 이동
      if (!token) {
        alert('토큰이 없습니다. 다시 로그인 해주세요.');
        window.location.replace('/');
      }
      // send할 데이터
      const data = {
        type: 'TALK',
        roomId: channelId,
        sender: sender,
        message: message_ref,
      };
      // 빈문자열이면 리턴
      if (message_ref === '') {
        return;
      }
      // 로딩 중
      waitForConnection(ws, function () {
        ws.send('/pub/api/chat/message', { token: token }, JSON.stringify(data));
        console.log(ws.ws.readyState);
        console.log(`보낼 아이디: ${id}`);
        console.log(`보낼 메시지: ${message_ref}`);
        dispatch(postChat(id, message_ref));
      });
    } catch (error) {
      console.log(error);
      console.log(ws.ws.readyState);
    }
  }

  // 웹 소켓 통신 끝
  const addChat = event => {
    event.preventDefault();
  };

  const message_ref = React.useRef(null);
  return (
    <React.Fragment>
      <p>Chatting</p>
      <>
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
        <ChatPost>
          <ChatToolUp>
            <p>🟠🟡🟢🟤🔵🟣</p>
          </ChatToolUp>
          <form onSubmit={sendMessage}>
            <input ref={message_ref} className='Content' type='text' placeholder='7기 공지방에 메시지 보내기'></input>
            <ChatToolDown>
              <p>
                🟣🔵🟤🟠🟡🟢
                <img
                  src='https://cdn-icons-png.flaticon.com/512/149/149446.png'
                  alt='Post'
                  type='button'
                  onClick={() => {
                    sendMessage();
                  }}
                />
              </p>
            </ChatToolDown>
          </form>
        </ChatPost>
      </>
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
export default Chatting;
