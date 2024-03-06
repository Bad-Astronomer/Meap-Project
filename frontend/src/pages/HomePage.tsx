// import React from 'react'
import DemoGallery from '../components/DemoGallery';
import NavbarAfterLogin from '../components/NavbarAfterLogin'
// import { DotBackground } from '../components/ui/DotBackground'
// import { Gallery } from '../components/ui/Gallery';

const HomePage = () => {
document.body.classList.add("bg-dot-white/25");

  return (
    <div>
        <NavbarAfterLogin />
        <DemoGallery />
    </div>
  )
}

export default HomePage