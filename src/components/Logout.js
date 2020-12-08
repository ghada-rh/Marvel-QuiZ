import React, {useState, useEffect, useContext} from "react";
import {FirebaseContext} from './Firebase';

const Logout = () => {
  const [checked, setChecked] = useState(false);
  const firebase = useContext(FirebaseContext);

  useEffect( ()=>{
    if(checked){
      console.log('deconnexion')
      firebase.signoutUser();
    }
  },[checked, firebase])
  const hundleChange = (e) =>{
    setChecked(e.target.checked)
  }
  return (
      <div className="logoutContainer">
        <label className="switch"> 
        <input type="checkbox" checked={checked} onChange={hundleChange}/>
        <span className="slider round"></span>
        </label>
      </div>
  );
};
export default Logout;