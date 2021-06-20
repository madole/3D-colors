import dialogPolyfill from "dialog-polyfill";
import React, { useEffect, useRef } from "react";
import "./Dialog.css";
import FileInput from "./FileInput";

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
          const imageFile = formData.get("file");
          setImage(imageSrc || imageFile);
          e.currentTarget.reset();
        }}
      >
        <label>
          <div>Paste an image URL to start</div>
          <input name="image-src" type="url" inputMode="url" autoFocus />
        </label>
        <a
          className="link"
          href={"https://unsplash.com"}
          target="_blank"
          rel="noreferrer"
        >
          Try Unsplash
          <br />
          The internet’s source of freely-usable images.
        </a>
        <FileInput />
        <button type="submit">Submit</button>
      </form>
    </dialog>
  );
};

export default Dialog;
