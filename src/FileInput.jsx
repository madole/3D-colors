import React from "react";
import "./FileInput.css";

const FileInput = () => {
  return (
    <input
      className="file-input"
      name="file"
      type="file"
      id="imageFile2"
      capture="environment"
      accept="image/*"
    />
  );
};

export default FileInput;
