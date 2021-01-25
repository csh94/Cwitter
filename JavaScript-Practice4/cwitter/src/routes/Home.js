import Cweet from "components/Cweet";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({userObj}) => {
    const [cweet, setCweet] = useState("");
    const [cweets, setCweets] = useState([]);
    //컴포넌트가 mount 될때 우리는 getCweets를 실행하지.
    /*const getCweets = async() => {
        const dbCweets = await dbService.collection("cweets").get();
        dbCweets.forEach((document) => {
            const cweetObject = {
                ...document.data(),
                id: document.id,
            };
            setCweets(prev => [cweetObject, ...prev])
        });
    };*/
    useEffect(() => {
        //이건 구식 방식이야. getCweets();
        //아래껀 스냅샷방식으로 리얼타임!
        /* onsnapshot 은 데이터베이스에 무슨일이 있을때 알림을 받음
        새로운 스냅샷을 받을 때 배열을 만들고, 그다음 state에 배열을 넣음. */ 
        dbService.collection("cweets").onSnapshot(snapshot => {
            const cweetArray = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data(),
            }));
            setCweets(cweetArray);
        });
    }, []);
    const onSubmit = async (event) => {
      event.preventDefault();  
      await dbService.collection("cweets").add({
          text: cweet,
          createdAt: Date.now(),
          creatorId: userObj.uid,
      });
      setCweet("");
    };
    const onChange = (event) => {
        const {target:{value}} = event;
        setCweet(value);
    };
    //event로부터 라는 의미지. 즉, event 안에 있는 target안에 있는 value를 달라.

    return (
        <div>    
            <form onSubmit={onSubmit}>
                <input value={cweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Cweet" />
            </form>
            <div>
                {cweets.map((cweet) => (
                    <Cweet 
                    key={cweet.id} 
                    cweetObj={cweet} 
                    isOwner={cweet.creatorId === userObj.uid} 
                    />
                ))}
            </div>
        </div>
    );
};
export default Home;