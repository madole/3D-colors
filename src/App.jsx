import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState } from "react";
import "./App.css";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import Fallback from "./Fallback";
import Points from "./Points";
import Dialog from "./Dialog";

export default function App() {
  const [image, setImage] = useState(null);

  return (
    <>
      <Canvas
        style={{ height: "85vh", width: "100vw", border: "1px solid black" }}
        key={image}
      >
        <OrthographicCamera
          makeDefault
          autoRotate
          position={[-10, -10, -5]}
          rotation={[3, -1, 2.5533897942197092]}
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
          <img className="thumbnail" src={image} alt="thumbnail" />
        </div>
      ) : (
        <Dialog setImage={setImage} />
      )}
    </>
  );
}
