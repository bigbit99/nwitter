import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';
import { updateProfile, updateCurrentUser } from '@firebase/auth';

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
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = async () => {
    await updateCurrentUser(authService, authService.currentUser);
    setUserObj(authService.currentUser);
  };

  return (
    <>
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
    </>
  );
}

export default App;
