import React, {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import {FirebaseContext} from './Firebase';

const Login = (props) => {
  const firebase = useContext(FirebaseContext);
  //cette fois on va utiliser 2 variable 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btn, setBtn] = useState(false);
  const[error, setError] = useState('');

  useEffect( ()=>{
     if(password.length > 5 && email !=''){
      setBtn(true);
  } else if(btn ===true){
    setBtn(false);
  } }
    ,[email, password])
  
   const hundleSubmit = e =>{
     e.preventDefault();
     firebase.loginUser(email, password)
     .then(user=>{
       console.log(user)
       setPassword('')
       setEmail('')
       props.history.push('/Welcome')
     })
     .catch(error=>{
        setPassword('')
        setEmail('')
        setError(error)
     })       
     }
  return (
        <div className="signUpLoginBox">
           <div className="slContainer">
           <div className="formBoxLeftLogin">
         </div>

         <div className="formBoxRight">
           <div className="formContent">
              {error !=='' && <span>{error.message} </span>}
              <h2>Connexion</h2>
              <form onSubmit={hundleSubmit}>

                <div className="inputBox">
                  <input type='email' autoComplete ='off' required value={email} onChange={(e) =>setEmail(e.target.value) }/>
                  <label htmlFor="email">Email</label>
                </div>

                <div className="inputBox">
                  <input type='password' autoComplete ='off' required value={password} onChange={e =>setPassword(e.target.value)} />
                  <label htmlFor="password">Password</label>
                </div>

                {btn ? <button> Connexion </button>: <button disabled> Connexion </button>}
              </form>

              <div className="linkContainer">
                 <Link className='simpleLink' to="/SignUp">Nouveau sur Marvel Quiz ? Inscrivez-vous.</Link>
                 <br/>
                 <Link className='simpleLink' to="/Forgetpassword">Mot de passe oublié? recuperez le ici</Link>
              </div>

           </div>
         </div>
           </div>
    </div>);
};
export default Login;