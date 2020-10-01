const errorTexts = {
  invalid: "Invalid value",
  outOfBorders: "Out of image borders",
  noPixels: "No pixels were selected",
  typeNotSupported: "File type not supported",
  fileSize: "File to large",
  noFile: "No file provided",
};

const ALLOWED_FILE_TYPES = ["jpeg", "jpg", "png"];
const MAX_FILE_SIZE = 20971520; // 20 MB

export const validateFile = (file) => {
  let error = "";

  if (!ALLOWED_FILE_TYPES.includes(file.name.split(".").pop().toLowerCase()))
    error = errorTexts.typeNotSupported;

  if (file.size > MAX_FILE_SIZE) error = errorTexts.fileSize;

  return { error, isValid: !error };
};

export const validate = (formValues, imageDimensions) => {
  const errors = { file: "", x: "", y: "", width: "", height: "" };

  if (imageDimensions.width === 0 || imageDimensions.height === 0) {
    errors.file = errorTexts.noFile;
    return { errors };
  }

  if (+formValues.x + +formValues.width > imageDimensions.width) {
    errors.x = errorTexts.outOfBorders;
    errors.width = errorTexts.outOfBorders;
  }

  if (+formValues.y + +formValues.height > imageDimensions.height) {
    errors.y = errorTexts.outOfBorders;
    errors.height = errorTexts.outOfBorders;
  }

  if (!formValues.width) errors.width = errorTexts.noPixels;
  if (!formValues.height) errors.height = errorTexts.noPixels;

  for (let key in errors) {
    if (key === "file") continue;

    if (formValues[key] < 0) {
      errors[key] = errorTexts.invalid;
    }
  }

  let isValid = true;

  for (let key in errors) {
    if (errors[key]) isValid = false;
  }

  return { errors, isValid };
};
