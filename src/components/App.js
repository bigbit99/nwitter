import React, {useState} from "react";
import AppRouter from "components/Router";
import { authService } from 'fbase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
                                          //user의 로그인 여부를 알게해줌

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn}/>
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
     </>
  );
}

export default App;
