import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

export default function ChairModel({ backType }) {
  const model = useGLTF("/chair_citizen.glb");

  useEffect(() => {
    const hiddenNodes = [
      "Laser",
      "Plano",
      "Cosy_2",
      "credo",
      "Laser1",
      "Plano2",
      "Cosy_3",
      "credo1",
      "Laser2",
      "Plano3",
      "Cosy_4",
      "credo2",
      "Laser3",
      "Laser4",
      "Cosy_5",
      "credo3",
      "floor",
    ];

    hiddenNodes.forEach((name) => {
      const obj = model.scene.getObjectByName(name);
      if (obj) {
        obj.visible = false;
      }
    });

  }, [model]);

  return <primitive object={model.scene} scale={1.5} />;
}