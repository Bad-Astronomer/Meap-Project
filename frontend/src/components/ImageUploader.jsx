import React, { useState, useRef } from "react";
import "../styles/image-modifier.css";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Hidden } from "@mui/material";
import ColorizedImage from "./ColorizedImage";
import ColorizeButton from "./ColorizeButton";
import PrimaryButton from "./PrimaryButton";

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const inputRef = useRef(null);
  const [isImageVisible, setIsImageVisible] = useState(false);
  // const [imageWidth, setImageWidth] = useState(null);
  // const [imageHeight, setImageHeight] = useState(null);

  const handleIconClick = () => {
    inputRef.current.click();
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);

      const img = new Image();
      img.src = url;
      img.onload = function () {
        setImageWidth(this.width);
        setImageHeight(this.height);
      };

      const formData = new FormData();
      formData.append("image", file);

      // try {
      //   const response = await fetch(
      //     "https://jsonplaceholder.typicode.com/photos",
      //     {
      //       method: "POST",
      //       body: formData,
      //     }
      //   );

      //   if (response.ok) {
      //     // Parsing and logging the JSON response
      //     const data = await response.json();
      //     console.log("Image uploaded successfully!", data);
      //   } else {
      //     // Logging an error message if the request was not successful
      //     console.error("Failed to upload image.");
      //   }
      // } catch (error) {
      //   // Logging any errors that occurred during the request
      //   console.error("Error uploading image:", error);
      // }
    }
  };

  const handleButtonClick = () => {
    setIsImageVisible(true);
  };

  return (
    <div className="image-modifier">
      <div className="image-upload-card" onClick={handleIconClick}>
        <input
          type="file"
          ref={inputRef}
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        {selectedImage ? (
          selectedImage && (
            <div>
              <img
                src={selectedImage}
                alt="Selected"
                style={{ maxWidth: "100%" }}
              />
            </div>
          )
        ) : (
          <div>
            <FileUploadOutlinedIcon style={{ fontSize: 48, color: "white" }} />
          </div>
        )}
      </div>
      <div className="image-upload-card">
        {/* <ColorizeButton
          setIsImageVisible={setIsImageVisible}
          isImageVisible={isImageVisible}
        /> */}
        <PrimaryButton buttonText="Generate" onClickFunction={handleButtonClick}/>
        {isImageVisible && (
          <ColorizedImage  />
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
