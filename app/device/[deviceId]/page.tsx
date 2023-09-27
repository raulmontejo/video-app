import DeviceConstraints from '@/app/components/DeviceConstraints';

export default function DevicePage({ params }: { params: { deviceId: string } }) {
  const { deviceId } = params;

  // Make sure we have a deviceId before rendering the DeviceConstraints component
  if (!deviceId) {
    return <div>Loading...</div>;
  }

  return (
  <main className="m-4">
    <h1 className="mb-4 text-4xl">Device Info</h1>
    <DeviceConstraints deviceId={deviceId as string} />
  </main>
  );
}
