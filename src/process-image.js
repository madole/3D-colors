import { Vector3 } from "three";

const debugCanvas = (canvas) => {
  const root = document.querySelector("#root");
  root.appendChild(canvas);
};
const SAMPLE_RATE = 500;
const processImage = async (
  imageSrc = "https://images.unsplash.com/photo-1623408861528-27ff44f27da5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
) => {
  const image = new Image();
  image.src = imageSrc;
  image.setAttribute("crossOrigin", "");

  await new Promise((resolve) => {
    image.onload = () => resolve();
  });
  const { naturalHeight: width, naturalWidth: height } = image;
  console.log("Loaded");
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0);
  // debugCanvas(canvas);
  const vecs = new Set();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (x % SAMPLE_RATE === 0 || y % SAMPLE_RATE === 0) {
        const { data } = context.getImageData(x, y, 1, 1);

        const rgba = {
          r: data[0],
          g: data[1],
          b: data[2],
          a: data[3],
        };

        vecs.add(new Vector3(rgba.r, rgba.g, rgba.b));
      }
    }
  }
  console.log(vecs.size);

  return [...vecs];
};
export default processImage;
