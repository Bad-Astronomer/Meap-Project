import React from 'react';
import Masonry from 'react-responsive-masonry'; 
import '../styles/gallery.css'; 
import dummyImage from '../assets/dummyImage.jpg';


const Gallery = () => {

  const images = [
    {
      src: dummyImage,
      alt: 'Image 1',
      text: 'Text prompt 1'
    },
    {
      src: dummyImage,
      alt: 'Image 2',
      text: 'Text prompt 2'
    },
    {
      src: dummyImage,
      alt: 'Image 2',
      text: 'Text prompt 3'
    },
    {
      src: dummyImage,
      alt: 'Image 2',
      text: 'Text prompt 4'
    },
    {
      src: dummyImage,
      alt: 'Image 2',
      text: 'Text prompt 5'
    },
    // Add more objects to represent more images
 ];

 return (
    <div className="gallery">
      <Masonry columnsCount={4} gutter="10px">
        {images.map((image, index) => (
          <div key={index} className="image-container">
            <img
              src={image.src}
              alt={image.alt}
              className="image"
            />
            <div className="overlay">{image.text}</div>
          </div>
        ))}
      </Masonry>
    </div>
 );
}

export default Gallery;
