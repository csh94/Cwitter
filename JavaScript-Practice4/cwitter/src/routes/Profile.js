import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default ({ refreshUser, userObj }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    //어떻게 DB 데이터를 필터링하는지를 보여주고싶었어.
    /* const getMyCweets = async() => {
        const cweets = await dbService
        .collection("cweets")
        .where("creatorId", "==", userObj.uid)
        .orderBy("createrAt")
        .get();
        console.log(cweets.docs.map((doc) => doc.data()));
        console.log(userObj.displayName);
    };
    useEffect(() => {
        getMyCweets();
    }, []); */

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
            refreshUser();
        }
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange}
                type="text"
                placeholder="Display name"
                value={newDisplayName} 
                />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};