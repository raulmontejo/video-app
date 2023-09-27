"use client"

import React, { useEffect, useState } from 'react';

interface Props {
  deviceId: string; // or number, depending on what type your deviceId is
}

interface DeviceInfo {
  label: string;
  id: string;
  constraints: MediaTrackSettings;
}

export default function DeviceConstraints({ deviceId }: Props) {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);

  useEffect(() => {
    // Request a media stream from the device
    navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: deviceId } } })
      .then(stream => {
        // Get the video track from the stream
        const videoTrack = stream.getVideoTracks()[0];
        // Get the constraints of the video track
        const trackConstraints = videoTrack.getSettings();
        // Update the state with the device info
        setDeviceInfo({
          label: videoTrack.label,
          id: videoTrack.id,
          constraints: trackConstraints
        });
      })
      .catch(error => {
        console.error('Error getting media stream:', error);
      });
  }, [deviceId]);

  if (!deviceInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl">Device Info:</h1>
      <p className="text-xl"><strong>Label:</strong> {deviceInfo.label}</p>
      <p className="text-xl"><strong>ID:</strong> {deviceInfo.id}</p>
      <hr className="my-4" />
      <h2 className="my-4 text-2xl">Device Constraints:</h2>
      <ul className='text-xl'>
        {Object.entries(deviceInfo.constraints).map(([key, value]) => (
          <li key={key} className="mb-2">
            <strong className="mr-2">{key}:</strong>
            <span>{JSON.stringify(value)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
