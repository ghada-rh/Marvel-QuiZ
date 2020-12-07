import React from "react";
import {Link} from "react-router-dom";

const Login = () => {
  return (
        <div className="signUpLoginBox">
           <div className="slContainer">
           <div className="formBoxLeftLogin">
         </div>

         <div className="formBoxRight">
           <div className="formContent">
           {errorMsg}
              <h2>Connexion</h2>
              <form onSubmit={hundleSubmit}>

                <div className="inputBox">
                  <input type='email' id="email" autoComplete ='off' required value={email} onChange={handleChange}/>
                  <label htmlFor="email">Email</label>
                </div>

                <div className="inputBox">
                  <input type='password' id="password" autoComplete ='off' required value={password} onChange={handleChange} />
                  <label htmlFor="password">Password</label>
                </div>

              </form>

              <div className="linkContainer">
                 <Link className='simpleLink' to="/SignUp">Nouveau sur Marvel Quiz ? Inscrivez-vous.</Link>
              </div>

           </div>
         </div>
           </div>
    </div>);
};
export default Login;