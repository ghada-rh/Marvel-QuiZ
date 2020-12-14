import React, {Component} from "react";
import Levels from './Levels';
import ProgressBar from './ProgressBar';
import {QuizMarvel} from './QuizMarvel';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

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
    userAnswer: null,
    score: 0
  }
  storedDataRef = React.createRef();

  loadQuestions = quiz =>{
     console.log(quiz);
     const fetchedArrayQuiz = QuizMarvel[0].quizz[quiz];
     if(fetchedArrayQuiz.length >= this.state.maxQuestions){
        this.storedDataRef.current = fetchedArrayQuiz
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

  nextQuestion = () =>{
    if(this.state.idQuestion === this.state.maxQuestions - 1){
       //end
    } else {
        this.setState( prevState =>({
           idQuestion: prevState.idQuestion +1
        }))
    }
    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
    
    if(this.state.userAnswer === goodAnswer){
      this.setState( prevState =>({
          score: prevState.score + 1
      }))
    }
  }

  
  componentDidUpdate(prevProps, prevState){
     if(this.state.storedQuestions !== prevState.storedQuestions){
         this.setState({
           question: this.state.storedQuestions[this.state.idQuestion].question,
           options: this.state.storedQuestions[this.state.idQuestion].options
         })
     }
     if(this.state.idQuestions !== prevState.idQuestions){
         this.setState({
           question: this.state.storedQuestions[this.state.idQuestion].question,
           options: this.state.storedQuestions[this.state.idQuestion].options,
           btnDisabled: true, 
           userAnswer: null
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

      <button className="btnSubmit" disabled ={this.state.btnDisabled}
      onClick={this.nextQuestion}> 
      Suivant</button>
      
    </div>
  );
  }
};
export default Quiz;