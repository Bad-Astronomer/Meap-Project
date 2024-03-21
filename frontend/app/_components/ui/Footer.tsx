// app/footer.tsx
"use client"
import { Team } from '@/app/_components/ui/Team'


export const Footer = () => {
return (
    <footer className="w-full pb-12 pt-10 border-t border-neutral-800">
      <div className="md:px-12 lg:px-28">
        <div className="container m-auto space-y-6 text-gray-300">
          <div className="flex items-center justify-center text-xl">
            <p className='pr-4'>
                Made with <span className="text-rose-500 font-bold">&lt;3</span> by
            </p>
            <Team />
          </div>
          {/* <ul role="list" className="flex flex-col items-center justify-center gap-4 py-4 sm:flex-row sm:gap-8">
            <li role="listitem"><a href="#" className="hover:text-primary">Home</a></li>
            <li role="listitem"><a href="#" className="hover:text-primary">Features</a></li>
            <li role="listitem"><a href="#" className="hover:text-primary">Get started</a></li>
            <li role="listitem"><a href="#" className="hover:text-primary">About us</a></li>
          </ul> */}
          {/* <div className="m-auto flex w-max items-center justify-between space-x-4">
            Social media icons and links
          </div> */}
          <div className="text-center">
            <span className="text-sm tracking-wide">Copyright © meap <span id="year"></span> | No rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
};




