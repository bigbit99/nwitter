import React, {useEffect, useState} from "react";
import { dbService } from "fbase";
import { addDoc, collection, getDocs } from "firebase/firestore";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    const getNweets = async () => {
        const dbNweets = await getDocs(collection(dbService, "nweets"));
        // dbNweets.forEach((document) => console.log(document.data())); //내 state에 있는 각각의 document.data()를 console.log하고 있다는 뜻
        dbNweets.forEach((document) => {
            const nweetObject = {
                ...document.data(), //spread attribute
                id: document.id,
            }
            setNweets((prev) => [nweetObject, ...prev]);
        });
    }
    useEffect(() => {
        getNweets();
    }, []);
    console.log(nweets);
    const onSubmit = async (event) => {
        event.preventDefault();
        await addDoc(collection(dbService, "nweets"), {
            nweet,
            createdAt: Date.now(),
        });
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
                {nweets.map(item => 
                <div key={item.id}>
                    <h4>{item.nweet}</h4>
                </div>)}
            </div>
        </>
    );
};

export default Home;