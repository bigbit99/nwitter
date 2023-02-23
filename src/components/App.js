import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AppRouter from 'components/Router';
import { authService } from 'fbase';
import { updateProfile, updateCurrentUser } from '@firebase/auth';
import './app.style.css';

function App() {
  //1.firebase가 프로그램을 초기화 하길 기다리고 -> useEffect를 통해 기다릴 수 있음
  //2. 초기화 시키면 isLoggedIn이 바뀌게 한다
  const [init, setInit] = useState(false); //초기화 상태 state값
  const [isLoggedIn, setIsLoggedIn] = useState(false); //user의 로그인 여부를 알게해줌
  const [userObj, setUserObj] = useState(null);
  const [newName, setNewName] = useState('');

  //🔥useEffect는 처음 시작할 때, 즉 컴포넌트가 mount 될 때 실행됨
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      //onAuthStateChanged는 firebase가 가진 이벤트 리스너!
      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) =>
            updateProfile(user, { displayName: user.displayName }),
        });
      } else {
        setIsLoggedIn(null);
      }
      setInit(true);
      refreshUser();
    });
  }, []);

  const refreshUser = async () => {
    await updateCurrentUser(authService, authService.currentUser);
    setUserObj(authService.currentUser);
  };

  return (
    <WrapApp className={isLoggedIn ? 'is-allback' : 'rectback'}>
      <AppCont>
        {init ? (
          <AppRouter
            refreshUser={refreshUser}
            isLoggedIn={isLoggedIn}
            userObj={userObj}
            newName={newName}
          />
        ) : (
          'Initializing...'
        )}
        {/* <footer>&copy; {new Date().getFullYear()} Nwitter</footer> */}
      </AppCont>
    </WrapApp>
  );
}

export default App;

const WrapApp = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  margin: 0 auto;
  position: relative;
  &.rectback::before {
    content: '';
    display: block;
    width: 1000px;
    height: 1000px;
    margin-top: -525px;
    background-color: #999cff;
    background-image: radial-gradient(
        at 42% 42%,
        hsla(188, 80%, 60%, 1) 0px,
        transparent 50%
      ),
      radial-gradient(at 58% 88%, hsla(254, 67%, 61%, 1) 0px, transparent 50%),
      radial-gradient(at 66% 66%, hsla(359, 81%, 64%, 1) 0px, transparent 50%),
      radial-gradient(at 37% 37%, hsla(307, 75%, 77%, 1) 0px, transparent 50%),
      radial-gradient(at 73% 68%, hsla(277, 96%, 73%, 1) 0px, transparent 50%);
    border-bottom-left-radius: 80%;
    transform: rotate(-67deg);
    box-shadow: 10px 14px 54px rgba(0, 0, 0, 0.3);
  }

  &.is-allback {
    background-color: #99ddff;
    background-image: radial-gradient(
        at 59% 89%,
        hsla(220, 61%, 72%, 1) 0px,
        transparent 50%
      ),
      radial-gradient(at 23% 1%, hsla(264, 98%, 69%, 1) 0px, transparent 50%);
  }
`;

const AppCont = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;
