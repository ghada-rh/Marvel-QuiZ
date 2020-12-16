import React, {Fragment, useEffect, useState} from "react";

const QuizOver = React.forwardRef((props, ref) => { //psk on ne peut pas acceder à un ref via props à travers un function component que avec cette methode
  
  const {quizLevel, levelsNames, score, percent, maxQuestions} = props
  const [asked, setAsked]=useState([]);
 
  useEffect( ()=>{
       setAsked(ref.current)
  },[ref])
  
  const averageGrade = maxQuestions/2 ;
  const decision = score >= averageGrade ? (
    <Fragment>
      <div className="stepsBtnContainer">
        { quizLevel < levelsNames.length ?
          (<Fragment>  
              <p className="successMsg">bravo</p>
              <button className="btnResult success">Niveau Suivant</button>
          </Fragment>  
        ) :
        (  <Fragment>
                <p className="successMsg">Expert!</p>
                <button className="btnResult gameOver">Niveau Suivant</button>
          </Fragment>  
          )
          }
      </div>
      <div className="percentage" >
         <div className="progressPercent" >
                  Reussite: {percent}
          </div>
          <div className="progressPercent" >
                 note : {score}/{maxQuestions}
          </div>
      </div>
    </Fragment>
  ):(
    <Fragment>
      <div className="stepsBtnContainer">
        <p className="failureMsg">Vous avez echouez</p>
       </div>
      <div className="percentage" >
        <div className="progressPercent" >
            Reussite: {percent}
        </div>
        <div className="progressPercent" >
           note : {score}/{maxQuestions}
        </div>
      </div>      
    </Fragment>
  )
  const questionAnswer= score >= averageGrade ?
   (asked.map( item =>{
    return(
       <tr key={item.id}>
        <td>{item.question}</td>
        <td>{item.answer}</td>
        <td><button className="btnInfo">Info</button></td>
        
      </tr>
    )
  })
  ):
  (
    <tr>
        <td colSpan>
           <p>pas de reponse</p>
        </td>    
    </tr> 
  )
  return <Fragment>
            {decision}
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