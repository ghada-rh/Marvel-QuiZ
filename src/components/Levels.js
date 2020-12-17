import React, { useEffect, useState } from "react";
import Stepper from 'react-stepper-horizontal';

const Levels = ({levelsNames, quizLevel}) => {

  const [levels, setLevels]= useState([]);

  useEffect( ()=>{

    const quizSteps = levelsNames.map( (level)=>({title: level.toUpperCase()}));
    setLevels(quizSteps);

 }, [levelsNames]);
 
  return(
     <div className="levelsContainer" style={{background: 'transparent'}} >
            <Stepper 
              steps={ levels }
              activeStep={ quizLevel }
              circleTop = {0}
              activeTitleColor= {'#d31017'}
              activeColor = {'#d31017'}
              completeColor = {'#E0E0E0'}
              completeTitleColor = {'#757575'}
              completeBarColor = {'#E0E0E0'}
              size = {45}
              circleFontSize={20}
            />
      </div>
  )
};
export default React.memo(Levels);
