import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  // const getNweets = async () => {
  //     const dbNweets = await getDocs(collection(dbService, "nweets"));
  //     // dbNweets.forEach((document) => console.log(document.data())); //내 state에 있는 각각의 document.data()를 console.log하고 있다는 뜻
  //     dbNweets.forEach((document) => {
  //         const nweetObject = {
  //             ...document.data(), //spread attribute
  //             id: document.id,

  //         }
  //         setNweets((prev) => [nweetObject, ...prev]);
  //     });
  // }

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
    <>
      <NweetFactory userObj={userObj} />
      <div>
        {nweets.map((item) => (
          <Nweet
            key={item.id}
            nweetObj={item}
            isOwner={item.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
