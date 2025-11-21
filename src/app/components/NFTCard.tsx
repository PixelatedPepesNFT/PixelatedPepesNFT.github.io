interface NFTCardProps {
  name: string;
  image: string;
}

export default function NFTCard({ name, image }: NFTCardProps) {
  return (
    <div className="bg-gray-900 p-2 rounded-lg hover:scale-105 transition transform">
      <img src={image} className="rounded-lg w-full" />
      <p className="mt-2 text-center text-sm">{name}</p>
    </div>
  );
}
