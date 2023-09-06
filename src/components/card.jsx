import React from 'react'
import cover from '../images/cover.png'
import './card.css'

export default function Card(props) {

    const handlechoise=()=>{
      if(!props.disabled)
        props.handleclick(props.card)
    }


  return (
    <div className="card" key={props.id} >
            <div className={props.flipped?'flipped':'s'}>
              <img src={props.src} alt="f" className="front"  />
              <img src={cover} alt="b" className="back" onClick={handlechoise}  />
            </div>
          </div>
  )
}
