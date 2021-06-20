import React, { useEffect, useState } from "react";

const Thumbnail = (props) => {
  const { src } = props;
  const [imageSrc, setImageSrc] = useState();
  useEffect(() => {
    if (src instanceof File) {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(src);
    } else {
      setImageSrc(src);
    }
  }, []);

  return imageSrc ? (
    <img className="thumbnail" src={imageSrc} alt="thumbnail" />
  ) : null;
};

export default Thumbnail;
