// react
import React, { useState } from 'react';

// router
import { Link } from 'react-router-dom';

// style
import styled from 'styled-components';

// redux
import { useDispatch } from 'react-redux';
import { loginDB } from '../redux/module/userSlice';

const Login = props => {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState({
    email: '',
    pwd: '',
  });

  const handleInput = event => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  const handleSignUp = event => {
    event.preventDefault();

    if (inputValue.email.trim() === '') {
      return false;
    }
    if (inputValue.pwd.trim() === '') {
      return false;
    }

    dispatch(loginDB(inputValue.email, inputValue.pwd));

    setInputValue({
      email: '',
      pwd: '',
      pwdCheck: '',
      nickname: '',
    });
  };
  return (
    <React.Fragment>
      <SignUpForm onSubmit={handleSignUp}>
        <SignUp>
          <span>Slack을 처음 사용하시나요?</span>
          <Link to='/signup'>
            <span>계정 생성</span>
          </Link>
        </SignUp>
        <Logo>
          <img height='48' src='https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg' alt='슬랙 로고' />
        </Logo>
        <Guide>이메일로 로그인 해보세요</Guide>
        <Reco>직장에서 사용하는 이메일 주소로 로그인하는걸 추천드려요.</Reco>
        <InputBox>
          <button>Google 계정으로 로그인</button>
          <button>Apple 계정으로 로그인</button>
          <Line>또는</Line>
          <input value={inputValue.email} onChange={handleInput} name='email' type='text' placeholder='이메일을 입력하세요.' />
          <input value={inputValue.pwd} onChange={handleInput} name='pwd' type='password' placeholder='비밀번호를 입력해주세요.' />
          <button>이메일로 로그인</button>
        </InputBox>
      </SignUpForm>
    </React.Fragment>
  );
};

const SignUp = styled.div`
  position: absolute;
  right: 5%;
  top: 15%;
  font-size: 14px;
  span {
    font-weight: bold;
  }
  span:first-child {
    display: block;
    text-align: right;
  }
  span:last-child {
    color: #1e90ff;
  }
`;
const Logo = styled.div``;
const Guide = styled.span``;
const Reco = styled.span``;
const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  margin: 0 auto;
  ${Logo} {
    margin: 45px 0 25px 0;
  }
  ${Guide} {
    display: block;
    margin-bottom: 20px;
    font-weight: 700;
    font-size: 36px;
  }
  ${Reco} {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 15px;
  }
`;

const InputBox = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    width: 100%;
    padding: 8px;
    outline: none;
    border: 1.7px solid black;
    font-size: 18px;
    box-sizing: border-box;
    border-radius: 5px;
  }
  input:last-of-type {
    margin-top: 10px;
  }
  input:focus {
    border: 1.7px solid #1e90ff;
  }
  button {
    width: 100%;
    padding: 10px 0;
    margin-top: 10px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
  }
  button:first-of-type {
    color: #1e90ff;
    border: 2px solid #1e90ff;
  }
  button:nth-of-type(2) {
  }
  button:last-of-type {
    color: #fff;
    background-color: #27242c;
  }
  button:last-of-type:hover {
    background-color: #121016;
  }
`;

const Line = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  margin: 10px 0;
  &::before {
    content: '';
    flex-grow: 1;
    margin-right: 16px;
    height: 1px;
    font-size: 0px;
    line-height: 0px;
  }
  &::after {
    content: '';
    flex-grow: 1;
    margin-left: 16px;
    height: 1px;
    font-size: 0px;
    line-height: 0px;
  }
`;

export default Login;
