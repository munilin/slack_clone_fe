import React, { useState } from 'react';
import styled from 'styled-components';

const Signup = props => {
  const [validation, setValidation] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: '',
    pwd: '',
    pwdCheck: '',
    nickname: '',
  });

  const handleInput = event => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  const handleSignUp = event => {
    event.preventDefault();

    if (inputValue.email.trim() === '') {
    }
    if (inputValue.pwd.trim() === '') {
    }
    if (inputValue.pwdCheck.trim() === '') {
    }
    if (inputValue.nickname.trim() === '') {
    }

    console.log(inputValue);

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
        <div>
          <img height='48' src='https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg' alt='슬랙 로고' />
        </div>
        <Guide>먼저 이메일부터 입력해 보세요</Guide>
        <Reco>직장에서 사용하는 이메일 주소로 로그인하는걸 추천드려요.</Reco>
        <InputBox>
          <input value={inputValue.email} onChange={handleInput} name='email' type='text' placeholder='이메일을 입력해주세요' />
          <span>이메일 형식을 입력해주세요</span>
          <input value={inputValue.pwd} onChange={handleInput} name='pwd' type='password' placeholder='비밀번호를 입력해주세요.' />
          <span>8글자 이상. 대소문자, 숫자, 특수기호가 포함되어야 합니다.</span>
          <input value={inputValue.pwdCheck} onChange={handleInput} name='pwdCheck' type='password' placeholder='비밀번호를 재확인해주세요.' />
          <span>비밀번호와 일치하지 않습니다.</span>
          <input value={inputValue.nickname} onChange={handleInput} name='nickname' type='text' placeholder='닉네임을 입력해주세요.' />
          <span>2~8자리의 글자를 입력해주세요.</span>
          <button>계속</button>
        </InputBox>
      </SignUpForm>
    </React.Fragment>
  );
};

const Guide = styled.span``;
const Reco = styled.span``;
const SignUpForm = styled.form`
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
  ${Guide} {
    font-weight: 700;
    font-size: 36px;
  }
  ${Reco} {
    font-size: 16px;
    font-weight: 700;
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
    margin-bottom: 10px;
  }
  input:focus {
    border: 1.7px solid #1e90ff;
  }
  span {
    display: block;
    width: 100%;
    align-self: flex-start;
    margin-bottom: 15px;
    color: red;
    font-size: 14px;
  }
  span:first-of-type {
    display: none;
  }
  span:nth-of-type(2) {
    display: none;
  }
  span:nth-of-type(3) {
    display: none;
  }
  span:last-of-type {
    display: none;
  }
  button {
    width: 100%;
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
