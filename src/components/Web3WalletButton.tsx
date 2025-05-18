/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wallet } from "lucide-react";
import { Button } from "./ui/Button";
import { useAuth } from "../context/AuthProvider";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const Web3WalletButton: React.FC = () => {
//   const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setWalletAddress,walletAddress } = useAuth()

  const connectWallet = async () => {
    setConnecting(true);
    setError(null);

    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts && accounts[0]) {
          setWalletAddress(accounts[0]);
          
          // Simple animation: wait 1s, then redirect
          setTimeout(() => {
            navigate("/auth/login");
          }, 1000);
        }
      } catch (err: any) {
        setError("Wallet connection failed");
        console.log({ err });
      }
    } else {
      setError("MetaMask not detected. Please install a Web3 wallet.");
    }
    setConnecting(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 animate-fade-in">
      <Button
        variant="default"
        size="lg"
        onClick={connectWallet}
        disabled={connecting || !!walletAddress}
        className="hover-scale w-64"
      >
        <Wallet className="mr-2" />
        {walletAddress
          ? "Wallet Connected!"
          : connecting
          ? "Connecting..."
          : "Connect Wallet"}
      </Button>
      {walletAddress && (
        <div className="text-sm text-green-600 animate-fade-in">
          Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </div>
      )}
      {error && <div className="text-red-500 text-xs">{error}</div>}
    </div>
  );
};

export default Web3WalletButton;
