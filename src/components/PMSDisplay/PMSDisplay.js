import React from 'react';
import ColorSquare from '../ColorSquare/ColorSquare'

const PMSDisplay = ({colors, picURL, loading}) => {
  var squares = [];
  for (const [i, color] of colors.entries()) {
    squares.push(<ColorSquare percentage={color[0]} color={color[1]} pantone={color[2]} key={i} />);
  }
  console.log("picURL", picURL);
  if(loading === false && picURL === ""){
    squares.push(<p>upload an image</p>);
  }else if(loading == true){
    squares.push(<p>loading...</p>);
  }
  
  return(
    <div className="fl w-100 w-50-ns pa2" >
      <div className="bg-white pv4 br3">
        <h3>Pantone colours detected:</h3>
          {squares}
      </div>
    </div>
  )
}

export default PMSDisplay;