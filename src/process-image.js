import { Vector3 } from "three";
import isDebug from "./is-debug";

const debugCanvas = (canvas) => {
  const root = document.querySelector("#root");
  root.appendChild(canvas);
};
const SAMPLE_RATE = 50;

const countVectors = (vectors) => {
  const vectorCounts = vectors.reduce((acc, vec) => {
    const stringVec = JSON.stringify(vec);
    if (vec.x < 10 && vec.y < 10 && vec.z < 10) {
      acc[stringVec] = { vector: vec, count: 1 };
    } else if (acc[stringVec]) {
      acc[stringVec].count++;
    } else {
      acc[stringVec] = { vector: vec, count: 1 };
    }
    return acc;
  }, {});

  return Object.values(vectorCounts);
};

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
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0);
  if (isDebug) {
    debugCanvas(canvas);
  }
  const vectorArray = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (x % SAMPLE_RATE === 0) {
        const { data } = context.getImageData(x, y, 1, 1);

        const rgba = {
          r: data[0],
          g: data[1],
          b: data[2],
          a: data[3],
        };

        vectorArray.push(new Vector3(rgba.r, rgba.g, rgba.b));
      }
    }
  }
  return countVectors(vectorArray);
};
export default processImage;
