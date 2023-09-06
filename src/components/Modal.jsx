import React from 'react'
import './Modal.css'

export default function Modal(props) {
  return (
    <div className='outside'>
      <div className="inside">
      <h1 className='h1'>YOU WON!!! <br />Congragulation!<br/>turns={props.turns}</h1>
      <button className="btn11"onClick={()=>{
        props.setmodal(false)
        props.newgame()
        if(props.turns<localStorage.getItem('record')){
          localStorage.setItem('record',props.turns.toString())
        }
      }}>Again</button>
      </div>
    </div>
  )
}
