import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import jackmintAbi from "../abi/jackmintAbi.json";

const CONTRACT_ADDRESS = "0x8478f62440c0be8722f20b8804170113a5535b09";

// Helper component to truncate long addresses with ellipsis and tooltip
function TruncatedAddress({ address }) {
  if (!address) return "—";
  return (
    <span
      className="inline-block max-w-[180px] sm:max-w-[260px] overflow-hidden text-ellipsis whitespace-nowrap align-middle"
      title={address}
    >
      {address}
    </span>
  );
}

export default function WinnersDashboard() {
  const [recentWinner, setRecentWinner] = useState(null);
  const [players, setPlayers] = useState([]);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const getAccount = async () => {
      if (window.ethereum && window.ethereum.selectedAddress) {
        setAccount(window.ethereum.selectedAddress);
      }
    };
    getAccount();
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", accounts => {
        setAccount(accounts[0] || null);
      });
    }
  }, []);

  useEffect(() => {
    async function fetchWinners() {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, jackmintAbi.abi, provider);
      try {
        const winner = await contract.getRecentWinner();
        setRecentWinner(winner);
        const numPlayers = await contract.getNumberOfPlayers();
        const _players = [];
        for (let i = 0; i < numPlayers; ++i) {
          const addr = await contract.getPlayer(i);
          _players.push(addr);
        }
        setPlayers(_players);
      } catch {}
    }
    fetchWinners();
    const interval = setInterval(fetchWinners, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="winners"
      className="py-20 px-4 md:px-0 flex flex-col items-center bg-gradient-to-br from-card via-primary/80 to-card min-h-[40vh]"
    >
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-highlight mb-6">Dashboard</h2>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl items-start">
        {/* Winner Panel */}
        <div className="bg-accent/10 rounded-2xl shadow-lg p-8 flex-1 min-w-[240px]">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🏆</span>
            <span className="font-bold text-accent text-lg">Most Recent Winner</span>
          </div>
          <div className="text-lg font-mono text-text break-all">
            <TruncatedAddress address={recentWinner} />
          </div>
        </div>
        {/* Player List Panel */}
        <div className="bg-accent/10 rounded-2xl shadow-lg p-8 flex-1 min-w-[240px]">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🎟️</span>
            <span className="font-bold text-accent text-lg">Current Players</span>
          </div>
          <ul className="space-y-2">
            {players.length === 0 ? (
              <li className="text-text/70 italic">No players yet</li>
            ) : (
              players.map((p, i) => (
                <li key={i} className="font-mono text-sm text-text/90">
                  <TruncatedAddress address={p} />
                </li>
              ))
            )}
          </ul>
        </div>
        {/* Account Panel */}
        <div className="bg-accent/10 rounded-2xl shadow-lg p-8 flex-1 min-w-[260px]">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">👤</span>
            <span className="font-bold text-accent text-lg">My Account</span>
          </div>
          <div className="text-base text-text font-mono break-all">
            <TruncatedAddress address={account} />
          </div>
        </div>
      </div>
    </section>
  );
}