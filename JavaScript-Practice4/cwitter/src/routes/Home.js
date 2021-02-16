import Cweet from "components/Cweet";
import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Home = ({userObj}) => {
    const [cweet, setCweet] = useState("");
    const [cweets, setCweets] = useState([]);
    const [attachment, setAttachment] = useState();
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
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const cweetObj = {
            text: cweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        };
        await dbService.collection("cweets").add(cweetObj);
        setCweet("");
        setAttachment("");
    };
    const onChange = (event) => {
        const {target:{value}} = event;
        setCweet(value);
    };
    //event로부터 라는 의미지. 즉, event 안에 있는 target안에 있는 value를 달라.
    const onFileChange = (event) => {
        const {
            target: {files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: {result},
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };
    //event 안에서 target 안으로 가서 파일을 받아오는 것을 의미
    const onClearAttachment = () => setAttachment(null);
    return (
        <div>    
            <form onSubmit={onSubmit}>
                <input value={cweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Cweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>    
                )}
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