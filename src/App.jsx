import { useState } from "react";
import expandIcon from "./assets/expand.png";

export default function App() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="h-screen w-full flex relative">

      <div
        className={`
          bg-gray-100 flex items-center justify-center relative transition-all duration-300
          ${expanded ? "w-full" : "w-[75%]"}
        `}
      >
        <h1 className="text-4xl font-bold">Grid 1</h1>

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
      <div className="w-[25%] h-full bg-white flex flex-col items-start justify-start p-6 gap-4">
        <h1 className="leading-8 font-popp text-lg font-bold md:text-3xl md:font-semibold md:leading-10 ">
          Citizen Arm Chair
        </h1>

        <h2 className="leading-5 font-popp text-sm font-light md:text-lg md:font-light">
          Konstantin Grcic, 2020
        </h2>

        <p className="leading-5 font-popp text-xs font-light md:text-sm md:font-light hidden md:block">
          The Citizen armchair combines an unconventional design with a new way of sitting: the 
          seat is suspended on three cables, enabling a pleasant swinging movement and a unique dynamic experience for the sitter.
        </p>

        <button className="focus:outline-none w-full h-12 bg-[#336ae7] bg-gradient-to-b from-butbluegrad1 to-butbluegrad2 rounded-md hover:opacity-95 text-white text-center text-base md:text-xl ">
          Purchase
        </button>
      </div>
      )}

    </div>
  );
}