import { Canvas, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import processImage from "./process-image";
import "./App.css";
import { Html, OrbitControls, OrthographicCamera } from "@react-three/drei";
import dialogPolyfill from "dialog-polyfill";

import {
  Color,
  Euler,
  InstancedMesh,
  Matrix4,
  MeshPhongMaterial,
  Quaternion,
  SphereBufferGeometry,
  Vector3,
} from "three";
import usePromise from "react-promise-suspense";

const Points = ({ imageSrc }) => {
  const { scene } = useThree();

  const points = usePromise(processImage, [imageSrc]);

  const mesh = useMemo(
    () =>
      new InstancedMesh(
        new SphereBufferGeometry(0.15, 32, 32),
        new MeshPhongMaterial({ shininess: 100 }),
        points.length
      ),
    [points]
  );

  points.forEach((p, i) => {
    const matrix = new Matrix4();
    const rotation = new Euler();
    const quaternion = new Quaternion();
    const scaleValue = Math.max(1, p.x, p.y, p.z);
    const scale = new Vector3(scaleValue, scaleValue, scaleValue);

    quaternion.setFromEuler(rotation);

    matrix.compose(p, quaternion, scale);
    mesh.setMatrixAt(i, matrix);

    const colorVec = p.normalize();
    const color = new Color(colorVec.x, colorVec.y, colorVec.z);
    mesh.setColorAt(i, color);
  });
  scene?.add(mesh);
  return null;
};

const Fallback = () => (
  <Html center>
    <div className="loading">Loading...</div>
  </Html>
);

const InitialState = ({ setImage }) => (
  <Html center>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const imageSrc = formData.get("image-src");
        setImage(imageSrc);
        e.currentTarget.reset();
      }}
    >
      <label>
        <span>Paste an image URL to start</span>
        <input name="image-src" type="url" inputMode="url" />
      </label>
      <button type="submit">Submit</button>
    </form>
  </Html>
);

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
          console.log(formData);

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

export default function App() {
  const [image, setImage] = useState(null);

  return (
    <>
      <Canvas
        style={{ height: "90vh", width: "100vw", border: "1px solid black" }}
        key={image}
      >
        <color attach="background" args={["black"]} />
        <OrthographicCamera
          makeDefault
          autoRotate
          position={[
            -4.892048303836491, -3.5435435918963303, -3.6757532840576914,
          ]}
          rotation={[
            2.374505818463901, -0.7640343956992542, 2.5533897942197092,
          ]}
          zoom={3}
        >
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {image && (
            <Suspense fallback={<Fallback />}>
              <Points imageSrc={image} />
            </Suspense>
          )}
          <OrbitControls />
        </OrthographicCamera>
      </Canvas>
      {image ? (
        <div className="flex-center">
          <button onClick={() => setImage(null)}>New image</button>
        </div>
      ) : (
        <Dialog setImage={setImage} />
      )}
    </>
  );
}
