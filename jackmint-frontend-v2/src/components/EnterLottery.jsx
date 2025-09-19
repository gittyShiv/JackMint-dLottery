import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import jackmintAbi from "../abi/jackmintAbi.json";

const CONTRACT_ADDRESS = "0x8478f62440c0be8722f20b8804170113a5535b09"; // <-- replace this!

export default function EnterLottery() {
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [txStatus, setTxStatus] = useState(null);

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      setAccount(window.ethereum.selectedAddress);
    }
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", accounts => {
        setAccount(accounts[0] || null);
      });
    }
  }, []);

  function handleInput(e) {
    // Only allow valid ETH number, and up to 6 decimals
    let val = e.target.value.replace(/[^0-9.]/g, "");
    if (val.split(".")[1]?.length > 6) {
      val = val.slice(0, val.indexOf(".") + 7);
    }
    setAmount(val);
  }

  async function enterLottery() {
    if (!window.ethereum) return setTxStatus({ type: "error", msg: "Wallet not connected" });
    if (!amount || isNaN(amount) || Number(amount) < 0.001) {
      setTxStatus({ type: "error", msg: "Minimum entry is 0.001 ETH" });
      return;
    }
    setLoading(true);
    setTxStatus(null);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, jackmintAbi.abi, signer);
      const tx = await contract.enterJackMint({ value: ethers.parseEther(amount) });
      await tx.wait();
      setTxStatus({ type: "success", msg: "Successfully entered the lottery!" });
      setAmount("");
    } catch (e) {
      setTxStatus({ type: "error", msg: e.reason || e.message || "Transaction failed" });
    }
    setLoading(false);
  }

  return (
    <section className="flex flex-col items-center justify-center mt-10 mb-8">
      <div className="bg-accent/10 rounded-2xl shadow-2xl px-10 py-8 flex flex-col items-center w-full max-w-md">
        <h2 className="text-3xl font-bold text-accent mb-2">Enter the Lottery</h2>
        <div className="mb-6 text-text/80">
          <span>Enter any amount <span className="font-mono text-accent">≥ 0.001 ETH</span></span>
        </div>
        <input
          type="number"
          min="0.001"
          step="0.000001"
          placeholder="Amount in ETH"
          value={amount}
          onChange={handleInput}
          className="mb-4 w-full rounded-lg px-4 py-2 border border-accent bg-primary text-text font-mono text-lg focus:outline-none focus:ring-2 focus:ring-accent transition"
          disabled={loading}
        />
        <button
          disabled={loading || !account}
          onClick={enterLottery}
          className={`w-full px-6 py-3 rounded-xl font-bold text-lg shadow-lg transition-all
            ${account ? "bg-highlight text-primary hover:bg-accent" : "bg-gray-400 text-gray-600 cursor-not-allowed"}
            ${loading ? "opacity-60" : ""}
          `}
        >
          {loading ? "Processing..." : account ? "Enter Now" : "Connect Wallet"}
        </button>
        {txStatus && (
          <div className={`mt-4 px-4 py-2 rounded-lg text-center font-bold 
            ${txStatus.type === "success" ? "bg-green-500/20 text-green-400" : "bg-red-600/20 text-red-400"}
          `}>
            {txStatus.msg}
          </div>
        )}
        {!account && (
          <div className="mt-2 text-sm text-red-400">Please connect your wallet first.</div>
        )}
      </div>
    </section>
  );
}
