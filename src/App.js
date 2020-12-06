import React from "react";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ErrorPage from "./components/ErrorPage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./style.css";

const App=()=> {
  return ( 
      <Router>
        <Header/>
        <Switch>
          <Route exact path='/' component = {Landing}/>
          <Route  path='/Welcome' component = {Welcome}/>
          <Route  path='/Login' component = {Login}/>
          <Route  path='/SignUp' component = {SignUp}/>
          <Route component = {ErrorPage}/>
        </Switch>
        <Footer/>
      </Router>
  );
}
export default App;