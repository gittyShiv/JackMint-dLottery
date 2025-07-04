import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Countdown from "react-countdown";
import jackMintAbi from "../constants/abi.json";

const JACKMINT_ADDRESS = "0x8478F62440c0BE8722f20B8804170113A5535B09";

const App = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [entranceFee, setEntranceFee] = useState("");
  const [playerCount, setPlayerCount] = useState(0);
  const [recentWinner, setRecentWinner] = useState("");
  const [lastTimeStamp, setLastTimeStamp] = useState(0);
  const [interval, setInterval] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(JACKMINT_ADDRESS, jackMintAbi.abi, signer);
      const accounts = await provider.listAccounts();
      setProvider(provider);
      setSigner(signer);
      setContract(contract);
      setAccount(accounts[0]);
    };
    init();
  }, []);

  useEffect(() => {
    if (!contract) return;
    fetchDetails();
  }, [contract]);

  const fetchDetails = async () => {
    const fee = await contract.getEntranceFee();
    const players = await contract.getNumberOfPlayers();
    const winner = await contract.getRecentWinner();
    const lastTs = await contract.getLastTimeStamp();
    const interv = await contract.getInterval();
    setEntranceFee(ethers.utils.formatEther(fee));
    setPlayerCount(players.toNumber());
    setRecentWinner(winner);
    setLastTimeStamp(lastTs.toNumber());
    setInterval(interv.toNumber());
  };

  const enterJackMint = async () => {
    if (!contract || !signer) return;
    try {
      setLoading(true);
      const tx = await contract.enterJackMint({ value: ethers.utils.parseEther(entranceFee) });
      await tx.wait();
      fetchDetails();
      alert("🎉 You have successfully entered the lottery!");
    } catch (err) {
      alert("❌ Transaction failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) return <span>🎯 Winner selection in progress...</span>;
    return <span>{hours}h {minutes}m {seconds}s</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1d0b46] to-[#3c1874] text-white flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 border-b border-purple-600">
        <h1 className="text-2xl font-bold">🎰 JackMint Lottery</h1>
        <div>{account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Not connected"}</div>
      </header>

      {/* Hero */}
      <section className="text-center py-12 px-4">
        <h2 className="text-4xl font-bold mb-4">Win Big. Play Fair. Powered by Chainlink VRF.</h2>
        <p className="text-lg max-w-2xl mx-auto mb-6">Every 30 seconds, one lucky winner is randomly selected using provably fair Chainlink randomness. No loss, no gamble, only glory.</p>
        <button
          onClick={enterJackMint}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full text-lg font-semibold transition disabled:opacity-50"
        >
          {loading ? "Joining..." : `Enter Lottery (${entranceFee} ETH)`}
        </button>
      </section>

      {/* Countdown and Stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 px-8 py-12 bg-[#27124a] text-center">
        <div>
          <p className="text-lg">🎯 Next Draw In</p>
          <p className="text-2xl font-bold">
            <Countdown date={(lastTimeStamp + interval) * 1000} renderer={renderer} />
          </p>
        </div>
        <div>
          <p className="text-lg">👥 Players</p>
          <p className="text-2xl font-bold">{playerCount}</p>
        </div>
        <div>
          <p className="text-lg">🏆 Last Winner</p>
          <p className="text-sm break-all">{recentWinner}</p>
        </div>
        <div>
          <p className="text-lg">🎟️ Ticket Price</p>
          <p className="text-2xl font-bold">{entranceFee} ETH</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto px-8 py-4 border-t border-purple-600 text-sm text-center text-gray-400">
        JackMint © {new Date().getFullYear()} | Powered by Chainlink VRF + Foundry + Ethers.js
      </footer>
    </div>
  );
};

export default App;
