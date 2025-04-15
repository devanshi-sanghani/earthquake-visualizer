import { useEarthquakeStore } from '../store/useEarthquakeStore';
import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

export default function TablePanel() {
  const data = useEarthquakeStore((s) => s.filtered);
  const highlightedId = useEarthquakeStore((s) => s.highlightedId);
  const setHighlightedId = useEarthquakeStore((s) => s.setHighlightedId);

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 10,
  });

  return (
    <div className="h-[500px] border-l border-gray-200 bg-white">
      <div ref={parentRef} className="overflow-auto h-full font-mono text-sm">
        <table className="min-w-full table-auto border-separate border-spacing-y-1">
          <thead className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-gray-700 font-semibold">Time</th>
              <th className="px-4 py-2 text-left text-gray-700 font-semibold">Place</th>
              <th className="px-4 py-2 text-left text-gray-700 font-semibold">Mag</th>
              <th className="px-4 py-2 text-left text-gray-700 font-semibold">Depth</th>
            </tr>
          </thead>
          <tbody
            style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative' }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const record = data[virtualRow.index];
              const isHighlighted = record.id === highlightedId;

              return (
                <tr
                  key={record.id}
                  onMouseEnter={() => setHighlightedId(record.id)}
                  onMouseLeave={() => setHighlightedId(null)}
                  onClick={() => setHighlightedId(record.id)}
                  className={`absolute left-0 right-0 top-0 cursor-pointer transition-all rounded-md ${
                    isHighlighted ? 'bg-yellow-100 shadow-sm' : virtualRow.index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-yellow-50`}
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                    height: `${virtualRow.size}px`,
                  }}
                >
                    <td className="px-4 py-2 whitespace-nowrap text-gray-800">
                        {new Date(record.time).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: true,
                        })}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-gray-700">{record.place}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-right text-blue-700 font-medium">{record.mag.toFixed(2)}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-right text-purple-700">{record.depth.toFixed(2)}</td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
