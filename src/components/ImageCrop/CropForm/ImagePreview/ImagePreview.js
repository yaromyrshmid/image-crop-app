import React, { useRef } from "react";
import PropTypes from "prop-types";
import "./ImagePreview.css";

const ImagePreview = ({
  imagePreviewURL,
  imageDimenstions: { width, height },
  formValues,
}) => {
  const image = useRef(null);

  const calculateOverlayStyle = () => {
    if (image && image.current) {
      // Get scale to original image
      const previewScale = image.current.width / width;

      const borderTopWidth = previewScale * formValues.y;
      const borderLeftWidth = previewScale * formValues.x;

      const borderBottomWidth =
        previewScale * (height - formValues.y - formValues.height);
      const borderRightWidth =
        previewScale * (width - formValues.x - formValues.width);

      let isValid = true;

      // If conditions fail paint border error
      if (
        borderTopWidth < 0 ||
        borderTopWidth > image.current.height ||
        borderLeftWidth < 0 ||
        borderLeftWidth > image.current.width ||
        borderBottomWidth < 0 ||
        borderBottomWidth > image.current.height ||
        borderRightWidth < 0 ||
        borderRightWidth > image.current.width
      ) {
        isValid = false;
      }

      return {
        borderTopWidth: borderTopWidth + "px",
        borderLeftWidth: borderLeftWidth + "px",
        borderBottomWidth: borderBottomWidth + "px",
        borderRightWidth: borderRightWidth + "px",
        borderColor: isValid ? "#8bc24a66" : "#da445366",
      };
    }

    return {};
  };

  return (
    <div className="imagePreview-container">
      {!!width && !!height && (
        <h2>
          Initial width: {width}, px
          <br /> Initial height: {height}, px
        </h2>
      )}

      {imagePreviewURL && (
        <div className="imagePreview-imageWrapper">
          <div
            className="imagePreview-cropOverlay"
            style={calculateOverlayStyle()}
          />

          <img ref={image} src={imagePreviewURL} alt="Preview" />
        </div>
      )}
    </div>
  );
};

ImagePreview.propTypes = {
  imagePreviewURL: PropTypes.string.isRequired,
  imageDimenstions: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
  formValues: PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default ImagePreview;
