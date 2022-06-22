import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionCreators as userActions } from '../redux/modules/user';
import { getStorage } from './localStorage';

/**
 * Page 			: 해당 라우트에서 보여줄 페이지
 * checkAuth 	: 해당 라우트 AuthCheck 여부 (boolean)
 * return			: 해당 페이지와 react-router props(history, match, location)
 */

export default (Page, checkAuth) => {
  return props => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = getStorage('token');
    const nickname = getStorage('nickname');
    const useremail = getStorage('useremail');
    const is_login = Boolean(token && nickname && useremail);

    useEffect(() => {
      // 로그인 쿠키정보가 있으면 리덕스 user 데이터 갱신
      if (is_login) {
        const user_data = { nickname, useremail, is_login };
        // dispatch(userActions.setUser(user_data));
      }
      // 로그인을 하지 않았는데 로그인 필요한 페이지에 있을 경우
      if (!is_login && checkAuth) {
        alert('로그인이 필요한 페이지 입니다.');
        navigate('/');
        // props.history.replace('/login');
      }

      // 이미 로그인하여 현재 페이지에 있을 필요가 없는 경우
      else if (is_login && !checkAuth) {
        // props.history.push('/');
      }
    }, []);

    return <Page {...props} />;
  };
};
