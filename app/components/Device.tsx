import React from 'react';

interface DeviceProps {
  device: {
    label: string;
    deviceId: string;
  };
}

export const Device = ({ device }: DeviceProps) => {
  return (
    <article>
      <h2 className="device-label text-xl">{device.label}</h2>
      <p>Device ID: {device.deviceId}</p>
    </article>
  );
}
