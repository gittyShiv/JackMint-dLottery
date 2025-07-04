import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

export default function WalletConnect() {
  const [account, setAccount] = useState(null);
  const [web3Modal, setWeb3Modal] = useState(null);

  useEffect(() => {
    // Initialize Web3Modal on mount
    const w3m = new Web3Modal({
      cacheProvider: true,
    });
    setWeb3Modal(w3m);

    // Auto-connect if previously connected
    if (w3m.cachedProvider) {
      connectWallet(w3m);
    }
    // Listen for account change
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0] || null);
      });
    }
    // Cleanup
    return () => {
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener("accountsChanged", () => {});
      }
    };
    // eslint-disable-next-line
  }, []);

  async function connectWallet(w3mInstance = web3Modal) {
    try {
      const instance = await (w3mInstance || web3Modal).connect();
      const provider = new ethers.BrowserProvider(instance);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
    } catch (e) {
      alert("Wallet connection cancelled or failed.");
    }
  }

  async function disconnectWallet() {
    if (web3Modal) {
      await web3Modal.clearCachedProvider();
    }
    setAccount(null);
  }

  return account ? (
    <button
      onClick={disconnectWallet}
      className="bg-accent text-primary px-4 py-2 rounded-lg font-bold shadow hover:bg-highlight transition-colors"
      title={account}
    >
      {account.slice(0, 6)}...{account.slice(-4)}
    </button>
  ) : (
    <button
      onClick={() => connectWallet()}
      className="bg-highlight text-primary px-4 py-2 rounded-lg font-bold shadow hover:bg-accent transition-colors animate-bounce"
    >
      Connect Wallet
    </button>
  );
}