import React from 'react'
import { Gallery } from './ui/Gallery'

const DemoGallery = () => {
    const img_urls = [];
    for(let i = 1; i <= 18; i++){
        img_urls.push(`src/assets/${i}.jpg`)
    }

    return (
        <Gallery images={img_urls} />
    )
}

export default DemoGallery