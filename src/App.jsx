import { Canvas } from "@react-three/fiber";
import React, { Suspense, useRef, useState } from "react";
import "./App.css";
import {
  AdaptiveDpr,
  Environment,
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
        style={{ height: "100vh", width: "100vw", border: "1px solid black" }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => gl.setClearColor("#000")}
        mode="concurrent"
        shadows
        frameloop="demand"
      >
        <AdaptiveDpr />
        <OrthographicCamera
          makeDefault
          position={[70, -50, 50]}
          near={1}
          far={1000}
          zoom={5}
        />
        <ambientLight />
        <pointLight position={[150, 150, 150]} intensity={0.5} />

        {image && (
          <Suspense fallback={<Fallback />}>
            <Points imageSrc={image} />
            <Environment preset={"sunset"} />
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
      </ActualCanvas>
      {image ? (
        <div className="flex-center button-container">
          <button onClick={() => setImage(null)}>New image</button>
          <Thumbnail src={image} />
        </div>
      ) : (
        <Dialog setImage={setImage} />
      )}
    </>
  );
}
