// react
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// style
import styled from 'styled-components';

// token
import { getStorage, clearStorage } from '../shared/localStorage';

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const check = getStorage('token');

    if (check) {
      setIsLogin(true);
    }
  }, []);

  const logout = () => {
    console.log('로그아웃');
    clearStorage('token');
    clearStorage('useremail');
    clearStorage('nickname');
    window.location.replace('/');
    navigate('/');
  };

  return (
    <TopBar>
      <ul>💬</ul>
      {isLogin && (
        <div className='logout' onClick={logout}>
          <p>logout ✖</p>
        </div>
      )}
      <div className='search'>
        <input type='text' placeholder='검색어 입력' />
        <img src='https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png' alt='Search' />
      </div>
    </TopBar>
  );
};

const TopBar = styled.div`
  /* width: 1535px; */
  height: 40px;
  border: 2px solid;
  background-color: #121016;
  border: 1px white solid;
}
  .search {
    position: relative;
    width: 400px;
    margin: 3px auto;
  }
  input {
    width: 100%;
    height: 10px;
    border: 1px solid #bbb;
    padding: 14px 12px;
    font-size: 14px;
  }
  img {
    position: absolute;
    width: 15px;
    top: 6px;
    right: 12px;
    margin: 0;
    cursor: pointer;
  }
  p {
    float: right;
    color: white;
    margin: 11px;
    cursor: pointer;
  }
  ul {
    float: left;
    color: white;
    margin: 11px;
    cursor: pointer;
  }
  .logout {
    color: white;
    cursor: pointer;
  }
`;

export default Header;
