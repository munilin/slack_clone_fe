import React, { useState } from 'react';
import styled from 'styled-components';
import { userApi } from '../shared/api';
import { useNavigate } from 'react-router-dom';

const Signup = props => {
  const navigate = useNavigate();
  const [validation, setValidation] = useState({
    email: false,
    pwd: false,
    pwdCheck: false,
    username: false,
  });

  const [inputValue, setInputValue] = useState({
    email: '',
    pwd: '',
    pwdCheck: '',
    username: '',
  });

  const validationCheck = (type, value) => {
    const regexEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const regexPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // 영어, 한글, 숫자 2~8글자
    const regexUsername = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;
    switch (type) {
      case 'email': {
        if (!regexEmail.test(value)) {
          setValidation({
            ...validation,
            email: true,
          });
        } else {
          setValidation({
            ...validation,
            email: false,
          });
        }
        break;
      }
      case 'pwd': {
        if (!regexPwd.test(value)) {
          setValidation({
            ...validation,
            pwd: true,
          });
        } else {
          setValidation({
            ...validation,
            pwd: false,
          });
        }
        break;
      }
      case 'pwdCheck': {
        if (value !== inputValue.pwd) {
          setValidation({
            ...validation,
            pwdCheck: true,
          });
        } else {
          setValidation({
            ...validation,
            pwdCheck: false,
          });
        }
        break;
      }
      case 'username': {
        if (!regexUsername.test(value)) {
          setValidation({
            ...validation,
            username: true,
          });
        } else {
          setValidation({
            ...validation,
            username: false,
          });
        }
        break;
      }
      default:
        break;
    }
  };

  const handleInput = event => {
    validationCheck(event.target.name, event.target.value);
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  const handleSignUp = event => {
    event.preventDefault();

    // 이메일이 공백일 때
    if (inputValue.email.trim() === '') {
      setValidation({
        ...validation,
        email: true,
      });
      return;
    }

    // 비밀번호가 공백일 때
    if (inputValue.pwd.trim() === '') {
      setValidation({
        ...validation,
        pwd: true,
      });
      return;
    }

    // 비밀번호 체크가 공백일 때
    if (inputValue.pwdCheck.trim() === '') {
      setValidation({
        ...validation,
        pwdCheck: true,
      });
      return;
    }

    // 닉네임이 공백일 때
    if (inputValue.username.trim() === '') {
      setValidation({
        ...validation,
        username: true,
      });
      return;
    }

    validationCheck('pwdCheck', inputValue.pwdCheck);

    const isSubmit = Object.values(validation).indexOf(true);

    if (isSubmit === -1) {
      try {
        // 여기서 로직 타지 말고 userSlice로 이동해서 처리하고 state.user에 유저 정보가 들어가게 처리
        const response = userApi.signup(inputValue.email, inputValue.pwd, inputValue.username);
        console.log(response);
        navigate('/login');
      } catch (error) {
        console.log(error);
      }

      // 입력 값 초기화
      setInputValue({
        email: '',
        pwd: '',
        pwdCheck: '',
        username: '',
      });
    } else {
      alert('회원정보를 확인해주세요.');
      return false;
    }
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
          <Input email={validation.email} onChange={handleInput} name='email' type='text' placeholder='이메일을 입력해주세요' />
          <Validation email={validation.email}>이메일 형식을 입력해주세요</Validation>

          <Input pwd={validation.pwd} onChange={handleInput} name='pwd' type='password' placeholder='비밀번호를 입력해주세요.' />
          <Validation pwd={validation.pwd}>8글자 이상. 대소문자, 숫자, 특수기호가 포함되어야 합니다.</Validation>

          <Input pwdcheck={validation.pwdCheck} onChange={handleInput} name='pwdCheck' type='password' placeholder='비밀번호를 재확인해주세요.' />
          <Validation pwdcheck={validation.pwdCheck}>비밀번호와 일치하지 않습니다.</Validation>

          <Input username={validation.username} onChange={handleInput} name='username' type='text' placeholder='닉네임을 입력해주세요.' />
          <Validation username={validation.username}>2~8자리의 글자를 입력해주세요.</Validation>
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
  ${Guide} {
    display: block;
    font-weight: 700;
    font-size: 36px;
    margin: 10px;
  }
  ${Reco} {
    display: block;
    font-size: 16px;
    font-weight: 700;
    margin: 10px;
  }
`;

const Validation = styled.span`
  width: 100%;
  display: block;
  align-self: flex-start;
  margin-bottom: 15px;
  font-size: 14px;
  color: red;
  &:first-of-type {
    display: ${props => (props.email ? 'static' : 'none')};
  }
  &:nth-of-type(2) {
    display: ${props => (props.pwd ? 'static' : 'none')};
  }
  &:nth-of-type(3) {
    display: ${props => (props.pwdcheck ? 'static' : 'none')};
  }
  &:last-of-type {
    display: ${props => (props.username ? 'static' : 'none')};
  }
`;

const Input = styled.input``;
const InputBox = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${Input} {
    width: 100%;
    padding: 8px;
    outline: none;
    border: 1.7px solid black;
    margin-bottom: 10px;
    font-size: 18px;
    box-sizing: border-box;
    border-radius: 5px;
  }
  ${Input}:focus {
    border: 1.7px solid #1e90ff;
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
