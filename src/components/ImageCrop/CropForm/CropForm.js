import React, { useState } from "react";
import PropTypes from "prop-types";
import Input from "./Input/Input";
import { validate, validateFile } from "../../../utils/validate";
import ImagePreview from "./ImagePreview/ImagePreview";

const CropForm = ({
  onCrop,
  onFileChange,
  imageDimenstions,
  clearUploadedFile,
  imagePreviewURL,
}) => {
  const [formValues, setFormValues] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [errors, setErrors] = useState({
    file: "",
    x: "",
    y: "",
    width: "",
    height: "",
  });

  const handleChange = (e) => {
    setErrors({ ...errors, x: "", y: "", width: "", height: "" });
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const { error, isValid } = validateFile(e.target.files[0]);
      if (isValid) {
        onFileChange(e.target.files[0]);
        setErrors({ ...errors, file: "" });
      } else {
        e.target.value = "";
        clearUploadedFile();
        setErrors({ ...errors, file: error });
      }
    } else {
      clearUploadedFile();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { errors: validationErrors, isValid } = validate(
      formValues,
      imageDimenstions
    );

    if (isValid) {
      setErrors({ file: "", x: "", y: "", width: "", height: "" });
      onCrop(formValues);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="content">
      <form onSubmit={handleSubmit} className="form">
        <Input
          htmlFor="image"
          type="file"
          id="image"
          name="image"
          label={"Image"}
          onChange={handleFileChange}
          error={errors.file}
          accept="image/png, image/jpeg"
        />

        <Input
          htmlFor="x"
          type="number"
          id="x"
          name="x"
          label={"X, px"}
          onChange={handleChange}
          value={formValues.x}
          error={errors.x}
        />

        <Input
          htmlFor="y"
          type="number"
          id="y"
          name="y"
          label={"Y, px"}
          onChange={handleChange}
          value={formValues.y}
          error={errors.y}
        />

        <Input
          htmlFor="width"
          type="number"
          id="width"
          name="width"
          label={"Width, px"}
          onChange={handleChange}
          value={formValues.width}
          error={errors.width}
        />

        <Input
          htmlFor="height"
          type="number"
          id="height"
          name="height"
          label={"Height, px"}
          onChange={handleChange}
          value={formValues.height}
          error={errors.height}
        />

        <button type="submit">Crop</button>
      </form>

      <ImagePreview
        imagePreviewURL={imagePreviewURL}
        imageDimenstions={imageDimenstions}
        formValues={formValues}
      />
    </div>
  );
};

CropForm.propTypes = {
  onCrop: PropTypes.func.isRequired,
  onFileChange: PropTypes.func.isRequired,
  imageDimenstions: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
  clearUploadedFile: PropTypes.func.isRequired,
  imagePreviewURL: PropTypes.string.isRequired,
};

export default CropForm;
