import React, { useEffect, useState } from "react";
import Stepper from 'react-stepper-horizontal';

const Levels = ({levelsNames, quizLevel}) => {

  const [levels, setLevels]= useState([]);

  useEffect( ()=>{

    const quizSteps = levelsNames.map( (level)=>({title: level}));
    setLevels(quizSteps);

 }, [levelsNames]);
 
  return(
     <div className="levelsContainer" >
        <div>
            <Stepper steps={ [{title: 'level'}] }  activeStep={ 1 } />
        </div>
      </div>
  )
};
export default Levels;
