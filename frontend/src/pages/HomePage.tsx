import React from 'react'
import NavbarAfterLogin from '../components/NavbarAfterLogin'
import { DotBackground } from '../components/ui/DotBackground'

const HomePage = () => {
document.body.classList.add("bg-dot-white/25");

  return (
    <div>
        {/* <DotBackground /> */}
        <NavbarAfterLogin />
    </div>
  )
}

export default HomePage