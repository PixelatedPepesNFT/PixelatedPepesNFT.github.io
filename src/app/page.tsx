"use client";

import { useEffect, useState } from "react";
import NFTCard from "../components/NFTCard";
import FilterBar from "../components/FilterBar";
import Link from "next/link";
import { FaTwitter, FaDiscord } from "react-icons/fa";

interface NFT {
  id: number;
  name: string;
  image: string;
  attributes: { trait_type: string; value: string }[];
}

export default function Page() {
  const [data, setData] = useState<NFT[]>([]);
  const [visible, setVisible] = useState(30);
  const [search, setSearch] = useState("");
  const [traits, setTraits] = useState<Record<string, string[]>>({});
  const [filters, setFilters] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/merged.json")
      .then(res => res.json())
      .then((json: NFT[]) => {
        setData(json);
        extractTraits(json);
      });
  }, []);

  const extractTraits = (json: NFT[]) => {
    const traitMap: Record<string, Set<string>> = {};
    json.forEach(nft => {
      nft.attributes.forEach(attr => {
        if (!traitMap[attr.trait_type]) traitMap[attr.trait_type] = new Set();
        traitMap[attr.trait_type].add(attr.value);
      });
    });
    const finalMap: Record<string, string[]> = {};
    Object.keys(traitMap).forEach(t => finalMap[t] = Array.from(traitMap[t]));
    setTraits(finalMap);
  };

  const filteredData = data.filter(item => {
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    for (const traitType in filters) {
      if (filters[traitType] && !item.attributes.some(a => a.trait_type === traitType && a.value === filters[traitType])) return false;
    }
    return true;
  });

  const loadMore = () => setVisible(prev => prev + 30);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#1e2331] to-black text-white font-sans">

      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-6 lg:px-20 py-4 shadow-lg bg-[rgba(18,22,32,0.98)] mb-8 sticky top-0 z-20">
        <div className="flex items-center gap-2">
          
          <span className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white drop-shadow-lg">lilderpy</span>
        </div>
        <div className="flex gap-2 items-center">
          <a href="https://gamma.io/ordinals/collections/cmi7w3etf0001jr04f1ezr6h7/items" target="_blank" rel="noopener noreferrer"
            className="bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-lg font-semibold shadow hover:from-green-400 hover:to-emerald-500 transition">
            Mint
          </a>

          <a href="https://x.com/lilderpybtc" target="_blank" rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-500 transition rounded-lg p-2 flex items-center">
            <FaTwitter />
          </a>
        </div>
      </nav>

      {/* Hero / Info */}
      <section className="max-w-4xl mx-auto text-center mb-14 px-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
          Welcome to <span className="bg-gradient-to-r from-emerald-400 to-sky-400 text-transparent bg-clip-text">lilderpybtc</span> NFT Collection
        </h1>
        <p className="text-gray-200 text-lg mb-7">
          Discover rare and unique NFTs from the <span className="text-emerald-300 font-semibold">lilderpybtc</span> collection. 
          Use filters to find your favorite traits and dive into NFT rarity!
        </p>
      </section>

      {/* Filters */}
      <FilterBar 
        traits={traits} 
        filters={filters} 
        setFilters={setFilters} 
        search={search} 
        setSearch={setSearch} 
      />

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-7xl mx-auto px-2">
        {filteredData.slice(0, visible).map(nft => (
          <Link key={nft.id} href={`/nft/${nft.id}`}>
            <NFTCard name={nft.name} image={nft.image} />
          </Link>
        ))}
      </div>

      {/* Load More */}
      {visible < filteredData.length && (
        <div className="text-center mt-10">
          <button onClick={loadMore}
            className="px-8 py-3 text-lg bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl font-semibold hover:from-blue-500 hover:to-purple-500 transition">
            Load More
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full text-gray-400 text-sm text-center border-t border-gray-800 mt-24 py-6 bg-[#181C23]">
        © {new Date().getFullYear()} lilderpybtc Collection. All rights reserved.
      </footer>

    </div>
  );
}