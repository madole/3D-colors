import { Canvas } from "@react-three/fiber";
import React, { Suspense, useRef, useState } from "react";
import "./App.css";
import {
  AdaptiveDpr,
  Environment,
  GizmoHelper,
  GizmoViewport,
  PresentationControls,
  OrthographicCamera,
  Reflector,
  MeshReflectorMaterial,
  OrbitControls,
  ContactShadows,
} from "@react-three/drei";
import Fallback from "./Fallback";
import Points from "./Points";
import Dialog from "./Dialog";
import isAr from "./is-ar";
import { ARCanvas } from "@react-three/xr/src/XR";
import Thumbnail from "./Thumbnail";

const ActualCanvas = isAr ? ARCanvas : Canvas;

export default function App() {
  const [image, setImage] = useState(null);

  return (
    <>
      <ActualCanvas
        style={{ height: "100vh", width: "100vw", border: "1px solid black" }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => gl.setClearColor("#000")}
        flat
        dpr={[1, 2]}
        camera={{ position: [0, 5, 8], fov: 25 }}
      >
        {/*<AdaptiveDpr />*/}

        <ambientLight />
        <pointLight position={[150, 150, 150]} intensity={0.5} />
        <OrbitControls />
        {image && (
          <Suspense fallback={<Fallback />}>
            <Points imageSrc={image} />
            <Environment preset={"sunset"} />
          </Suspense>
        )}
        <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[1000, 1000]} />
          <MeshReflectorMaterial
            resolution={1024}
            mirror={0.9}
            mixBlur={100}
            mixStrength={2}
            blur={blur || [0, 0]}
            minDepthThreshold={0.8}
            maxDepthThreshold={1.2}
            depthScale={0}
            depthToBlurRatioBias={0.2}
            debug={0}
            distortion={0}
            color="#a0a0a0"
            metalness={0.5}
          />
        </mesh>
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
