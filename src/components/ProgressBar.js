import React, {Fragment} from "react";

const ProgressBar = ({idQuestion, maxQuestions}) => {

  const getWidth = (totalQuestion, questionId) =>{
    return (100/totalQuestion)* questionId ;
  }
  const questionActuel = idQuestion + 1;
  const progress = getWidth(maxQuestions, questionActuel);
  console.log(progress);
  return <Fragment> 
            <div className="percentage" >
                <div className="progressPercent" >
                  {`Question: ${questionActuel}/${maxQuestions}`}
                </div>
                <div className="progressPercent" >
                  {`Progression: ${progress}%`}
                </div>
            </div>;
            <div className="progressBar">
               <div className="progressBarChange" style={{width:`${progress}%` }}></div> 
            </div> 
        </Fragment>
};
export default React.memo(ProgressBar);
