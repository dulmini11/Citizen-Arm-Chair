import { useState } from "react";
import expandIcon from "./assets/expand.png";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import ChairModel from "./components/ChairModel";

export default function App() {
  const [expanded, setExpanded] = useState(false);
  const [backType, setBackType] = useState("low");

  return (
    <div className="h-screen w-full flex relative">

      <div
        className={`
          bg-gray-100 flex items-center justify-center relative transition-all duration-300
          ${expanded ? "w-full" : "w-[75%]"}
        `}
      >
        <Canvas camera={{ position: [0, 1, 3] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} />

          <ChairModel backType={backType} />

          <OrbitControls />
        </Canvas>

        <button
          onClick={() => setExpanded(!expanded)}
          className="absolute top-3 right-3 "
        >
          <img 
          src={expandIcon}
           alt="expand" 
           className="w-5 h-5"
            />
        </button>
      </div>

      {!expanded && (
      <div className="w-[25%] h-full bg-white flex flex-col items-start justify-start p-6">
        <h1 className="leading-8 font-popp text-lg font-bold md:text-3xl md:font-semibold md:leading-10">
          Citizen Arm Chair
        </h1>

        <h2 className="leading-5 font-popp text-sm font-light md:text-lg md:font-light mt-[0.5px]">
          Konstantin Grcic, 2020
        </h2>

        <p className="leading-5 font-popp text-xs font-light md:text-sm md:font-light hidden md:block mt-5">
          The Citizen armchair combines an unconventional design with a new way of sitting: the 
          seat is suspended on three cables, enabling a pleasant swinging movement and a unique dynamic experience for the sitter.
        </p>

        <select
          value={backType}
          onChange={(e) => setBackType(e.target.value)}
          className="w-full bg-white text-black border border-gray-300 px-4 py-4 rounded-md focus:outline-none mt-6 mb-8"
        >
          <option className="bg-white" value="low">Low back</option>
          <option value="high">High back</option>
        </select>

        <button className="focus:outline-none w-full h-12 bg-[#336ae7] bg-gradient-to-b from-butbluegrad1 to-butbluegrad2 rounded-md hover:opacity-95 text-white text-center text-base md:text-xl ">
          Purchase
        </button>
      </div>
      )}

    </div>
  );
}