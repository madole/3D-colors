import * as React from "react";
import { useThree } from "@react-three/fiber";
import usePromise from "react-promise-suspense";
import processImage from "./process-image";
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
import { useEffect, useMemo } from "react";

const Points = ({ imageSrc }) => {
  const { scene } = useThree();
  const points = usePromise(processImage, [imageSrc]);
  const mesh = useMemo(
    () =>
      new InstancedMesh(
        new SphereBufferGeometry(1, 32, 32),
        new MeshPhongMaterial({ shininess: 100 }),
        points.length
      ),
    [points]
  );
  useEffect(() => {
    points.forEach((p, i) => {
      const matrix = new Matrix4();
      const rotation = new Euler();
      const quaternion = new Quaternion();
      const scaleValue = Math.min(25, p.count);

      const scale = new Vector3(scaleValue, scaleValue, scaleValue);

      quaternion.setFromEuler(rotation);

      matrix.compose(p.vector, quaternion, scale);
      mesh.setMatrixAt(i, matrix);

      const colorVec = p.vector.normalize();
      const color = new Color(colorVec.x, colorVec.y, colorVec.z);
      mesh.setColorAt(i, color);
    });
    scene?.add(mesh);
  }, [points]);

  return null;
};

export default Points;
