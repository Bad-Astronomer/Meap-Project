import React from 'react'
import { Gallery } from './ui/Gallery'

const DemoGallery = () => {
    const img_urls = [
        "src/assets/1.jpg",
        "src/assets/2.jpg",
        "src/assets/3.jpg",
        "src/assets/4.jpg",
        "src/assets/5.jpg",
        "src/assets/6.jpg",
        "src/assets/7.jpg",
        "src/assets/8.jpg",
        "src/assets/9.jpg",
        "src/assets/10.jpg",
        "src/assets/11.jpg",
        "src/assets/12.jpg",
        "src/assets/13.jpg",
        "src/assets/14.jpg",
        "src/assets/15.jpg",
        "src/assets/16.jpg",
        "src/assets/17.jpg",
        "src/assets/18.jpg",
    ]
    return (
        <Gallery images={img_urls} />
    )
}

export default DemoGallery