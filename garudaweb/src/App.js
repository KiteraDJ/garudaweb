import React, { useState } from "react";
import { ethers } from "ethers";
import "./App.css";

function App() {
    const [minted, setMinted] = useState(false);
    const [loading, setLoading] = useState(false);

    const mintNFT=async () => {
        try {
            setLoading(true);
            // Connect to Ethereum provider
            const provider=new ethers.providers.Web3Provider(window.ethereum);
            // Request access to user's Ethereum account
            await window.ethereum.enable();
            // Get the signer (current user)
            const signer=provider.getSigner();
            // Load the smart contract
            const contractAddress="CONTRACT_ADDRESS"; // Replace with your deployed contract address
            const contractABI=[
                // Add the contract's ABI here
            ];
            const contract=new ethers.Contract(contractAddress, contractABI, signer);
            // Call the mintNFT function on the contract
            const tx=await contract.mintNFT(signer.getAddress(), "TOKEN_URI");
            // Wait for the transaction to be mined
            await tx.wait();
            setMinted(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <h1>Garuda NFT Mint Website</h1>
            {minted ? (
                <p>Congratulations! Your NFT has been minted.</p>
            ) : (
                <button onClick={mintNFT} >
                    {loading ? "Minting..." : "Mint NFT"}
                </button>
            )}
        </div>
    );
}

export default App;