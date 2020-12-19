import React, {Fragment, useEffect, useState} from "react";
import { GiTrophyCup } from 'react-icons/gi';
import Modal from './Modal';
import axios from 'axios';
const QuizOver = React.forwardRef((props, ref) => { //psk on ne peut pas acceder à un ref via props à travers un function component que avec cette methode
  
  const 
  {
    quizLevel,
    levelsNames,
    score,
    percent,
    maxQuestions,
    loadLevelQuestions
    } = props;

  const API_PUBLIC_KEY  ='b2482084fbaab8534d1d74f286731ae4';
  console.log(API_PUBLIC_KEY);
  const hash = 'd438c2449cf767f00d37f4d78de9e090';

  const [asked, setAsked]=useState([]);
  const [openModal, setOpenModel]=useState(false);
  const [characterInfos,setCharacterInfos]=useState([]);
  const [loading,setLoading]=useState(true);
 
  useEffect( ()=>{
       setAsked(ref.current)
  },[ref])
  
  const showModal = (id) =>{
     setOpenModel(true);

     axios
     .get(`https://gateway.marvel.com:/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
     .then( (response)=>{
       console.log(response)
       setCharacterInfos(response.data);
       //setLoading(false);
     })
     .catch( err => console.log(err) )
  }
  const hideModal = () =>{
     setOpenModel(false);
     setLoading(true);
  }
  const averageGrade = maxQuestions/2 ;

  if(score < averageGrade){
    setTimeout(() => loadLevelQuestions(0), 3000);
  }

  const decision = score >= averageGrade ? (
    <Fragment>
      <div className="stepsBtnContainer">
        { quizLevel < levelsNames.length ?
          (<Fragment>  
              <p className="successMsg">bravo passz au niveau suivant</p>
              <button 
                 className="btnResult success"
                 onClick= { ()=>loadLevelQuestions(quizLevel) }>
                 Niveau Suivant
              </button>
          </Fragment>  
        ) :
        (  <Fragment>
                <p className="successMsg">
                 <GiTrophyCup size='50px'/> Expert!
                 </p>
                <button 
                className="btnResult gameOver"
                onClick= { ()=> loadLevelQuestions(0) }>
                Acceuil</button>
          </Fragment>  
          )
          }
      </div>
      <div className="percentage" >
         <div className="progressPercent" >
                  Reussite: {percent} %
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
            Reussite: {percent} %
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
        <td><button className="btnInfo" onClick={ () => showModal(item.heroId)}>Info</button></td>
        
      </tr>
    )
  })
  ):
  (
    <tr>
        <td colSpan="3">
           <div className="loader"></div>
           <p>pas de reponse</p>
        </td>    
    </tr> 
  )
  const resultModal = !loading ?
           ( <Fragment>
             <div className="modalHeader">
                     <h2>{characterInfos.data.results[0].name}</h2>
                </div>
                <div className="modalBody">
                      <h3>Titre2</h3>
                </div>
                <div className="modalFooter">
                      <button className='modalBtn'>Fermer</button>
                </div>
              </Fragment>
            ):(
              <Fragment>
             <div className="modalHeader">
                     <h2>Rep marvel</h2>
                </div>
                <div className="modalBody">
                      <h3>Titre2</h3>
                </div>
              </Fragment>
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
            
            <Modal openModal={openModal} hideModal = {hideModal}>
                {resultModal}
            </Modal>
          </Fragment> ;
})
export default React.memo(QuizOver);