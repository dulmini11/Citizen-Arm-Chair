import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

export default function ChairModel({ backType }) {
  const { scene } = useGLTF("/chair_citizen.glb");

  useEffect(() => {
    if (!scene) return;

    // Always hidden
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
      const obj = scene.getObjectByName(name);
      if (obj) obj.visible = false;
    });

    // Back logic 
    const highBack = scene.getObjectByName("citizen_highback");
    const lowBack = scene.getObjectByName("citizen_Lowback");
    const pillow = scene.getObjectByName("citizen_cover");

    if (highBack) highBack.visible = backType === "high";
    if (lowBack) lowBack.visible = backType === "low";
    if (pillow) pillow.visible = backType === "high";

  }, [scene, backType]);

  return <primitive object={scene} scale={1.5} />;
}