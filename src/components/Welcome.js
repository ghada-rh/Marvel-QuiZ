import React, {useState, useEffect, Fragment, useContext} from "react";
import Logout from './Logout';
import Quiz from './Quiz';
import {FirebaseContext} from './Firebase';

const Welcome = (props) => {
  const firebase = useContext(FirebaseContext);
  const [userSession, setUserSession] = useState(null);

  useEffect( ()=>{
    let listener = firebase.auth.onAuthStateChanged(user =>{
      user ? setUserSession(user) : props.history.push('/');
    })
    firebase.user(userSession.uid)
    .get()
    .then( doc =>{
      if(doc && doc.exists){
        const myData = doc.
      }
    })
    return () =>{
      listener()
    };
  }, [userSession])

  return userSession === null ? (
    <Fragment>
       <div className="loader"></div>
       <p>Loading..</p>
    </Fragment>
  ) : (
    <div className="quiz-bg">
      <div className="container">
      <Logout/>
      <Quiz/>
      </div>
    </div>
  )
};
export default Welcome;
