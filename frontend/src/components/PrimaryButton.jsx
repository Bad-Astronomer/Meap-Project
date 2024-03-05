import React, { useRef } from 'react';
import '../styles/primary-button.css';


const PrimaryButton = ({ buttonText, onClickFunction}) => {
  const buttonRef = useRef(null);
  const rippleRef = useRef(null);

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


  return (
    
    <div
      ref={buttonRef}
      onMouseEnter={toggleRipple}
      onMouseLeave={toggleRipple} 
      onClick={onClickFunction}
      className='primary-button'
    >
      {buttonText}
      <span className='ripple' ref={rippleRef}></span>
    </div>
  )

};

export default PrimaryButton;
