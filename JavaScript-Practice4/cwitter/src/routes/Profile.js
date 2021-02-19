import { authService, dbService } from "fbase";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default ({ userObj }) => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    //어떻게 DB 데이터를 필터링하는지를 보여주고싶었어.
    const getMyCweets = async() => {
        const cweets = await dbService
        .collection("cweets")
        .where("creatorId", "==", userObj.uid)
        .orderBy("createrAt")
        .get();
        console.log(cweets.docs.map((doc) => doc.data()));
    };
    useEffect(() => {
        getMyCweets();
    }, [])

    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};