import React, {useState} from "react";
import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";

const Home = () => {

    const [nweet, setNweet] = useState("");

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
        </>
    );
};

export default Home;