/**
 * From example at: https://codesandbox.io/s/ym6mk75p2x
 */
import React from "react";
import PropTypes from "prop-types";
import DropZone from "react-dropzone";
import ImagePreview from "./image_preview";
import Placeholder from "./placeholder";

const DropZoneField = ({
  handleOnDrop,
  input,
  imagefile,
  label,
  meta: { error, touched }
}) => (
  <div className="image-preview-container">
    <DropZone
      accept="image/jpeg, image/png, image/gif, image/bmp"
      className="upload-container"
      onDrop={handleOnDrop}
      onChange={input.onChange}
    >
      {imagefile && imagefile.length > 0 ? (
        <ImagePreview imagefile={imagefile} />
      ) : (
        <Placeholder />
      )}
    </DropZone>
    {touched && error && <div className="error">{error}</div>}
  </div>
);

DropZoneField.propTypes = {
  handleOnDrop: PropTypes.func.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onDragStart: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    value: PropTypes.shape({
      preview: PropTypes.string
    })
  }),
  imagefile: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  label: PropTypes.string,
  touched: PropTypes.bool,
  error: PropTypes.string
};

export default DropZoneField;
