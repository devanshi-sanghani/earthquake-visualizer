import { create } from 'zustand';
import { EarthquakeRecord } from '../utils/fetchEarthquakeData';

type Store = {
  data: EarthquakeRecord[];
  filtered: EarthquakeRecord[];
  filters: {
    search: string;
    minMag: number;
    maxMag: number;
  };
  highlightedId: string | null;
  setData: (d: EarthquakeRecord[]) => void;
  setHighlightedId: (id: string | null) => void;
  setFilters: (f: Partial<Store['filters']>) => void;
};

export const useEarthquakeStore = create<Store>((set, get) => ({
  data: [],
  filtered: [],
  filters: {
    search: '',
    minMag: 0,
    maxMag: 10,
  },
  highlightedId: null,

  setData: (data) => {
    set({ data });
    const { filters } = get();
    set({ filtered: applyFilters(data, filters) });
  },

  setFilters: (newFilters) => {
    const filters = { ...get().filters, ...newFilters };
    const data = get().data;
    set({
      filters,
      filtered: applyFilters(data, filters),
    });
  },

  setHighlightedId: (id) => set({ highlightedId: id }),
}));

function applyFilters(data: EarthquakeRecord[], filters: Store['filters']) {
  return data.filter((d) => {
    const matchPlace = d.place.toLowerCase().includes(filters.search.toLowerCase());
    const matchMag = d.mag >= filters.minMag && d.mag <= filters.maxMag;
    return matchPlace && matchMag;
  });
}
