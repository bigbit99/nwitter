import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ userObj }) => (
  <nav>
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='profiles'>
          {userObj.displayName ? <>{userObj.displayName}</> : 'User'}의 Profile
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
