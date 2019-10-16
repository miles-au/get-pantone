import React from 'react'
import './ColorSquare.scss'

const ColorSquare = ({percentage, color, pantone, i}) =>{

  const foreColor = (bgColor) => {
    if((  parseInt("0x" + bgColor.substring(1,3)) * 0.299 +
          parseInt("0x" + bgColor.substring(3,5)) * 0.587 +
          parseInt("0x" + bgColor.substring(5,7)) * 0.114) > 150){

      return "#333333"
    }else{
      return "#ffffff"
    }
  }

  return (
    <div key={i} className="ColorSquare dib" style={{backgroundColor: color, color: foreColor(color)}}>
      <p>{percentage}</p>
      <p>PMS {pantone}</p>
    </div>
  )
}

export default ColorSquare;