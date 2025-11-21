import React from "react";

interface NFTCardProps {
  name: string;
  image: string;
}

const NFTCard: React.FC<NFTCardProps> = ({ name, image }) => (
  <div className="bg-[#181C23] rounded-2xl overflow-hidden shadow-md flex flex-col items-center p-4 border border-gray-800 hover:scale-105 transition-transform cursor-pointer">
    <img
      src={image}
      alt={name}
      className="rounded-xl w-full h-40 object-cover mb-3 bg-black"
      loading="lazy"
    />
    <span className="font-bold text-lg text-white text-center mb-1 truncate w-full">{name}</span>
  </div>
);

export default NFTCard;