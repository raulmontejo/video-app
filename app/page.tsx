import { DeviceList } from './components/DeviceList';

export default function Home() {
  return (
    <main className="m-4">
      <h1 className="mb-4 text-2xl">Camera Devices:</h1>
      <DeviceList />
    </main>
  );
}
