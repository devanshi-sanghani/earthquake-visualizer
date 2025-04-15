import { useEffect } from 'react';
import { fetchEarthquakeData } from './utils/fetchEarthquakeData';
import { useEarthquakeStore } from './store/useEarthquakeStore';
import ChartPanel from './components/ChartPanel';
import TablePanel from './components/TablePanel';
import FilterPanel from './components/FilterPanel';
import './index.css'; // ensure Tailwind is loaded

function App() {
  const setData = useEarthquakeStore((s) => s.setData);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchEarthquakeData();
      setData(data);
    };
    loadData();
  }, []);

  return (
    <main className="h-screen w-screen bg-gray-100 text-gray-800">
      <FilterPanel />
      <div className="grid grid-cols-2 h-full">
        <ChartPanel />
        <TablePanel />
      </div>
    </main>
  );
}

export default App;
