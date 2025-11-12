🚀 IPFS File Hasher

A decentralized application for secure file verification and distributed storage using blockchain technology.

🔒 Features

File Hashing – Generate SHA-256 hashes with automatic timestamp and geo-tagging

IPFS Storage – Upload files to the InterPlanetary File System (IPFS) for distributed storage

Blockchain Verification – Submit file hashes for immutable proof of ownership

Media Authentication – Verify file authenticity and retrieve associated metadata

Interactive ChatBot – Get instant help and usage guidance directly on the platform

🧠 Technology Stack

⚛️ React 18+ with TypeScript

⚡ Vite for build tooling

🎨 TailwindCSS for styling

🔗 Ethers.js for blockchain interaction

🌐 IPFS for distributed file storage

🧩 Radix UI components

🪶 Lucide React icons

⚙️ Getting Started
1. Clone the Repository
git clone https://github.com/your-username/ipfs-file-hasher.git
cd ipfs-file-hasher

2. Install Dependencies
npm install

3. Setup Environment Variables

Create a .env file in the project root:

VITE_CONTRACT_ADDRESS=your_contract_address

4. Run the Development Server
npm run dev

💡 Usage
🔗 Connect Wallet

Use MetaMask to connect your wallet to the blockchain network.

📁 Upload Files

Select a file to generate its SHA-256 hash

Automatic timestamp and geolocation tagging

Upload the file to the IPFS network

✅ Verify Media

Enter a file hash to verify its authenticity

View complete metadata, including timestamp and location

Access the original file directly via IPFS

📂 Project Structure
src/
 ├── components/     # Reusable UI components
 ├── pages/          # Page-level components
 ├── styles/         # Global and theme styles
 └── main.tsx        # Application entry point

⚠️ Important Note

This is a demonstration project.
For production deployment:

Connect to real MetaMask wallets and blockchain networks

Implement SHA-256 hashing using the Web Crypto API

Integrate with IPFS nodes for actual file storage

Deploy smart contracts for on-chain verification

Add robust error handling and security mechanisms

📜 License

MIT License
