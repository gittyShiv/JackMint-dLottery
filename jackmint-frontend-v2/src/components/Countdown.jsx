import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import jackmintAbi from "../abi/jackmintAbi.json";

const CONTRACT_ADDRESS = "0x8478f62440c0be8722f20b8804170113a5535b09"; // <-- SET THIS

export default function Countdown() {
  const [interval, setIntervalTime] = useState(null);
  const [lastTime, setLastTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  // Get the interval and last timestamp from the contract
  useEffect(() => {
    async function fetchCountdown() {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, jackmintAbi.abi, provider);
      try {
        const _interval = await contract.getInterval();
        const _last = await contract.getLastTimeStamp();
        setIntervalTime(Number(_interval));
        setLastTime(Number(_last));
      } catch {}
    }
    fetchCountdown();
  }, []);

  // Calculate time left
  useEffect(() => {
    if (!interval || !lastTime) return;
    const update = () => {
      const now = Math.floor(Date.now() / 1000);
      let left = (lastTime + interval) - now;
      if (left < 0) left = 0;
      setTimeLeft(left);
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [interval, lastTime]);

  function formatTime(seconds) {
    if (seconds == null) return "--:--:--";
    const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  }

  return (
    <section className="flex flex-col items-center justify-center my-10">
      <div className="text-3xl md:text-4xl font-bold text-highlight mb-2 animate-pulse">Next Draw In</div>
      <div className="bg-accent/20 px-10 py-3 rounded-2xl text-4xl font-mono text-accent shadow-lg flex gap-2 tracking-widest animate-float">
        {formatTime(timeLeft)}
      </div>
      <style>{`
        .animate-float { animation: float 2.5s ease-in-out infinite; }
      `}</style>
    </section>
  );
}