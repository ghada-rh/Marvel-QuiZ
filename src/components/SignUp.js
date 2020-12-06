import React, {useState, useContext} from "react";
import {FirebaseContext} from './Firebase';
const SignUp = () => {
  const firebase = useContext(FirebaseContext);

  const data = {
    pseudo :"",
    email: "",
    password:"",
    confirmPassword:""
  }

  const [loginData, setLoginData] = useState(data);
  const [error, setError] = useState('');
  
  const handleChange = (e) =>{
     setLoginData({...loginData, [e.target.id]: e.target.value})
  }

  const hundleSubmit = e =>{
     e.preventDefault()
     const {email, password} = loginData;
     firebase.signupUser(email, password)
     .then(user =>{
       setLoginData({...data});
     })
     .catch(error=>{
       setError(error);
       setLoginData({...data});
     })
  }
   const {pseudo, email, password, confirmPassword} = loginData;
  const btn = pseudo === "" || email === "" || password=== "" ||password!== confirmPassword ? <button disabled>Inscription</button>: <button> Inscription </button>

  const errorMsg = error !=='' && <span>{error.message} </span>
  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
         <div className="formBoxLeftSignup">
         </div>

         <div className="formBoxRight">
           <div className="formContent">
           {errorMsg}
              <h2>Inscription</h2>
              <form onSubmit={hundleSubmit}>
                <div className="inputBox">
                  <input type='text' id="pseudo" autoComplete ='off' required value={pseudo} onChange={handleChange} />
                  <label htmlFor="pseudo">Pseudo</label>
                </div>
                <div className="inputBox">
                  <input type='email' id="email" autoComplete ='off' required value={email} onChange={handleChange}/>
                  <label htmlFor="email">Email</label>
                </div>
                <div className="inputBox">
                  <input type='password' id="password" autoComplete ='off' required value={password} onChange={handleChange} />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="inputBox">
                  <input type='password' id="confirmPassword" autoComplete ='off' required value={confirmPassword} onChange={handleChange}/>
                  <label htmlFor="confirmPassword">confirmer le Password</label>
                </div> 
                {btn}
              </form>
           </div>
         </div>
      </div>
    </div>
  );
};
export default SignUp;
