// 채팅 관련 함수들 가져오기 = chat.js에 다 불려있고
import { chatActions } from '../redux/modules/chat';

// 리덕스 = history가 browser_router느낌
import { useDispatch, useSelector } from 'react-redux';

// 소켓 통신
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

// components  = Notfound
import NoRoom from './NoRoom';
import { getStorage } from '../shared/localStorage';

import { loadChatAction, postChatAction } from '../redux/modules/chatSlice';

// 채팅 방 컴포넌트
const ChatRoom = props => {
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
  const message = useSelector(state => state.chat.message);
  console.log(`message: ${message}`);

  // sedner 정보 가져오기
  sender = getStorage('username');
  console.log(`token: ${token}`);
  console.log(`sender: ${sender}`);

  // 렌더링 될 때마다 연결,구독 다른 방으로 옮길 때 연결, 구독 해제
  React.useEffect(() => {
    wsConnectSubscribe();
    return () => {
      wsDisConnectUnsubscribe();
    };
  }, [channelId]); //channelId

  // 웹소켓 연결, 구독
  function wsConnectSubscribe() {
    try {
      ws.connect(
        {
          token: token,
        },
        () => {
          ws.subscribe(
            `/sub/api/chat/rooms/${channelId}`,
            data => {
              const newMessage = JSON.parse(data.body);
              dispatch(loadChatAction(newMessage));
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
        message: message,
      };
      // 빈문자열이면 리턴
      if (message === '') {
        return;
      }
      // 로딩 중
      dispatch(chatActions.isLoading());
      waitForConnection(ws, function () {
        ws.send('/pub/api/chat/message', { token: token }, JSON.stringify(data));
        console.log(ws.ws.readyState);
        dispatch(postChatAction(''));
      });
    } catch (error) {
      console.log(error);
      console.log(ws.ws.readyState);
    }
  }

  // 나가기 상태 보여주기 = 우린 없는데
  const outRoomStat = useSelector(state => state.chat.chatOut);

  if (outRoomStat === true) {
    return (
      <Container>
        <ChatList prevRoomId={roomId} />
        <NoRoom />
      </Container>
    );
  }

  return (
    <Container>
      <ChatList prevRoomId={roomId} />
      {!roomId && <NoRoom />}
      {roomId && (
        <ChatWrap>
          <ChatName roomName={roomName} category={category} />
          <MessageList />
          <MessageWrite sendMessage={sendMessage} />
        </ChatWrap>
      )}
    </Container>
  );
};

const Container = styled.div`
  ${props => props.theme.border_box};
  ${props => props.theme.flex_row}
  width: 100%;
  height: 100%;
  background-color: white;
  color: ${props => props.theme.theme_yellow};
  @media ${props => props.theme.mobile} {
    flex-direction: column;
  }
`;

const ChatWrap = styled.div`
  ${props => props.theme.flex_column}
  width: 70%;
  height: 100%;
  @media ${props => props.theme.mobile} {
    width: 100%;
    height: 85%;
  }
`;

export default ChatRoom;
