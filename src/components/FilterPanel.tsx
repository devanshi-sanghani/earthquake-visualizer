import { useEarthquakeStore } from '../store/useEarthquakeStore';

export default function FilterPanel() {
  const filters = useEarthquakeStore((s) => s.filters);
  const setFilters = useEarthquakeStore((s) => s.setFilters);

  return (
    <div className="p-4 flex gap-4 items-center bg-white shadow-md rounded-xl">
      <input
        type="text"
        placeholder="Search by place"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
        className="border px-3 py-1 rounded w-64"
      />
    </div>
  );
}
