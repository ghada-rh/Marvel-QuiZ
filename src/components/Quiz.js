import React, {Component} from "react";
import Levels from './Levels';
import ProgressBar from './ProgressBar';
import {QuizMarvel} from './QuizMarvel';

class Quiz extends Component{
  state = {
    levelsNames: ['debutant', 'confirme', 'expert'],
    quizLevel : 0,
    maxQuestions: 10,
    storedQuestions: [],
    question: null,
    options: []
  }

  loadQuestions = quiz =>{
     console.log(quiz);
     const fetchedArrayQuiz = QuizMarvel[0].quizz[quiz];
     if(fetchedArrayQuiz.length >= this.state. maxQuestions){
        const newArray = fetchedArrayQuiz.map( ({answer, ...keepRest}) => keepRest);
        this.setState({
          storedQuestions: newArray });
     } else {
       console.log('pas assez de questions');
     }
  }

  componentDidMount(){
      this.loadQuestions(this.state.levelsNames[this.state.quizLevel]);
  }
  
  componentDidUpdate(prevProps, prevState){
     if(this.state.storedQuestions !== prevState.storedQuestions){

     }
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