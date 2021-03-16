import Cweet from "components/Cweet";
import CweetFactory from "components/CweetFactory";
import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";


const Home = ({userObj}) => {
    
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
   
    return (
        <div className="container">   
            <CweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
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