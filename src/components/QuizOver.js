import React, {Fragment, useEffect, useState} from "react";

const QuizOver = React.forwardRef((props, ref) => { //psk on ne peut pas acceder à un ref via props à travers un function component que avec cette methode

  const [asked, setAsked]=useState([]);
  //console.log(asked);

  useEffect( ()=>{
       setAsked(ref.current)
  },[ref])
  
  const questionAnswer= asked.map( item =>{
    return(
       <tr key={item.id}>
        <td>{item.question}</td>
        <td>{item.answer}</td>
        <td><button className="btnInfo">Info</button></td>
        
      </tr>
    )
  })
  return <Fragment>
            <div className="stepsBtnContainer">
              <p className="successMsg">bravo</p>
              <button className="btnResult success">Niveau Suivant</button>
            </div>

            <div className="percentage" >
                <div className="progressPercent" >
                  Reussite
                </div>
                <div className="progressPercent" >
                 note
                </div>
            </div>
            <hr/>
            <p >les rep</p>
            <div className="answerContainer">
               <table className="answers">
                 <thead>
                   <tr>
                     <th>Questions</th>
                     <th>Réponses</th>
                     <th>Infos</th>
                   </tr>
                 </thead>
                 <tbody>
                   {questionAnswer}
                 </tbody>
               </table>
            </div>
          </Fragment> ;
})
export default React.memo(QuizOver);