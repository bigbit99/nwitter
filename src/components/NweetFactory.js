import { dbService, storageService } from 'fbase';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [attachment, setAttachment] = useState('');

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
    <div>
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
    </div>
  );
};

export default NweetFactory;