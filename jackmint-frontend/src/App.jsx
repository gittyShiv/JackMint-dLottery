import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import jackMintAbi from "./constants/abi.json";

const JACKMINT_ADDRESS = "0x8478f62440c0be8722f20b8804170113a5535b09";

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [entranceFee, setEntranceFee] = useState("");
  const [playerCount, setPlayerCount] = useState(0);
  const [lastWinner, setLastWinner] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      const modal = new Web3Modal();
      const instance = await modal.connect();
      const prov = new ethers.providers.Web3Provider(instance);
      const signer = prov.getSigner();
      const contract = new ethers.Contract(JACKMINT_ADDRESS, jackMintAbi.abi, signer);
      const accounts = await prov.listAccounts();

      setProvider(prov);
      setSigner(signer);
      setContract(contract);
      setAccount(accounts[0]);
    };

    init();
  }, []);

  useEffect(() => {
    if (!contract) return;
    fetchContractData();
    const interval = setInterval(fetchContractData, 30000);
    return () => clearInterval(interval);
  }, [contract]);

  const fetchContractData = async () => {
    const fee = await contract.getEntranceFee();
    const players = await contract.getNumberOfPlayers();
    const winner = await contract.getRecentWinner();
    setEntranceFee(ethers.utils.formatEther(fee));
    setPlayerCount(players.toNumber());
    setLastWinner(winner);
  };

  const enterJackMint = async () => {
    if (!contract || !signer) return;
    try {
      setLoading(true);
      const tx = await contract.enterJackMint({ value: ethers.utils.parseEther(entranceFee) });
      await tx.wait();
      alert("You have successfully entered the lottery!");
      fetchContractData();
    } catch (err) {
      alert("Transaction failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">🎰 JackMint Lottery</h1>
      <p className="mb-2">Connected Wallet: {account}</p>
      <div className="bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-md">
        <p>🎟️ Entrance Fee: <strong>{entranceFee} ETH</strong></p>
        <p>👥 Players Entered: <strong>{playerCount}</strong></p>
        <p>🏆 Last Winner: <strong>{lastWinner}</strong></p>
        <button
          onClick={enterJackMint}
          disabled={loading}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-xl disabled:opacity-50"
        >
          {loading ? "Entering..." : "Enter JackMint"}
        </button>
      </div>
    </div>
  );
}

export default App;
