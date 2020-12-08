import React,{useState, useContext} from "react";
import {Link} from "react-router-dom";
import {FirebaseContext} from './Firebase';


const Forgetpassword = (props) => {
  const firebase = useContext(FirebaseContext);
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  
  const hundleSubmit = e =>{
     e.preventDefault();
     firebase.passwordReset(email)
     .then( ()=>{
        setError(null);
        setSuccess(`Consultez voter email:${email} pour changer le mot de passe `)
        setEmail("");
        setTimeout( ()=>{
          props.history.push('/Login')
        }, 5000)
     })
     .catch( (error)=>{
       setError(error);
       setEmail("");
     })
     }
   const disabled = email === "";   
  return (
    <div className="signUpLoginBox">
      <div className="slContainer">

         <div className="formBoxLeftForget"></div>

         <div className="formBoxRight">
           <div className="formContent">
              {success && <span
              style = {
                {border: "1px solid green",
                background: "green",
                color: "#ffffff"}
              }>{success} </span>}

              {error && <span>{error.message} </span>}
              <h2>Mot de passe oublié?</h2>
              <form onSubmit = {hundleSubmit}>

                <div className="inputBox">
                  <input type='email' autoComplete ='off' required value={email} onChange={(e) =>setEmail(e.target.value) }/>
                  <label htmlFor="email">Email</label>
                </div>
                 <button disabled={disabled} >Récuperer</button>
              </form>

              <div className="linkContainer">
                 <Link className='simpleLink' to="/Login">Déjà inscrit? Connectez-vous.</Link>
              </div>

           </div>
         </div>
           </div>
    </div>);
};
export default Forgetpassword;