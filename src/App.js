import React from "react";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import SingUp from "./components/SignUp";
import ErrorPage from "./components/ErrorPage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./style.css";

const App=()=> {
  return (
    <div>  
      <Router>
        <Header/>
        <Welcome/>
        <Landing/>
        <Login/>
        <SingUp/>
        <ErrorPage/>

        <Footer/>
      </Router>  
    </div>
  );
}
export default App;