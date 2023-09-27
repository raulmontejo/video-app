import DeviceConstraints from '@/app/components/DeviceConstraints';

export default function DevicePage({ params }: { params: { deviceId: string } }) {
  const { deviceId } = params;

  // Make sure we have a deviceId before rendering the DeviceConstraints component
  if (!deviceId) {
    return <div>Loading...</div>;
  }

  return <DeviceConstraints deviceId={deviceId as string} />;
}
