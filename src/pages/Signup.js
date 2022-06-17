import React, { useState } from 'react';
import styled from 'styled-components';

const Signup = props => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPwd, setInputPwd] = useState('');
  const [inputPwdCheck, setInputPwdCheck] = useState('');
  const [inputNickname, setInputNickname] = useState('');
  return (
    <React.Fragment>
      <SignUpForm>
        <div>
          <img height='48' src='https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg' alt='슬랙 로고' />
        </div>
        <span>먼저 이메일부터 입력해 보세요</span>
        <span>직장에서 사용하는 이메일 주소로 로그인하는걸 추천드려요.</span>
        <InputBox>
          <input type='text' placeholder='이메일을 입력해주세요' />
          <input type='password' placeholder='비밀번호를 입력해주세요.' />
          <input type='password' placeholder='비밀번호를 재확인해주세요.' />
          <input type='text' placeholder='닉네임을 입력해주세요.' />
          <button>계속</button>
        </InputBox>
      </SignUpForm>
    </React.Fragment>
  );
};
const SignUpForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 1920px; */
  width: 600px;
  margin: 0 auto;
  div {
    margin: 45px 0 25px 0;
  }
  span {
    display: block;
    margin: 10px;
  }
  span:first-of-type {
    font-weight: 700;
    font-size: 36px;
  }
  span:last-of-type {
    font-size: 16px;
    font-weight: 700;
  }
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    width: 60%;
    margin-bottom: 14px;
    padding: 8px;
    outline: none;
    border: 1.7px solid black;
    font-size: 18px;
    box-sizing: border-box;
    border-radius: 5px;
  }
  input:focus {
    border: 1.7px solid #1e90ff;
  }
  button {
    width: 60%;
    margin-top: 10px;
    padding: 10px 0;
    color: #fff;
    background-color: #27242c;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
  }
  button:hover {
    background-color: #121016;
  }
`;
export default Signup;
