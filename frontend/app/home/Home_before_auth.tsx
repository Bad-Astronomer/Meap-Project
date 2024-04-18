import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BentoGridHome } from './BentoGridHome';
import Pricing from '../_components/ui/Pricing';

const Home_before_auth = () => {

    const titles = ["See", "Dream", "Desire", "Remember"];
    const [titleIndex, setTitleIndex] = useState(0);

    useEffect(() => {
       const intervalId = setInterval(() => {
         setTitleIndex((prevTitleIndex) => (prevTitleIndex + 1) % titles.length);
       }, 2000);
   
       return () => clearInterval(intervalId);
    }, [titleIndex]); 


    return (
        // Outer Container
        //border border-y-transparent
        <div className='w-4/5 mx-auto p-20 pt-0'>
            <div className="mt-5 flex justify-center items-center flex-col pt-16 max-w-4xl m-auto border border-white/[0.2] rounded-xl">
                <p className='pt-16 h-0 text-white/[0.75] text-6xl font-bold text-center transform translate-y-12 z-10'>
                    <span className='meap-header'>Color</span> it like <br />
                    you <span className='meap-header'>{titles[titleIndex]}</span> it.
                </p>

                <Image
                src={`/home/image_${titleIndex}.png`}
                className="h-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0 transform"
                height="1200"
                width="1500"
                alt="thumbnail"
                />
            </div>
            <div className="mt-5">
                <BentoGridHome/>
                <Pricing />
            </div>
        </div>
    )
}

export default Home_before_auth
