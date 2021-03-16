import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import {authService} from "fbase";

function App() {
  const [init, setInit] = useState(false);
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    //작성자를 알기 위해 userObj를 로그인 할때 받아서 AppRouter로 보낼게.
    <>
      {init ? (
      <AppRouter 
      refreshUser={refreshUser} 
      isLoggedIn={Boolean(userObj)} 
      userObj={userObj} />
       ) : ("Initializing...")}
    </>
  );
}

export default App;
