import React from "react";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-primary border-t border-accent/20 py-6 flex flex-col md:flex-row justify-between items-center px-8"
    >
      <div className="flex items-center gap-2 text-accent font-bold">
        <span className="text-lg">🎲</span>
        JackMint dLottery &copy; {new Date().getFullYear()}
      </div>
      <div className="text-text/80 text-sm mt-2 md:mt-0">
        Built by Shivam Maurya. Powered by Chainlink VRF.
      </div>
    </footer>
  );
}