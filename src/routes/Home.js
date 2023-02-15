import React, {useEffect, useState} from "react";
import { dbService } from "fbase";
import { addDoc,
    collection,
    getFirestore,
    onSnapshot,
    orderBy,
    query,
    where, } from "firebase/firestore";
import Nweet from "components/Nweet";


const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
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
            collection(dbService, "nweets"),
            orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setNweets(nweetArr);
        })
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "nweets"), {
                text: nweet,
                createdAt: Date.now(),
                creatorId: userObj.uid,
            });
        } catch (e) {
            console.error("Error adding document:", e);
        }
        setNweet("");
    };

    const onChange = (event) => {
        const { target: {value} } = event; //'event'로부터 라는 의미. 즉, event 안에 있는 target 안에 있는 value를 달라는 뜻.
        setNweet(value);
    }
    
    return(
        <>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}/>
                <input type="submit" value="Nweet" />
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