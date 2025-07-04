# 🎰 JackMint - Decentralized Lottery

JackMint is a decentralized, verifiably fair lottery smart contract built with **Solidity** and **Foundry**. It uses **Chainlink VRF v2.5** and **Chainlink Automation** for randomness and is designed for deployment across both local networks and public testnets.

[![Contributors](https://img.shields.io/github/contributors/gittyShiv/JackMint.svg?style=for-the-badge)](https://github.com/gittyShiv/JackMint/graphs/contributors)
[![Forks](https://img.shields.io/github/forks/gittyShiv/JackMint.svg?style=for-the-badge)](https://github.com/gittyShiv/JackMint/network/members)
[![Stargazers](https://img.shields.io/github/stars/gittyShiv/JackMint.svg?style=for-the-badge)](https://github.com/gittyShiv/JackMint/stargazers)
[![License](https://img.shields.io/github/license/gittyShiv/JackMint.svg?style=for-the-badge)](https://github.com/gittyShiv/JackMint/blob/main/LICENSE)

---

## 📖 About The Project

JackMint is a decentralized lottery DApp that ensures fairness through verifiable randomness powered by Chainlink VRF v2.5. Users can participate in recurring lotteries by entering with a fixed ETH fee. The contract randomly selects a winner and automates upkeep using Chainlink Automation.

---

## 🎯 Features

- Fair winner selection using **Chainlink VRF v2.5**
- Support for both local testing (with mocks) and Sepolia testnet
- Automated winner picking using **Chainlink Automation**
- Robust Foundry-based test suite
- Supports mocking, subscription creation, and consumer management in local Anvil setups

---

## 🧰 Built With

- Solidity  
- Foundry (Forge, Cast, Anvil)  
- Chainlink VRF v2.5 & Automation  
- Chainlink Brownie Contracts (mock support)  
- Sepolia Testnet  
- dotenv for environment configuration

---

## 🛠️ Getting Started

### ✅ Prerequisites

Make sure the following are installed:

- [Foundry](https://book.getfoundry.sh/getting-started/installation)
- Node.js & npm (optional for frontend integration)

### 📥 Installation

```bash
git clone https://github.com/gittyShiv/JackMint.git
cd JackMint
forge install
```

---

## ⚙️ Usage

### 🔁 Local Development

Start a local blockchain node with Anvil:

```bash
anvil
```

In a separate terminal, deploy contracts locally:

```bash
forge script script/DeployRaffle.s.sol:DeployRaffle --rpc-url http://127.0.0.1:8545 --broadcast --private-key <PRIVATE_KEY>
```

This sets up:
- Local mock VRFCoordinatorV2_5
- LINK token mock
- A new subscription ID
- Adds Raffle contract as consumer

---

### 🧪 Run Tests

```bash
forge test -vv
```

### ⛽ Gas Reports

```bash
forge test --gas-report
```

---

## 🌐 Deployment to Sepolia

### 🔐 Set up `.env`

Create a `.env` file in the root directory with the following:

```ini
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=your_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### 🚀 Deploy

```bash
forge script script/DeployRaffle.s.sol:DeployRaffle \
  --rpc-url $SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --verify
```

> Automatically creates Chainlink VRF subscription and adds the deployed contract as a consumer.

---

## 🔁 Chainlink Automation Setup

- Go to [automation.chain.link](https://automation.chain.link/)
- Register a new upkeep
- Set your deployed contract address
- Select `Custom Logic` trigger
- Configure interval same as `automationUpdateInterval`

---

## 🧰 Scripts

Interact via Cast or make targets:

```bash
make deploy
make createSubscription
make addConsumer
```

Manually enter raffle:

```bash
cast send <RAFFLE_CONTRACT> "enterRaffle()" --value 0.01ether --private-key $PRIVATE_KEY --rpc-url $SEPOLIA_RPC_URL
```

---

## 🛣️ Roadmap

- [x] Chainlink VRF V2.5 integration  
- [x] Local mocks for testing  
- [x] Subscription auto-creation  
- [ ] Frontend DApp with live winner dashboard  
- [ ] Countdown timer for next draw  
- [ ] UI integration with PoolTogether-inspired design  

---

## 🤝 Contributing

Contributions are welcome!

```bash
git checkout -b feature/AmazingFeature
git commit -m "Add AmazingFeature"
git push origin feature/AmazingFeature
```

Then open a PR.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more details.

---

## 📬 Contact

**Shivam Maurya**  
📧 shivamvision07@gmail.com  
🔗 [JackMint GitHub Repo](https://github.com/gittyShiv/JackMint)
