import {
    ResponsiveContainer,
    ScatterChart,
    XAxis,
    YAxis,
    Scatter,
    Tooltip,
  } from 'recharts';
  import { useEarthquakeStore } from '../store/useEarthquakeStore';
  import { useMemo } from 'react';
  
  export default function ChartPanel() {
    const data = useEarthquakeStore((s) => s.filtered);
    const highlightedId = useEarthquakeStore((s) => s.highlightedId);
    const setHighlightedId = useEarthquakeStore((s) => s.setHighlightedId);
  
    // ✅ Memoize points to avoid recomputing on every render
    const points = useMemo(() => {
      return data.map((record) => ({
        ...record,
      }));
    }, [data]);
  
    return (
      <div className="p-4">
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart>
            <XAxis dataKey="mag" name="Magnitude" />
            <YAxis dataKey="depth" name="Depth" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter
              data={points}
              fill="#8884d8"
              onMouseEnter={(e) => {
                if (e && e.id) setHighlightedId(e.id);
              }}
              onMouseLeave={() => setHighlightedId(null)}
              shape={(props) => {
                const { cx, cy, payload } = props;
                const isHighlighted = payload.id === highlightedId;
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHighlighted ? 8 : 4}
                    fill={isHighlighted ? 'red' : '#8884d8'}
                    stroke={isHighlighted ? 'black' : 'none'}
                    strokeWidth={isHighlighted ? 2 : 0}
                  />
                );
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    );
  }
  