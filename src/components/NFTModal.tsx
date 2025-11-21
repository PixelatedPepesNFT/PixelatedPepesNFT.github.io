interface NFTModalProps {
  nft: { name: string; image: string; attributes: { trait_type: string; value: string }[] } | null;
  onClose: () => void;
}

export default function NFTModal({ nft, onClose }: NFTModalProps) {
  if (!nft) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="bg-gray-900 p-6 rounded-xl max-w-md w-full relative" onClick={e => e.stopPropagation()}>
        <button className="absolute top-2 right-2 text-white text-xl font-bold" onClick={onClose}>&times;</button>
        <img src={nft.image} className="rounded-lg w-full mb-4" />
        <h2 className="text-xl font-bold mb-2">{nft.name}</h2>
        <div className="grid grid-cols-2 gap-2">
          {nft.attributes.map(attr => (
            <div key={attr.trait_type} className="bg-gray-800 p-2 rounded">
              <p className="text-xs text-gray-400">{attr.trait_type}</p>
              <p className="text-sm">{attr.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
