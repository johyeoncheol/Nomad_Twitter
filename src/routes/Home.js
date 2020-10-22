import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';

//async�� �񵿱� ó���� �ϱ� ���ؼ� ����Ѵ�.
const Home = ({userObj}) => {
    console.log(userObj);
    const [nweet , setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const getNweets = async() =>{
        const dbNweets = await dbService.collection("nweets").get();
        dbNweets.forEach((document) => {
            const nweetObject ={
                ...document.data(),
                id:document.id,
                creatorId:1212,
            };
            setNweets((prev) =>[nweetObject, ...prev]);
        });
    }
    useEffect(() =>{
        getNweets();
    },[])
    const onSubmit = async(event) =>{
        await event.preventDefault();
        dbService.collection("nweets").add({
            text:nweet,
            createdAt: Date.now()
        });
        setNweet("");
    };
    const onChange = (event) =>{
        const { 
            target: { value }
        } = event;
        setNweet(value);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map(nweet =>
                    <div key={nweet.id}>
                        <h4>{nweet.nweet}</h4>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Home;