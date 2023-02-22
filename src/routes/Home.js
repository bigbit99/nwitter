import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from 'fbase';
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import Nweet from 'components/Nweet';

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState('');

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

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = '';

    if (attachment !== '') {
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);

      const uploadFile = await uploadString(fileRef, attachment, 'data_url');
      attachmentUrl = await getDownloadURL(uploadFile.ref);
    }

    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };

    await addDoc(collection(dbService, 'nweets'), nweetObj);
    setNweet('');
    setAttachment('');
    // try {
    //   const doc,Ref = await addDoc(collection(dbService, 'nweets'), {
    //     text: nweet,
    //     createdAt: Date.now(),
    //     creatorId: userObj.uid,
    //   });
    // } catch (e) {
    //   console.error('Error adding document:', e);
    // }
    // setNweet('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event; //'event'로부터 라는 의미. 즉, event 안에 있는 target 안에 있는 value를 달라는 뜻.
    setNweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event; //event안에서 target 안으로 가서 파일을 받아온다는 것을 의미함.
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent; //'finishedEvent'로 부터 라는 의미. 즉, finishedEvent 안에 있는 currentTarget 있는 reuslt를 달라는 뜻.
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment('');
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type='text'
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type='file' accept='image/*' onChange={onFileChange} />
        <input type='submit' value='Nweet' />
        {attachment && (
          <div>
            <img src={attachment} width='100px' height='100px' />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
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
