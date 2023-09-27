"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { Device } from './Device';

export const DeviceList = () => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        stream.getTracks().forEach(track => track.stop());
        navigator.mediaDevices.enumerateDevices()
          .then(devices => {
            setDevices(devices.filter(device => device.kind === 'videoinput'));
          });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col">
      {devices.map((device) => (
        <Link key={device.deviceId} href={`/device/${device.deviceId}`} className="p-2 border border-gray-300 rounded">
          <Device device={device} />
        </Link>
      ))}
    </div>
  );
}
