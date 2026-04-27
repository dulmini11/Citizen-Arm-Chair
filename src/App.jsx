import { useState, useRef, useEffect } from "react";
import expandIcon from "./assets/expand.png";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import ChairModel from "./components/ChairModel";
import highback from "./assets/highback.png";
import lowback from "./assets/lowback.png";
import { FaShoppingCart } from "react-icons/fa";

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

// All texture paths in one flat array for preloading
const ALL_TEXTURES = [
  plano1, plano2, plano3, plano4,
  laser1, laser2, laser3, laser4,
  cosy1,  cosy2,  cosy3,  cosy4,
  credo1, credo2, credo3, credo4,
];

function ChairDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const options = [
    { value: "low", label: "Low Back", img: lowback },
    { value: "high", label: "High Back", img: highback },
  ];

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full mt-6 mb-8">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between px-4 py-3 bg-white shadow-md cursor-pointer select-none"
      >
        <div className="flex items-center gap-3">
          <img src={selected.img} alt={selected.label} className="w-11 h-11 object-contain" />
          <span className="font-popp text-sm md:text-base">{selected.label}</span>
        </div>
        <span className={`text-xs text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>▼</span>
      </div>

      {open && (
        <div className="absolute z-10 left-0 right-0 top-full bg-white shadow-lg border border-gray-100">
          {options.filter((opt) => opt.value !== value).map((opt) => (
            <div
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
            >
              <img src={opt.img} alt={opt.label} className="w-11 h-11 object-contain" />
              <span className="font-popp text-sm md:text-base">{opt.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [expanded, setExpanded] = useState(false);
  const [backType, setBackType] = useState("low");

  // Separate state for Seat and Neck Cushion
  const [seatTab, setSeatTab] = useState("Plano");
  const [seatSelected, setSeatSelected] = useState(null);

  const [neckTab, setNeckTab] = useState("Plano");
  const [neckSelected, setNeckSelected] = useState(null);

  const materials = {
    Plano: [plano1, plano2, plano3, plano4],
    Laser: [laser1, laser2, laser3, laser4],
    Cosy: [cosy1, cosy2, cosy3, cosy4],
    Credo: [credo1, credo2, credo3, credo4],
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row relative">

      {/* 3D Canvas — full width on mobile, 75% on md+ */}
      <div
        className={`
          bg-gray-100 flex items-center justify-center relative transition-all duration-300
          w-full h-[60vh] md:h-screen
          ${expanded ? "md:w-full" : "md:w-[75%]"}
        `}
      >
        <Canvas camera={{ position: [0, 1, 3] }}>
          <TextureConsumer
            backType={backType}
            materials={materials}
            seatTab={seatTab}
            seatSelected={seatSelected}
            neckTab={neckTab}
            neckSelected={neckSelected}
          />
          <OrbitControls />

          <directionalLight
            position={[-5, 5, 3]}   
            intensity={3}            
            color="#ffffff"
          />
          <directionalLight
            position={[-3, 2, 5]} 
            intensity={1.5}
          />
          <ambientLight intensity={0.4} />
        </Canvas>

        <button
          onClick={() => setExpanded(!expanded)}
          className="absolute top-3 right-3"
        >
          <img 
            src={expandIcon}
            alt="expand" 
            className="w-5 h-5"
          />
        </button>
      </div>

      {/* Right panel — full width on mobile, 25% on md+, goes below canvas on mobile */}
      {!expanded && (
        <div className="w-full md:w-[25%] md:h-screen bg-white flex flex-col items-start justify-start p-6 overflow-y-auto pb-6">
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

          <ChairDropdown value={backType} onChange={setBackType} />

          {/* Seat section */}
          <h4 className="mb-2">Seat</h4>
          <div className="w-full bg-white rounded-md border border-gray-300">
            <div className="flex">
              {["Plano", "Laser", "Cosy", "Credo"].map((tab, i, arr) => (
                <button
                  key={tab}
                  onClick={() => {
                    setSeatTab(tab);
                    setSeatSelected(null);
                  }}
                  className={`flex-1 py-2 text-center hover:bg-gray-200
                  ${i !== arr.length - 1 ? "border-r border-gray-300" : ""}
                  ${seatTab === tab ? "bg-blue-600 text-white" : "text-black"}
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Seat Circles */}
          <div className="flex gap-4 mt-4 mb-8">
            {materials[seatTab].map((img, index) => (
              <div
                key={index}
                onClick={() => setSeatSelected(index)}
                className={`w-14 h-14 rounded-full cursor-pointer flex items-center justify-center
                ${
                  seatSelected === index
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

          {/* Neck Cushion — only visible when high back is selected */}
          {backType === "high" && (
            <>
              <h4 className="mb-3">Neck Cushion</h4>
              <div className="w-full bg-white rounded-md border border-gray-300">
                <div className="flex">
                  {["Plano", "Laser", "Cosy"].map((tab, i, arr) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setNeckTab(tab);
                        setNeckSelected(null);
                      }}
                      className={`flex-1 py-2 text-center hover:bg-gray-200
                      ${i !== arr.length - 1 ? "border-r border-gray-300" : ""}
                      ${neckTab === tab ? "bg-blue-600 text-white" : "text-black"}
                      `}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Neck Cushion Circles */}
              <div className="flex gap-4 mt-4 mb-8">
                {materials[neckTab].map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setNeckSelected(index)}
                    className={`w-14 h-14 rounded-full cursor-pointer flex items-center justify-center
                    ${
                      neckSelected === index
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
            </>
          )}

          <button className="focus:outline-none w-full min-h-[48px] bg-[#336ae7] bg-gradient-to-b from-butbluegrad1 to-butbluegrad2 rounded-md hover:opacity-95 text-white flex items-center justify-center gap-2 text-base md:text-xl mt-2 mb-2 shrink-0">
            <FaShoppingCart size={18} />
            Purchase
          </button>
        </div>
      )}

    </div>
  );
}

//  This runs INSIDE Canvas so useTexture works
function TextureConsumer({ backType, materials, seatTab, seatSelected, neckTab, neckSelected }) {
  // Preload ALL textures at once — Drei caches them by URL
  const textures = useTexture(ALL_TEXTURES);

  // Map each imported path back to its loaded texture object
  const textureMap = {
    Plano: materials.Plano.map((path) => textures[ALL_TEXTURES.indexOf(path)]),
    Laser: materials.Laser.map((path) => textures[ALL_TEXTURES.indexOf(path)]),
    Cosy:  materials.Cosy.map((path)  => textures[ALL_TEXTURES.indexOf(path)]),
    Credo: materials.Credo.map((path) => textures[ALL_TEXTURES.indexOf(path)]),
  };

  // Get the actual Three.js Texture object for the selected seat color
  const activeTexture = seatSelected !== null ? textureMap[seatTab][seatSelected] : null;

  const activeNeckTexture = neckSelected !== null ? textureMap[neckTab][neckSelected] : null;

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <ChairModel backType={backType} textureMap={activeTexture} neckTextureMap={activeNeckTexture} />
    </>
  );
}