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
  //console.log(API_PUBLIC_KEY);
  const hash = 'd438c2449cf767f00d37f4d78de9e090';

  const [asked, setAsked]=useState([]);
  const [openModal, setOpenModel]=useState(false);
  const [characterInfos,setCharacterInfos]=useState([]);
  const [loading,setLoading]=useState(true);
 
  useEffect( ()=>{
       setAsked(ref.current)

       if(localStorage.getItem('marvelStorageDate')){
         const date = localStorage.getItem('marvelStorageDate')
           checkDaraAge(date);
       }
  },[ref])
  
  //this methid is to refresh the localstorage every 15 days
  const checkDaraAge = (date)=>{
      var today = Date.now();
      const timeDifference = today - date; //en milliseconde
      const daysdifference = timeDifference / (1000 * 3600)
      if(daysdifference >= 15){
           localStorage.clear();
           //et on ajoute la nouvelle date d'aujourdhui:
           localStorage.setItem('marvelStorageDate', Date.now());
      }
  }
  const showModal = (id) =>{
     setOpenModel(true);
    
    if(localStorage.getItem(id)){
       setCharacterInfos(JSON.parse(localStorage.getItem(id)));
       setLoading(false);
       //console.log(characterInfos);
    } else{
       axios
        .get(`https://gateway.marvel.com:/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
        .then( (response)=>{
          console.log(response)
          setCharacterInfos(response.data);
          setLoading(false);

          localStorage.setItem(id, JSON.stringify(response.data) ); //la methode setItem tekhou (key, value ili howa ykoun 'string')
          if(!localStorage.getItem('marvelStorageDate')){
              localStorage.setItem('marvelStorageDate', Date.now());
          }
        })
        .catch( err => console.log(err) )
        }     
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
                      <div className="comicImage">
                          <img src ={characterInfos.data.results[0].thumbnail.path+'.'+characterInfos.data.results[0].thumbnail.extension}
                           alt ={characterInfos.data.results[0].name} />
                          {characterInfos.attributionText}
                      </div>
                      <div className="comicDetails">
                        <h3>Description</h3>
                        {characterInfos.data.results[0].description ?
                        (<p>{characterInfos.data.results[0].description}</p>
                        ):
                        (
                          <p>Description indisponoble..</p>
                        )
                        }
                        <h3>Plus d'info</h3>
                        {
                          characterInfos.data.results[0].urls && (
                            characterInfos.data.results[0].urls.map( (url, index) =>{
                              return( <a
                                    key= {index}
                                    href={url.url}
                                    target="_blank"
                                    rel = "noopener noreferrer"
                              >
                                {url.type}
                              </a>)
                            })
                          )
                        }
                      </div>
                    
                      
                </div>
                <div className="modalFooter">
                      <button className='modalBtn' onClick={hideModal}>Fermer</button>
                </div>
              </Fragment>
            ):(
              <Fragment>
             <div className="modalHeader">
                     <h2>Rep de marvel..</h2>
                </div>
                <div className="modalBody">
                      <div className="loader"></div>
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