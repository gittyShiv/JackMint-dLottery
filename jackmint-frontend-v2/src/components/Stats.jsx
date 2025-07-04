import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import jackmintAbi from "../abi/jackmintAbi.json";

const CONTRACT_ADDRESS = "0x8478f62440c0be8722f20b8804170113a5535b09"; // <-- SET THIS

export default function Stats() {
  const [entranceFee, setEntranceFee] = useState(null);
  const [players, setPlayers] = useState(0);
  const [recentWinner, setRecentWinner] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, jackmintAbi.abi, provider);
      try {
        const fee = await contract.getEntranceFee();
        setEntranceFee(ethers.formatEther(fee));
        const numPlayers = await contract.getNumberOfPlayers();
        setPlayers(Number(numPlayers));
        const winner = await contract.getRecentWinner();
        setRecentWinner(winner);
      } catch (e) {
        // fail silently for now
      }
    }
    fetchStats();
    const interval = setInterval(fetchStats, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="stats" className="relative z-10 py-14 bg-gradient-to-br from-card via-primary/80 to-card shadow-lg rounded-xl mx-4 md:mx-24 mt-[-3rem] mb-12">
      <div className="flex flex-col md:flex-row justify-center items-center gap-10">
        <StatCard label="Entrance Fee" value={entranceFee ? `${entranceFee} ETH` : "—"} icon="💸" />
        <StatCard label="Players" value={players} icon="🧑‍🤝‍🧑" />
        <StatCard label="Last Winner" value={recentWinner ? recentWinner.slice(0, 6) + "..." + recentWinner.slice(-4) : "—"} icon="🏆" />
      </div>
    </section>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-accent/10 border border-accent/30 rounded-2xl px-8 py-6 flex flex-col items-center shadow-lg min-w-[150px]">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-lg font-bold text-accent mb-1">{value}</div>
      <div className="text-sm text-text">{label}</div>
    </div>
  );
}