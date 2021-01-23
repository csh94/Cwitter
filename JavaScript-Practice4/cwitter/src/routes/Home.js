import { dbService } from "fbase";
import React, { useState } from "react";

const Home = () => {
    const [cweet, setCweet] = useState("");
    const onSubmit = async (event) => {
      event.preventDefault();  
      await dbService.collection("cweets").add({
          cweet,
          createdAt: Date.now(),
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
        </div>
    );
};
export default Home;