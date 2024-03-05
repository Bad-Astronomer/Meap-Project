import { Navbar } from "./ui/Navbar";

const NavbarAfterLogin = () => {
  return (
    <Navbar navItems={
        [
          {
            name: "Home",
            link: ""
          },
          {
            name: "Tutorial",
            link: ""
          },
          {
            name: "My Gallery",
            link: ""
          },
          {
            name: "About Us",
            link: ""
          },
        //   {
        //     name: "Buy Credits",
        //     link: ""
        //   },
        ]
      }/>
  )
}

export default NavbarAfterLogin