import { useGLTF } from "@react-three/drei";

export default function ChairModel() {
  const { scene } = useGLTF("/chair_citizen.glb");

  return <primitive object={scene} scale={1.5} />;
}