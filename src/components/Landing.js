import React, {useRef, useEffect } from "react";

const Landing=()=> {
  const refWolverine = useRef(null);

  useEffect(()=>{
    refWolverine.current.classList.add("startingImg");
    setTimeout(()=>{
       refWolverine.current.classList.remove("startingImg");
    }, 3000)
  })
  return (
    <main ref ={refWolverine} className="welcomePage"> 
       <div className="leftBox">
          <button className="btn-welcome"> Inscription </button> 
       </div>
       <div className="leftBox">
          <button className="btn-welcome"> Connexion </button>
       </div>
    landing page
    </main>
  );
}
export default Landing;