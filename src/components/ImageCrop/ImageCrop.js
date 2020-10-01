import React, { useState, useEffect } from "react";
import "./ImageCrop.css";
import CropForm from "./CropForm/CropForm";

const ImageCrop = () => {
  const [imagePreviewURL, setImagePreviewURL] = useState("");
  const [uploadedImageName, setUploadedImageName] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageDimensions, setUploadedImageDimensions] = useState({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    if (imagePreviewURL) {
      const image = new Image();
      image.src = imagePreviewURL;
      setUploadedImage(image);
      image.onload = () => {
        setUploadedImageDimensions({
          height: image.height,
          width: image.width,
        });
      };
    }
  }, [imagePreviewURL]);

  // Clear file if not correct type or no file selected
  const clearUploadedFile = () => {
    setImagePreviewURL("");
    setUploadedImageName("");
    setUploadedImage(null);
    setUploadedImageDimensions({
      height: 0,
      width: 0,
    });
  };

  const handleFileChange = (file) => {
    setUploadedImageName(file.name.replace(/\.[^/.]+$/, ""));
    setImagePreviewURL(URL.createObjectURL(file));
  };

  const handleCrop = (formValues) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = formValues.width;
    canvas.height = formValues.height;

    // In case file is broken
    try {
      context.drawImage(
        uploadedImage,
        formValues.x,
        formValues.y,
        formValues.width,
        formValues.height,
        0,
        0,
        formValues.width,
        formValues.height
      );

      const image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      downloadImage(image, uploadedImageName);
    } catch (error) {
      // Handle error
      clearUploadedFile();
    }
  };

  const downloadImage = (data, filename) => {
    var a = document.createElement("a");
    a.href = data;
    a.download = `${filename}-cropped.jpeg`;
    document.body.appendChild(a);
    a.click();
  };

  return (
    <section className="imageCrop-container">
      <header>
        <h1>Image crop</h1>
      </header>

      <CropForm
        onCrop={handleCrop}
        onFileChange={handleFileChange}
        imageDimenstions={uploadedImageDimensions}
        clearUploadedFile={clearUploadedFile}
        imagePreviewURL={imagePreviewURL}
      />
    </section>
  );
};

export default ImageCrop;
