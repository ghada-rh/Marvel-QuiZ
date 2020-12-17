import React, {Component, Fragment} from "react";
import Levels from './Levels';
import ProgressBar from './ProgressBar';
import {QuizMarvel} from './QuizMarvel';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import QuizOver from './QuizOver'
import { FaChevronRight } from 'react-icons/fa';

toast.configure();

class Quiz extends Component{
  constructor(props){
    super(props)
    this.initialState = {
      levelsNames: ['debutant', 'confirme', 'expert'],
      quizLevel : 0,
      maxQuestions: 10,
      storedQuestions: [],
      question: null,
      options: [],
      idQuestion: 0,
      btnDisabled: true, 
      userAnswer: null,
      score: 0,
      showWelcomeMsg: false,
      quizEnd: false
    }
    this.state = this.initialState;

    this.storedDataRef = React.createRef();
  }

  loadQuestions = quizz =>{
     //console.log(quiz);
     const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
     if(fetchedArrayQuiz.length >= this.state.maxQuestions){
        this.storedDataRef.current = fetchedArrayQuiz
        const newArray = fetchedArrayQuiz.map( ({answer, ...keepRest}) => keepRest);
        this.setState({
          storedQuestions: newArray 
          });
     } else {
       console.log('pas assez de questions');
     }
  }
  
  showToastMsg = pseudo =>{
    if(!this.state.showWelcomeMsg){
      this.setState({
        showWelcomeMsg: true
      })
      toast.warn(`Bienvenue  ${pseudo}, et bonne chance!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          });
    }
      
  }
  componentDidMount(){
      this.loadQuestions(this.state.levelsNames[this.state.quizLevel]);
  }

  nextQuestion = () =>{
    if(this.state.idQuestion === this.state.maxQuestions - 1){
       //this.gameOver();
       this.setState({
         quizEnd: true
       })
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
      toast.success('Bravo +1!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          bodyClassName: "tostify-color",
          });
    } else{
      toast.error('Raté 0!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      bodyClassName: "tostify-color",
      });
    }
  }

  
  componentDidUpdate(prevProps, prevState){
     if((this.state.storedQuestions !== prevState.storedQuestions)&& this.state.storedQuestions.length){
         this.setState({
           question: this.state.storedQuestions[this.state.idQuestion].question,
           options: this.state.storedQuestions[this.state.idQuestion].options
         })
     }
     if((this.state.idQuestion !== prevState.idQuestion)&& this.state.storedQuestions.length){
         this.setState({
           question: this.state.storedQuestions[this.state.idQuestion].question,
           options: this.state.storedQuestions[this.state.idQuestion].options,
           userAnswer: null,
           btnDisabled: true
         })
     } 
     if(this.state.quizEnd !== prevState.quizEnd){
       //console.log(this.state.score);
        const gradepercent = this.getPercentage(this.state.maxQuestions, this.state.score);
        this.gameOver(gradepercent);
     }
     if(this.props.userData.pseudo !== prevProps.userData.pseudo){
       this.showToastMsg(this.props.userData.pseudo);
     }
  }
  
  submitAnswer = (selectedAnswer) =>{
    this.setState({
      userAnswer: selectedAnswer,
      btnDisabled: false
    })
  }
  
  getPercentage = (maxQuest, ourScore)=>(ourScore / maxQuest) * 100;
  gameOver = (percent) => {
    if(percent >= 50){
        this.setState({
           quizLevel: this.state.quizLevel + 1,
           percent: percent
    })
    }else {
        this.setState({
           percent :percent
    })
    }
    }
  loadLevelQuestions = (param) =>{
     this.setState({...this.initialState, quizLevel: param})
     this.loadQuestions(this.state.levelsNames[param])
  }  
  render(){
  const {pseudo}= this.props.userData;
  const displayOptions = this.state.options.map( (option, index) =>{
        return(
        <p key={index} className={`answerOptions ${this.state.userAnswer === option ? "selected":null}`}  onClick={()=> 
          this.submitAnswer(option)}
          >
        <FaChevronRight/> {option}
        </p>)
      })
 // console.log(this.props);
  
  return this.state.quizEnd ? ( 
       <QuizOver 
       ref = {this.storedDataRef} 
       quizLevel = {this.state.quizLevel}
       score = {this.state.score}
       percent = {this.state.percent}
       levelsNames = {this.state.levelsNames}
       maxQuestions = {this.state.maxQuestions}
       loadLevelQuestions = {this.loadLevelQuestions}
       />
        )
        : 
       ( <Fragment >
          <Levels levelsNames={this.state.levelsNames} quizLevel = {this.state.quizLevel}/>
          <ProgressBar idQuestion={this.state.idQuestion} maxQuestions = {this.state.maxQuestions} />
          <h2>{this.state.question}</h2>
          {displayOptions}

          <button 
          className="btnSubmit" disabled ={this.state.btnDisabled}
          onClick={this.nextQuestion}> 
          {this.state.idQuestion < this.state.maxQuestions-1 ? "Suivant" : "Terminer"}
          </button>
          
        </Fragment>);
  }
};
export default Quiz;