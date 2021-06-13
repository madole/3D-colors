import dialogPolyfill from "dialog-polyfill";
import React, { useEffect, useRef } from "react";

const Dialog = ({ setImage }) => {
  const dialogRef = useRef();
  useEffect(() => {
    dialogPolyfill.registerDialog(dialogRef.current);
  }, []);

  return (
    <dialog ref={dialogRef} open={true}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const imageSrc = formData.get("image-src");
          setImage(imageSrc);
          e.currentTarget.reset();
        }}
      >
        <label>
          <div>Paste an image URL to start</div>
          <input name="image-src" type="url" inputMode="url" autoFocus />
        </label>
        <button type="submit">Submit</button>
      </form>
    </dialog>
  );
};

export default Dialog;
