import React, { useRef, useState } from 'react';
import '../styles/image-modifier.css';
// import ColorizedImage from './ColorizedImage';
// import '../assets/dummyImage.jpg';

const ColorizeButton = ({ setIsImageVisible ,  isImageVisible}) => {
  const buttonRef = useRef(null);
  const rippleRef = useRef(null);
  // const [imageVisible, setImageVisible] = useState(false);
  // const [generatedImage, setGeneratedImage] = useState(null);

  const toggleRipple = (e) => {
    const button = buttonRef.current;
    const ripple = rippleRef.current;
    const buttonRect = button.getBoundingClientRect();
    const { left, top } = buttonRect;
    const leftPosition = e.clientX - left;
    const topPosition = e.clientY - top;

    ripple.style.left = leftPosition + 'px';
    ripple.style.top = topPosition + 'px';

    ripple.classList.toggle("active");
  }

  const handleButtonClick = () => {
    setIsImageVisible(true);
  };
  // const handleButtonClick = () => {
  //   // Trigger the image generation logic here (replace the following line with your logic)
  //   const imageSource = generateImage(); // Assuming you have a function to generate the image source
  //   setGeneratedImage(imageSource);
    
  //   // Show the colorized image
  //   setImageVisible(true);

  //   // Set a timeout to remove the ripple after the animation
  //   // setTimeout(() => {
  //   //   const ripple = rippleRef.current;
  //   //   ripple.classList.remove('active');
  //   // }, 600);
  // };

  //  // Replace this function with your image generation logic
  // const generateImage = () => {
  //   // ... your logic to generate the image source
  //   return '../assets/dummyImage.jpg'; // Replace with the actual image path
  // };

  return (
    !isImageVisible &&(
    <div
      ref={buttonRef}
      onMouseEnter={toggleRipple}
      onMouseLeave={toggleRipple} 
      onClick={handleButtonClick}
      className='colorize-button'
      // className = '{imageVisible ? "hidden" : "colorize-button"}'
      // className={`colorize-button ${imageVisible ? 'hidden' : ''}`}
    >
      Generate
      <span className='ripple' ref={rippleRef}></span>
    </div>
  )
 );
};

export default ColorizeButton;
