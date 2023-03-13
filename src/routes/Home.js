import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { dbService } from 'fbase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';

const Home = ({ userObj, newName, isLoggedIn }) => {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, 'nweets'),
      orderBy('createdAt', 'desc')
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setNweets(nweetArr);
    });
  }, []);

  return (
    <Wrap>
      <WrapCont>
        <NweetFactory userObj={userObj} newName={newName} />
        <NweetList>
          {nweets.map((item) => (
            <Nweet
              key={item.id}
              nweetObj={item}
              isOwner={item.creatorId === userObj.uid}
            />
          ))}
        </NweetList>
        <NweetSide></NweetSide>
      </WrapCont>
    </Wrap>
  );
};

export default Home;

const Wrap = styled.div`
  padding: 30px;
  box-sizing: border-box;
`;

const WrapCont = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 60px);
  overflow: hidden;
  border-radius: 20px;
  display: flex;
  gap: 20px;

  > div:nth-child(1) {
    width: 30%;
  }
  > div:nth-child(2) {
    width: 45%;
    overflow: scroll;
  }
  > div:nth-child(3) {
    width: 25%;
  }
`;

const NweetList = styled.div``;

const NweetSide = styled.div``;
