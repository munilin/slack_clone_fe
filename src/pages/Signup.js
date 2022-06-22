// react
import React, { useState } from 'react';

// axios
import axios from 'axios';

// style
import styled from 'styled-components';

// redux
import { createUser } from '../redux/modules/userSlice';
import { useDispatch } from 'react-redux';

// router
import { useNavigate, Link } from 'react-router-dom';
import { userApi } from '../shared/api';

const Signup = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [validation, setValidation] = useState({
    email: false,
    pwd: false,
    pwdCheck: false,
    nickname: false,
  });

  const [inputValue, setInputValue] = useState({
    email: '',
    pwd: '',
    pwdCheck: '',
    nickname: '',
  });

  // 유효성 검사
  const validationCheck = (type, value) => {
    const regexEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    // 비밀번호 영대소문자, 숫자, 특수문자 최소 1개 8~14글자
    const regexPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/;
    // 영어, 한글2~10글자
    const regexNickname = /^(?=.*[a-z가-힣])[a-z가-힣]{2,10}$/;
    switch (type) {
      case 'email': {
        if (value.indexOf('.com') === -1) {
          setValidation({
            ...validation,
            email: true,
          });
          return;
        }
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
      case 'nickname': {
        if (!regexNickname.test(value)) {
          setValidation({
            ...validation,
            nickname: true,
          });
        } else {
          setValidation({
            ...validation,
            nickname: false,
          });
        }
        break;
      }
      default:
        break;
    }
  };

  // 입력 받을 때 마다 validation 체크
  const handleInput = event => {
    validationCheck(event.target.name, event.target.value);
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  // 입력 값의 공백 방지
  const checkBlankValue = () => {
    if (inputValue.email.trim() === '') {
      setValidation({
        ...validation,
        email: true,
      });
      return false;
    }

    // 비밀번호가 공백일 때
    if (inputValue.pwd.trim() === '') {
      setValidation({
        ...validation,
        pwd: true,
      });
      return false;
    }

    // 비밀번호 체크가 공백일 때
    if (inputValue.pwdCheck.trim() === '') {
      setValidation({
        ...validation,
        pwdCheck: true,
      });
      return false;
    }

    // 닉네임이 공백일 때
    if (inputValue.nickname.trim() === '') {
      setValidation({
        ...validation,
        nickname: true,
      });
      return false;
    }

    return true;
  };

  // 회원가입 <-> 백통신
  const signup = async userData => {
    try {
      // const repsonse = await axios.post('http://13.125.4.231/user/signup', {
      const repsonse = await userApi.signup(userData);
      console.log(repsonse);
      navigate('/');
    } catch (error) {
      console.log(error);
      setInputValue({ email: '', pwd: '', pwdCheck: '', nickname: '' });
    }
  };

  // 회원가입 버튼 클릭
  const handleSignUp = event => {
    console.log('회원가입 버튼 클릭');
    event.preventDefault();

    // 공백 체크
    if (!checkBlankValue()) {
      return;
    }

    // 비밀번호 일치 여부 체크
    validationCheck('pwdCheck', inputValue.pwdCheck);

    const isSubmit = Object.values(validation).indexOf(true);
    const userData = { useremail: inputValue.email, password: inputValue.pwd, nickname: inputValue.nickname };

    if (isSubmit === -1) {
      signup(userData);
    }
  };

  return (
    <React.Fragment>
      <SignUpForm onSubmit={handleSignUp}>
        <Link to={'/'}>
          <Logo>
            <img height='48' src='https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg' alt='슬랙 로고' />
          </Logo>
        </Link>
        <Guide>먼저 이메일부터 입력해 보세요</Guide>
        <Reco>직장에서 사용하는 이메일 주소로 회원가입하는걸 추천드려요.</Reco>
        <InputBox>
          <Input email={validation.email} value={inputValue.email} onChange={handleInput} name='email' type='text' placeholder='이메일을 입력해주세요' />
          <Validation email={validation.email}>이메일 형식을 입력해주세요</Validation>

          <Input
            pwd={validation.pwd}
            value={inputValue.pwd}
            onChange={handleInput}
            name='pwd'
            type='password'
            maxLength='14'
            placeholder='비밀번호를 입력해주세요.'
          />
          <Validation pwd={validation.pwd}>8글자 이상. 대소문자, 숫자, 특수문자가 포함되어야 합니다.</Validation>

          <Input
            pwdcheck={validation.pwdCheck}
            value={inputValue.pwdCheck}
            onChange={handleInput}
            name='pwdCheck'
            type='password'
            maxLength='14'
            placeholder='비밀번호를 재확인해주세요.'
          />
          <Validation pwdcheck={validation.pwdCheck}>비밀번호와 일치하지 않습니다.</Validation>

          <Input
            nickname={validation.nickname}
            value={inputValue.nickname}
            onChange={handleInput}
            name='nickname'
            type='text'
            placeholder='닉네임을 입력해주세요.'
          />
          <Validation nickname={validation.nickname}>2~10자리의 영문 또는 한글을 입력해주세요.</Validation>
          <button>계속</button>
        </InputBox>
      </SignUpForm>
    </React.Fragment>
  );
};

const Logo = styled.div`
  margin: 45px 0 25px 0;
  cursor: pointer;
`;
const Guide = styled.span``;
const Reco = styled.span``;
const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 1920px; */
  width: 600px;
  margin: 0 auto;
  ${Guide} {
    display: block;
    font-weight: 700;
    font-size: 36px;
    margin-bottom: 10px;
  }
  ${Reco} {
    display: block;
    font-size: 16px;
    font-weight: 700;
    margin: 10px 0 25px 0;
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
    display: ${props => (props.nickname ? 'static' : 'none')};
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
