import { useState } from "react";
import expandIcon from "./assets/expand.png";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import ChairModel from "./components/ChairModel";
import arrow from "./assets/res/arrow.png";
import plano1 from "./assets/res/materials/planobluecoconutmtl1.png";
import plano2 from "./assets/res/materials/planoclasseicgreenforestmtl.png";
import plano3 from "./assets/res/materials/planocognacmtl.png";
import plano4 from "./assets/res/materials/planoorangemtl.png";

import laser1 from "./assets/res/materials/laserbluemoormtl.png";
import laser2 from "./assets/res/materials/laserlightgreymtl.png";
import laser3 from "./assets/res/materials/lasermintforestmtl.png";
import laser4 from "./assets/res/materials/laseryellowpoppyredmtl.png";

import cosy1 from "./assets/res/materials/cosy2canoramtl.png";
import cosy2 from "./assets/res/materials/cosy2palerosemtl.png";
import cosy3 from "./assets/res/materials/cosy2papyrusmtl.png";
import cosy4 from "./assets/res/materials/cosy2rustyorange.png";

import credo1 from "./assets/res/materials/credoemeraldcmtl.png";
import credo2 from "./assets/res/materials/credoredchilliemtl.png";
import credo3 from "./assets/res/materials/credoroyalblueelephantmtl.png";
import credo4 from "./assets/res/materials/credosafferonmtl.png";


export default function App() {
  const [expanded, setExpanded] = useState(false);
  const [backType, setBackType] = useState("low");

  const [activeTab, setActiveTab] = useState("Plano");
  const [selected, setSelected] = useState(null);

  const materials = {
    Plano: [plano1, plano2, plano3, plano4],
    Laser: [laser1, laser2, laser3, laser4],
    Cosy: [cosy1, cosy2, cosy3, cosy4],
    Credo: [credo1, credo2, credo3, credo4],
  };

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

        <h4 className="mb-2">Seat</h4>       
        <div className="flex bg-white w-full overflow-hidden rounded-md">
          {["Plano", "Laser", "Cosy", "Credo"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSelected(null);
              }}
              className={`flex-1 py-2 text-center border border-gray-300 hover:bg-gray-200 ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Circles */}
        <div className="flex gap-6 mt-6 mb-12">
          {materials[activeTab].map((img, index) => (
            <div
              key={index}
              onClick={() => setSelected(index)}
              className={`w-14 h-14 rounded-full cursor-pointer flex items-center justify-center
                ${
                  selected === index
                    ? "border-2 border-blue-500"
                    : "border border-white"
                }`}
            >
              <div
                className="w-11 h-11 rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url(${img})` }}
              />
            </div>
          ))}
        </div>

        <button className="focus:outline-none w-full h-12 bg-[#336ae7] bg-gradient-to-b from-butbluegrad1 to-butbluegrad2 rounded-md hover:opacity-95 text-white text-center text-base md:text-xl ">
          Purchase
        </button>
      </div>
      )}

    </div>
  );
}