import { Canvas } from "@react-three/fiber";
import React, { Suspense, useRef, useState } from "react";
import "./App.css";
import {
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  OrthographicCamera,
} from "@react-three/drei";
import Fallback from "./Fallback";
import Points from "./Points";
import Dialog from "./Dialog";
import isDebug from "./is-debug";
import isAr from "./is-ar";
import { ARCanvas } from "@react-three/xr/src/XR";
import Thumbnail from "./Thumbnail";

const ActualCanvas = isAr ? ARCanvas : Canvas;

export default function App() {
  const [image, setImage] = useState(null);
  const controlsRef = useRef();

  return (
    <>
      <ActualCanvas
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
          <OrbitControls ref={controlsRef} />
          {isDebug && (
            <GizmoHelper
              alignment={"bottom-right"}
              margin={[80, 80]}
              onTarget={() => controlsRef?.current?.target}
              onUpdate={() => controlsRef.current?.update()}
            >
              <GizmoViewport
                axisColors={["red", "green", "blue"]}
                labelColor={"white"}
              />
            </GizmoHelper>
          )}
        </OrthographicCamera>
      </ActualCanvas>
      {image ? (
        <div className="flex-center">
          <button onClick={() => setImage(null)}>New image</button>
          <Thumbnail src={image} />
        </div>
      ) : (
        <Dialog setImage={setImage} />
      )}
    </>
  );
}
