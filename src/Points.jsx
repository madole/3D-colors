import * as React from "react";
import { useEffect, useRef } from "react";
import usePromise from "react-promise-suspense";
import processImage from "./process-image";
import { Color, Object3D } from "three";
import { useFrame } from "@react-three/fiber";
const dummy = new Object3D();

const Points = ({ imageSrc }) => {
  const ref = useRef();
  const points = usePromise(processImage, [imageSrc]);

  useEffect(() => {
    if (!ref.current) return;
    points.forEach((p, i) => {
      const scaleValue = Math.min(5, p.count);
      dummy.position.set(-p.vector.x, p.vector.y, -p.vector.z);
      dummy.scale.set(scaleValue, scaleValue, scaleValue);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);

      const colorVec = p.vector.normalize();
      const color = new Color(colorVec.x, colorVec.y, colorVec.z);
      ref.current.setColorAt(i, color);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  }, [points]);

  if (!points.length) {
    return null;
  }

  return (
    <instancedMesh ref={ref} args={[null, null, points.length]}>
      <sphereBufferGeometry args={[1, 32, 32]} />
      <meshPhongMaterial shininess={100} />
    </instancedMesh>
  );
};

export default Points;
