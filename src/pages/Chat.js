// react
import React from 'react';

// style
import styled from 'styled-components';

// pages
import { Chatting, NoRoom } from './index';

// redux
import { useDispatch, useSelector } from 'react-redux';

// router
import { useNavigate, useParams } from 'react-router-dom';

// toolkit - Slice
import { loadChat, postChat } from '../redux/modules/chatSlice';
import { loadChannel, createChannel, deleteChannel } from '../redux/modules/channelSlice';

// page
import Header from '../components/Header';

const Chat = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const message_ref = React.useRef(null);
  const channel_ref = React.useRef(null);

  // state에 axiso get한 데이터 불러오기
  // const chat_data = useSelector((state) => state.chat.list);
  const channel_data = useSelector(state => state.channel.list);

  // 첫 렌더링
  React.useEffect(() => {
    dispatch(loadChannel());
  }, [dispatch]);

  React.useEffect(() => {
    if (id) {
      dispatch(loadChat(id));
    }
  }, [dispatch]);

  // from 새로고침 없이 추가하기
  const addChannel = event => {
    event.preventDefault();
    createChannelList();
  };

  // ref 받아서 axios 추가 요청 보내는 함수(버튼)
  // 요청보내고 빈칸 만들기 '';
  const createChannelList = () => {
    dispatch(
      createChannel({
        channel: channel_ref.current.value,
      })
    );
    channel_ref.current.value = '';
  };

  const postChatList = () => {
    dispatch(
      postChat({
        roomId: id,
        message: message_ref.current.value,
      })
    );
    message_ref.current.value = '';
  };

  return (
    <React.Fragment>
      <Container>
        <Header></Header>
        <div style={{ display: 'flex' }}>
          <LeftBar>
            <div id='circle'></div>
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
                {channel_data &&
                  channel_data.map((list, index) => {
                    return (
                      <ChannelListBox
                        key={index}
                        onClick={() => {
                          navigate(`/Chat/${list.id}`);
                        }}
                      >
                        <p>🔒 {list.channel}</p>
                        <div
                          onClick={() => {
                            dispatch(deleteChannel(list));
                          }}
                        >
                          ⛔
                        </div>
                      </ChannelListBox>
                    );
                  })}
                <form onSubmit={addChannel} style={{ margin: '20px 20px' }}>
                  <input type='text' ref={channel_ref} placeholder='채널 이름'></input>
                  <button onClick={() => addChannel}>채널추가</button>
                </form>
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
                {!id && <NoRoom />}
                {id && <Chatting id={id} />}
              </ChatList>
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
  background-color: #19171d;
  border: 1px white solid;
  #circle {
    width: 50px;
    height: 50px;
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
  display: flex;
  cursor: pointer;

  & p {
    color: white;
  }
  & div {
    cursor: pointer;
    padding: 10px;
    position: fixed;
    left: 310px;
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
  background-color: lightgray;
  margin: 5px & p {
    color: black;
    padding: 15px;
  }
`;

const ChatList = styled.div`
  width: 1164px;
  height: 480px;
  border: 1px white solid;
  background-color: white;
  overflow: scroll;
  & p {
    color: black;
    padding: 15px;
  }
`;

export default Chat;
