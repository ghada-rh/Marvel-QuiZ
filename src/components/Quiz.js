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
    options: [],
    idQuestion: 0,
    btnDisabled: true, 
    userAnswer: null
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
         this.setState({
           question: this.state.storedQuestions[this.state.idQuestion].question,
           options: this.state.storedQuestions[0].options
         })
     }
  }
  submitAnswer = (selectedAnswer) =>{
    this.setState({
      userAnswer: selectedAnswer,
      btnDisabled: false
    })
  }

  render(){
  const {pseudo}= this.props.userData;
  const displayOptions = this.state.options.map( (option, index) =>{
        return(
        <p key={index} className={`answerOptions ${this.state.userAnswer === option ? "selected":null}`}  onClick={()=> 
          this.submitAnswer(option)}
          >
        {option}
        
        </p>)
      })
  console.log(this.props);
  return (
    <div >
      <Levels/>
      <ProgressBar/>
      <h2>{this.state.question}</h2>
      {displayOptions}

      <button className="btnSubmit" disabled ={this.state.btnDisabled}>Suivant</button>
      
    </div>
  );
  }
};
export default Quiz;