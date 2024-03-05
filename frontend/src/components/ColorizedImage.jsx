import React from 'react'
import "../styles/image-modifier.css";
import dummyImage from '../assets/dummyImage.jpg';


const ColorizedImage = () => {
  return (
    <div>
      <img src= {dummyImage} alt="dummy image" />
    </div>
  )
}

export default ColorizedImage;