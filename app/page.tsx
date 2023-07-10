import MapBoxMap from "./_components/_maps/mapbox";
import RechartsLineChart from "./_components/_charts/recharts";

export default async function Home(): JSX.Element {
  const mapboxToken = process.env.MAPBOX_PUBLIC_TOKEN;

  const chartData = [
    { x: "9/1", y: 10 },
    { x: "10/1", y: 40 },
    { x: "11/1", y: 30 },
    { x: "12/1", y: 20 },
    { x: "1/2", y: 90 },
    { x: "2/2", y: 30 },
    { x: "3/2", y: 60 },
    { x: "4/2", y: 40 },
    { x: "5/2", y: 40 },
    { x: "6/2", y: 10 },
    { x: "7/2", y: 30 },
    { x: "8/2", y: 20 },
  ];

  return (
    <main>
      <MapBoxMap mapboxToken={mapboxToken} />
      <RechartsLineChart data={chartData} />
    </main>
  );
}
