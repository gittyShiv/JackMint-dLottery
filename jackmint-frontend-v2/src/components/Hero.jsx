import React from "react";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center py-24 text-center bg-gradient-to-br from-primary via-accent/20 to-primary">
      <div className="absolute -top-16 left-10 w-28 h-28 bg-accent rounded-full mix-blend-lighten blur-2xl opacity-30 animate-pulse" />
      <div className="absolute bottom-0 right-10 w-44 h-44 bg-highlight rounded-full mix-blend-lighten blur-3xl opacity-20 animate-pulse" />
      <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-text leading-tight drop-shadow">
        The <span className="text-highlight">#1 dLottery</span><br />
        for Real Blockchain Winners
      </h1>
      <p className="text-xl md:text-2xl max-w-2xl mx-auto text-accent font-medium mb-10 drop-shadow">
        JackMint is where luck meets blockchain! Enter for a chance to win every interval, powered by Chainlink VRF for transparent, provable fairness.
      </p>
      <a
        href="#stats"
        className="bg-highlight text-primary px-8 py-4 rounded-xl text-lg font-bold shadow-xl hover:bg-accent transition-all duration-200 scale-105 hover:scale-110 inline-block animate-bounce"
      >
        Enter Now
      </a>
      {/* Fun animated "ticket" SVG */}
      <div className="mt-8 flex justify-center">
        <svg width="120" height="60" viewBox="0 0 120 60" fill="none" className="animate-float">
          <rect x="10" y="10" width="100" height="40" rx="10" fill="#8e6cff" />
          <circle cx="20" cy="20" r="3" fill="#00f5d4" />
          <circle cx="100" cy="40" r="3" fill="#00f5d4" />
          <text x="60" y="40" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="18">🎟️</text>
        </svg>
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-14px);}
        }
        .animate-float { animation: float 2.5s ease-in-out infinite; }
      `}</style>
    </section>
  );
}