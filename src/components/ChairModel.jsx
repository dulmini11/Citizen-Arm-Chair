import { useEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import plano1 from "../assets/res/materials/planobluecoconutmtl1.png";

export default function ChairModel({ backType, textureMap, neckTextureMap }) {
  const { scene } = useGLTF("/chair_citizen.glb");
  const defaultTexture = useTexture(plano1);

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

  useEffect(() => {
      if (!scene) return;

      // Silver metallic citizen_base
      const base = scene.getObjectByName("citizen_base");
      if (base) {
        const lightenMesh = (mesh) => {
          if (!mesh.isMesh) return;
          if (!mesh._originalBaseMaterial) {
            mesh._originalBaseMaterial = mesh.material.clone();
          }
          const mat = mesh._originalBaseMaterial.clone();
          mat.color.set(0xb8cfe8);     
          mat.roughness = 0.28;  
          mat.metalness = 0.9;   
          mat.envMapIntensity = 1.5;   
          mat.needsUpdate = true;
          mesh.material = mat;
        };
        if (base.isMesh) lightenMesh(base);
        else base.traverse(lightenMesh);
      }

    }, [scene]);

  // Apply texture to seat (citizen_Lowback, citizen_highback)
  useEffect(() => {
    if (!scene || !defaultTexture) return;

    const targetNames = ["citizen_Lowback", "citizen_highback"];

    // Use provided textureMap or fall back to default plano1
    const activeTexture = textureMap || defaultTexture;

    const applyTexture = (mesh) => {
      if (!mesh.isMesh) return;

      if (!mesh._originalMaterial) {
        mesh._originalMaterial = mesh.material.clone();
      }

      const newMat = mesh._originalMaterial.clone();

      if (activeTexture) {
        const t = activeTexture.clone();
        t.colorSpace = THREE.SRGBColorSpace;
        t.repeat.set(120, 120);
        t.wrapS = THREE.RepeatWrapping;
        t.wrapT = THREE.RepeatWrapping;
        t.needsUpdate = true;

        newMat.map = t;

        // material rendering
        newMat.roughness = 0.8;      
        newMat.metalness = 0.3;    
        newMat.envMapIntensity = 1; 
      } else {
        newMat.map = null;
      }

      newMat.needsUpdate = true;
      mesh.material = newMat;
    };

    targetNames.forEach((name) => {
      const obj = scene.getObjectByName(name);
      if (!obj) return;

      if (obj.isMesh) {
        applyTexture(obj);
      } else {
        obj.traverse(applyTexture);
      }
    });

  }, [scene, textureMap, defaultTexture]);

  // Apply texture to neck cushion (citizen_cover)
  useEffect(() => {
    if (!scene || !defaultTexture) return;

    const activeTexture = neckTextureMap || defaultTexture;

    const applyTexture = (mesh) => {
      if (!mesh.isMesh) return;

      if (!mesh._originalNeckMaterial) {
        mesh._originalNeckMaterial = mesh.material.clone();
      }

      const newMat = mesh._originalNeckMaterial.clone();

      if (activeTexture) {
        const t = activeTexture.clone();
        t.colorSpace = THREE.SRGBColorSpace;
        t.repeat.set(39, 39);
        t.wrapS = THREE.RepeatWrapping;
        t.wrapT = THREE.RepeatWrapping;
        t.needsUpdate = true;

        newMat.map = t;

        newMat.roughness = 0.8;
        newMat.metalness = 0.3;
        newMat.envMapIntensity = 1;
      } else {
        newMat.map = null;
      }

      newMat.needsUpdate = true;
      mesh.material = newMat;
    };

    const cover = scene.getObjectByName("citizen_cover");
    if (!cover) return;

    if (cover.isMesh) {
      applyTexture(cover);
    } else {
      cover.traverse(applyTexture);
    }

  }, [scene, neckTextureMap, defaultTexture]);

  return (
    <primitive
      object={scene}
      scale={3}
      rotation={[0.2, 0.8, 0]}
      position={[0, -1, 0]}
    />
  );
}