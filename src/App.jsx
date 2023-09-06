import './App.css'
import { useEffect, useState } from 'react'
import Card from './components/card'
import helmet from '../src/images/helmet-1.png'
import potion from '../src/images/potion-1.png'
import ring from '../src/images/ring-1.png'
import scroll from '../src/images/scroll-1.png'
import shield from '../src/images/shield-1.png'
import sword from '../src/images/sword-1.png'
import Modal from './components/Modal'




const cardImages=[
  {src:helmet,same:false},
  {src:potion,same:false},
    {src:ring,same:false},
  {src:scroll,same:false},
  {src:shield,same:false},
   {src:sword,same:false},
]




function App() {
  const [turns,setturns]=useState(0)
  const [cards,setCards]=useState([])
  const [choise1,setChoise1]=useState(null)
  const [choise2,setChoise2]=useState(null)
  const [showwin,setshowwin]=useState(false)
  const [disabled,setdisabled]=useState(false)



//shuffle and generate cards

const shufflecards=()=>{

  const shuffleCards=[...cardImages,...cardImages]
  .sort(() => Math.random()-0.5)
  .map((card) => ({...card,id:Math.random()}))

  setCards(shuffleCards)
  setturns(0)


}

const handleclick=(card)=>{
  choise1? setChoise2(card) :setChoise1(card)  
}
//main useeffect to compare twe choice
useEffect(()=>{
  if(choise1 && choise2){
    setdisabled(true)
    if(choise1.src===choise2.src){
      setCards(prevCards=>{
        return prevCards.map(card=>{
          if(choise1.src===card.src){
            return {...card,same:true}
          }
          else{
            return card
          }

        })
      })

      reset()
    }
    else{
      setTimeout(() => {
        reset()
      }, 600);
    }
  }
},[choise1,choise2])



//reset func

const reset=()=>{
  setChoise1(null)
  setChoise2(null)
  setturns((prev)=>prev+1)
  setdisabled(false)
}




// //to initialize
  useEffect(()=>{
    shufflecards()
    localStorage.setItem('record','100')

  },[])

//another useeffect 
useEffect(() => {
  if(cards.every((a)=>a.same) && cards.length>2){
    setshowwin(true)
    }
  
  
  }, [choise2,choise1])



  return (
    <div className='App'>
    <h1>Memory Game</h1>
    <button onClick={shufflecards}>New Game </button>
    <h6>Turns: {turns} Best Record: {localStorage.getItem('record')}</h6>
    <div className='card-grid' > 
        {cards?.map((a)=>(

          <Card id={a.id} src={a.src} handleclick={handleclick} card={a} flipped = {a === choise1 || a === choise2 || a.same} disabled={disabled}
          />
          
        ))
        
        } 
    
    </div>
    <div>
{      showwin && <Modal setmodal={setshowwin} newgame={shufflecards} turns={turns}/>
}    </div>
    </div>
  )
}

export default App;
