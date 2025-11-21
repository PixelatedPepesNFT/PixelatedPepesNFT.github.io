"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaDiscord, FaTwitter, FaRegCopy, FaRegUserCircle } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

interface NFT {
  id: number;
  name: string;
  description?: string;
  image: string;
  attributes: { trait_type: string; value: string }[];
}

export default function NFTDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [nft, setNFT] = useState<NFT | null>(null);

  const collectionName = "lilderpybtc";
  const owner = "lilderpybtc";
  // Use a type guard to prevent type error
  const id = typeof params.id === "string" ? parseInt(params.id) : undefined;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/merged.json")
      .then((res) => res.json())
      .then((data: NFT[]) => {
        const nftData = data.find((n) => n.id === id);
        setNFT(nftData || null);
      });
  }, [id]);

  const handleComingSoon = (platform: string) => {
    alert(`${platform} coming soon! 🚀`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  };

  if (!nft)
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black text-xl">
        Loading NFT...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#111] text-white">
      {/* Navbar */}
      <nav className="w-full bg-[#181C23] p-4 flex justify-between items-center shadow">
        <h1
          className="text-2xl font-extrabold tracking-tight cursor-pointer hover:text-green-400 transition"
          onClick={() => router.push("/")}
        >
          {collectionName}
        </h1>
        <div className="flex gap-2 items-center">
          <a
            href="https://gamma.io/ordinals/collections/cmi7w3etf0001jr04f1ezr6h7/items"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 px-4 py-2 rounded font-bold shadow hover:bg-emerald-500 transition text-white"
          >
            Mint
          </a>
          <a
            href="https://x.com/lilderpybtc"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 px-4 py-2 rounded shadow font-bold hover:bg-blue-500 transition flex items-center gap-1"
          >
            <FaTwitter className="inline" /> Twitter
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 px-4 md:px-10 py-12">
        {/* Left: NFT Image + Basic Info */}
        <div className="flex-1 flex flex-col items-center">
          <div className="bg-[#222] rounded-2xl overflow-hidden shadow-2xl w-full max-w-md border border-gray-700 p-3">
            <img
              src={nft.image}
              alt={nft.name}
              className="rounded-xl w-full object-cover aspect-square border-2 border-[#242f42]"
            />
          </div>
          <div className="bg-[#181C23] w-full max-w-md rounded-xl mt-5 p-4 shadow flex flex-col gap-3">
            <div className="flex items-center gap-2 text-gray-400">
              Collection: <span className="text-white font-semibold">{collectionName}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegUserCircle className="text-xl text-gray-400" />
              <span className="text-gray-300">Owner:</span>
              <span className="text-white font-semibold">{owner}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-300">Token ID:</span>
              <span className="text-white font-mono">{id}</span>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <a href="https://discord.com/invite/your-link" target="_blank" rel="noopener noreferrer"
              className="bg-[#5865F2] hover:bg-[#4854bb] transition rounded-lg p-2 flex items-center gap-1">
              <FaDiscord /> Discord
            </a>
            <button
              className="bg-[#222] hover:bg-[#222c2c] transition rounded-lg p-2 flex items-center gap-1 border border-gray-600"
              onClick={handleCopy}
            >
              <FaRegCopy /> {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>

        {/* Right: Details and Interaction */}
        <div className="flex-[1.2] flex flex-col gap-8">
          {/* Title and Description */}
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight">{nft.name}</h2>
            <p className="text-gray-300 text-lg mt-2">{nft.description}</p>
          </div>

          {/* Attributes */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Attributes</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {nft.attributes.map((attr, idx) => (
                <div
                  key={idx}
                  className="bg-[#1b222d] p-4 rounded-lg flex flex-col items-start gap-2 shadow hover:bg-[#23304c] transition border border-[#242f42]"
                >
                  <span className="text-xs text-gray-400">{attr.trait_type}</span>
                  <span className="text-base font-semibold">{attr.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Marketplace Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => handleComingSoon("OKX")}
              className="bg-blue-600 px-5 py-2 rounded shadow-lg hover:bg-blue-500 transition font-semibold"
            >
              OKX
            </button>
            <button
              onClick={() => handleComingSoon("Magic Eden")}
              className="bg-purple-600 px-5 py-2 rounded shadow-lg hover:bg-purple-500 transition font-semibold"
            >
              Magic Eden
            </button>
          </div>

          {/* Share */}
          <div className="flex gap-4 pt-4 items-center">
            <a href="https://x.com/intent/post?text=Checkout%20this%20NFT!%20" target="_blank"
                className="bg-blue-600 hover:bg-blue-500 p-3 rounded-lg flex items-center gap-1">
              <FaTwitter /> Share
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}