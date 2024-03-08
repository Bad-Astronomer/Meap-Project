import { Navbar } from "@/components/ui/Navbar";
import { Gallery } from "@/components/ui/Gallery";

export default function Home() {
  let img_urls:string[] = [];
  
  for(let i=1; i<=18; i++){
    img_urls.push(`/assets/${i}.jpg`);
  }

  return (
    <main>
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

      <div className="py-20 my-8 text-neutral-200 text-5xl font-extrabold flex items-center justify-center w-full meap-header">
        GALLERY
      </div>

      <Gallery images={img_urls} />
    </main>
  );
}
