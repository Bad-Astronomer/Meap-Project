import React from 'react'
import { ParallaxGrid } from '@/app/_components/ui/ParallaxGrid'
import '@/app/globals.css'; 
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';


const page = async () => {
    const session = await getServerSession();
    if (!session || !session.user){
        redirect("/signup")
    }


    let img_urls:string[] = [];

    for(let i=1; i<=18; i++){
        img_urls.push(`/assets/${i}.jpg`); 
    }

    return ( 
        <>
            <div className="py-20 my-8 text-neutral-200 text-5xl font-bold flex items-center meap-header justify-center w-full">
                GALLERY
            </div> 
            
            <ParallaxGrid images={img_urls} />

        </>
    )
}

export default page
