import React from "react";
import WalletConnect from "./WalletConnect";
import jackmintLogo from "../assets/jackmint-logo.svg"; 

export default function Header() {
  return (
    <header className="w-full bg-primary flex items-center justify-between px-8 py-4 shadow-lg z-20">
      <div className="flex items-center space-x-3">
        <span className="text-3xl font-heading font-bold text-highlight flex items-center">
          <img src={jackmintLogo} alt="JackMint Logo" className="h-8 md:h-10 mr-2" />
          JackMint
        </span>
        <span className="ml-2 rounded bg-accent px-2 py-1 text-xs text-primary font-bold tracking-wider">dLottery</span>
      </div>
      <nav className="hidden md:flex space-x-8 font-medium text-text">
        <a href="#why" className="hover:text-highlight transition-colors">Why Join?</a>
        <a href="#stats" className="hover:text-highlight transition-colors">Stats</a>
        <a href="#winners" className="hover:text-highlight transition-colors">Winners</a>
        <a href="#footer" className="hover:text-highlight transition-colors">Credits</a>
      </nav>
      <div>
        <WalletConnect />
      </div>
    </header>
  );
}