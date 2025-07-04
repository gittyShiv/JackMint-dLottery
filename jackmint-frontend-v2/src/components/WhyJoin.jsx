import React from "react";

export default function WhyJoin() {
  return (
    <section
      id="why"
      className="bg-gradient-to-br from-primary via-card/80 to-primary py-20 px-4 md:px-0 min-h-[50vh] flex flex-col items-center"
      style={{ scrollSnapAlign: "start" }}
    >
      <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-accent drop-shadow">Why Join JackMint?</h2>
      <div className="flex flex-col md:flex-row gap-10 max-w-5xl w-full justify-center">
        <WhyCard
          icon="🔒"
          title="Provable Fairness"
          text="Every draw is powered by Chainlink VRF, guaranteeing randomness and transparency."
        />
        <WhyCard
          icon="⚡"
          title="Fast & Exciting"
          text="Draws happen automatically at intervals. No need to wait for admins or get stuck in limbo."
        />
        <WhyCard
          icon="🌍"
          title="Decentralized"
          text="Anyone can join, anytime, from anywhere. No sign-up, no KYC, just connect and play!"
        />
      </div>
      <div className="mt-12 text-lg text-text/80 max-w-2xl mx-auto">
        <strong>JackMint</strong> is inspired by the best of blockchain lotteries and premium dApps—no rug pulls, just pure fun and real chances to win.
      </div>
    </section>
  );
}

function WhyCard({ icon, title, text }) {
  return (
    <div className="bg-accent/10 border border-accent/20 rounded-2xl p-8 flex flex-col items-center w-full md:w-72 shadow-xl transition-transform hover:scale-105 hover:bg-accent/20">
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-xl font-bold text-accent mb-1">{title}</div>
      <div className="text-base text-text text-center">{text}</div>
    </div>
  );
}