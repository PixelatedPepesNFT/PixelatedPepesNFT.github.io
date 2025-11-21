interface FilterBarProps {
  traits: Record<string, string[]>;
  filters: Record<string, string>;
  setFilters: (filters: Record<string, string>) => void;
  search: string;
  setSearch: (s: string) => void;
}

export default function FilterBar({ traits, filters, setFilters, search, setSearch }: FilterBarProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-6xl mx-auto">
      <input
        className="w-full p-3 rounded-xl bg-gray-800 text-white"
        placeholder="Search NFT name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {Object.keys(traits).map((traitType) => (
        <select
          key={traitType}
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={filters[traitType] || ""}
          onChange={(e) => setFilters({ ...filters, [traitType]: e.target.value })}
        >
          <option value="">All {traitType}</option>
          {traits[traitType].map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      ))}
    </div>
  );
}
