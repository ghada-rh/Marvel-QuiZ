import React, {Component} from "react";
import Levels from './Levels';
import ProgressBar from './ProgressBar';
import {QuizMarvel} from './QuizMarvel';

class Quiz extends Component{
  state = {
    levelsNames: ['debutant', 'confirmé', 'expert'],
    quizLevel : 0,
    maxQuestions: 10,
    storedQuestions: []
  }

  loadQuestions = quiz =>{
     console.log(level);
  }

  componentDidMount(){
      this.loadQuestions(this.state.levelsNames[this.state.quizLevel]);
  }
  render(){
  const {pseudo}= this.props.userData;
  console.log(this.props);
  return (
    <div >
      <Levels/>
      <ProgressBar/>
    </div>
  );
  }
};
export default Quiz;