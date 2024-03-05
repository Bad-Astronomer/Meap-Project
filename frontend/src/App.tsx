import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/tutorial" element={<TutorialPage />} />
        <Route path="/mygallery" element={<MyGalleryPage />} />
        <Route path="/buycredits" element={<BuyCreditsPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} /> */}
      </Routes>
    </Router>
  )
}

export default App
