import React from 'react';
import Navbar from '../components/Navbar';
import PromptInput from '../components/PromptInput';
import ImageUploader from '../components/ImageUploader';
import ColorizedImage from '../components/ColorizedImage';
import ColorizeButton from '../components/ColorizeButton';
import Gallery from '../components/Gallery';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <PromptInput />
      <div>
        <ImageUploader />
        {/* <div>
          <ColorizedImage />
          <ColorizeButton />
        </div> */}
      </div>
      <Gallery />
    </div>
  );
};

export default HomePage;
