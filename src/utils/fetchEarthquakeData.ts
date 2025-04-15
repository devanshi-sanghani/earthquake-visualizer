import Papa from 'papaparse';

export interface EarthquakeRecord {
  id: string;
  time: string;
  place: string;
  mag: number;
  depth: number;
  latitude: number;
  longitude: number;
}

export const fetchEarthquakeData = async (): Promise<EarthquakeRecord[]> => {
  const res = await fetch(
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv'
  );
  const text = await res.text();

  const { data } = Papa.parse<any>(text, {
    header: true,
    skipEmptyLines: true,
  });

  return data
    .map((row: any, idx: number) => {
      const mag = parseFloat(row.mag);
      const depth = parseFloat(row.depth);
      const latitude = parseFloat(row.latitude);
      const longitude = parseFloat(row.longitude);
      const place = row.place || 'Unknown';

      // ✅ Format date as string (React can't render a Date object directly)
      const time = row.time ? new Date(row.time).toLocaleString() : 'Unknown';

      if (isNaN(mag) || isNaN(depth) || isNaN(latitude) || isNaN(longitude)) return null;

      return {
        id: row.id || `row-${idx}`,
        time,
        place,
        mag,
        depth,
        latitude,
        longitude,
      };
    })
    .filter(Boolean)
    .slice(0, 1000); // ✅ Limit to top 1000 records
};
