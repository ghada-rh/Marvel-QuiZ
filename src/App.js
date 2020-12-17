import React from "react";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ErrorPage from "./components/ErrorPage";
import Forgetpassword from "./components/Forgetpassword";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./style.css";
import {IconContext} from 'react-icons'

const App=()=> {
  return ( 
      <Router>
        <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        <Header/>
        <Switch>
          <Route exact path='/' component = {Landing}/>
          <Route  path='/Welcome' component = {Welcome}/>
          <Route  path='/Login' component = {Login}/>
          <Route  path='/SignUp' component = {SignUp}/>
          <Route  path='/Forgetpassword' component = {Forgetpassword}/>
          <Route component = {ErrorPage}/>
        </Switch>
        <Footer/>
        </IconContext.Provider>
      </Router>
  );
}
export default App;