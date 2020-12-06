import React from "react";

// inline CSS dans React.js like in js(camelCase):
  const CenterH2={
    textAlign: 'center',
    marginTop: '50px'
  }  
  const CenterImg={
    display: 'block',
    margin: '40px auto'
  } 

const ErrorPage = () => {
  
  const batmanImg = 'https://github.com/DonkeyGeek/marvel-quiz/blob/master/src/images/batman.png?raw=true';

  return (
    <div className="quiz-bg">
      <div className="container">
        <h2 style = {CenterH2}> Oups, cette page n'existe pas!</h2>
        <img src= {batmanImg} alt="error page" style = {CenterImg}/>
      </div>
    </div>
  );
};
export default ErrorPage;
