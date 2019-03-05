/**
 * From example at: https://codesandbox.io/s/ym6mk75p2x
 */
import React from "react";
import PropTypes from "prop-types";

const ImagePreview = ({ imagefile }) =>
  imagefile.map(({ name, preview, size }) => (
    <ul key={name} className="render-preview">
      <li className="image-container">
        <img src={preview} alt={name} />
      </li>
      <li className="details">
        {name} - {size} bytes
      </li>
    </ul>
  ));

ImagePreview.propTypes = {
  imagefile: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
};

export default ImagePreview;
