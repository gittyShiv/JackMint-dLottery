import React from "react";
import PoolTogetherHeroBg from "./PoolTogetherHeroBg.jsx";
import JackMintLogo from "../assets/jackmint-logo.svg";

export default function Hero() {
  return (
    <PoolTogetherHeroBg>
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-xl">
        The <span className="text-[#16ffe0]">#1 dLottery</span> <br />for Real Blockchain Winners
      </h1>
      <p className="text-xl md:text-2xl text-[#a385ff] mb-8 max-w-2xl">
        JackMint is where luck meets blockchain! Enter for a chance to win every interval, powered by Chainlink VRF for transparent, provable fairness.
      </p>
      <a
        href="#stats"
        className="bg-[#16ffe0] text-[#2a155a] px-10 py-5 rounded-xl text-2xl font-bold shadow-xl hover:bg-[#00e6c7] hover:scale-105 transition-all duration-200"
        style={{ boxShadow: "0 6px 40px #16ffe044" }}
      >
        Enter Now
      </a>
    </PoolTogetherHeroBg>
  );
}
