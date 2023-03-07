import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navigation = ({ userObj }) => (
  <nav>
    <NavList>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='profiles'>
          {userObj.displayName ? <span>{userObj.displayName}</span> : 'User'}의
          Profile
        </Link>
      </li>
    </NavList>
  </nav>
);

export default Navigation;

const NavList = styled.ul`
  height: 60px;
  border-bottom: 1px solid #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > li {
    list-style: none;
    > a {
      text-decoration: none;
      color: #fff;
    }
  }
  > li:nth-child(2) {
    text-align: right;
  }
`;
