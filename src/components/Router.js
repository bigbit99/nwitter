import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from 'components/Navigation';
import Profiles from '../routes/Profiles';

//Hooks
const AppRouter = ({ refreshUser, isLoggedIn, userObj, newName }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path='/' element={<Home userObj={userObj} />}></Route>
            <Route
              exact
              path='/Profiles'
              element={
                <Profiles
                  userObj={userObj}
                  refreshUser={refreshUser}
                  newName={newName}
                />
              }></Route>
          </>
        ) : (
          <Route exact path='/' element={<Auth />}></Route>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
