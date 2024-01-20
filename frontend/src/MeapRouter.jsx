import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import TutorialPage from './pages/TutorialPage';
import MyGalleryPage from './pages/MyGalleryPage';
import BuyCreditsPage from './pages/BuyCreditsPage';
import AboutUsPage from './pages/AboutUsPage';

const MeapRouter = () => {
 return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tutorial" element={<TutorialPage />} />
        <Route path="/mygallery" element={<MyGalleryPage />} />
        <Route path="/buycredits" element={<BuyCreditsPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
      </Routes>
    </Router>
 )
}

export default MeapRouter;
