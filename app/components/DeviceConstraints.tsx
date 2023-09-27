"use client"

import React, { useEffect, useState } from 'react';

interface Props {
  deviceId: string; // or number, depending on what type your deviceId is
}

interface DeviceInfo {
  label: string;
  id: string;
  settings: MediaTrackSettings;
}

export default function DeviceConstraints({ deviceId }: Props) {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);

  useEffect(() => {
    // Request a media stream from the device
    navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: deviceId } } })
      .then(stream => {
        // Get the video track from the stream
        const videoTrack = stream.getVideoTracks()[0];
        // Get the settings of the video track
        const trackSettings = videoTrack.getSettings();
        // Update the state with the device info
        setDeviceInfo({
          label: videoTrack.label,
          id: videoTrack.id,
          settings: trackSettings
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
    <React.Fragment>
      <dl className="p-4 rounded bg-slate-200 text-slate-800 text-xl">
        <div className="flex py-1">
          <dt className="w-40"><strong>Label:</strong></dt>
          <dd>{deviceInfo.label}</dd>
        </div>
        <div className="flex py-1">
          <dt className="w-40"><strong>ID:</strong></dt>
          <dd>{deviceInfo.id}</dd>
        </div>
      </dl>
      <article className="my-4 p-4 rounded bg-slate-200 text-slate-800">
        <h2 className="my-4 text-2xl font-bold">MediaTrackSettings</h2>
        <hr className="border border-slate-800 my-4" />
        <dl className="text-xl">
          {Object.entries(deviceInfo.settings).map(([key, value]) => (
            <div key={key} className="flex py-1">
              <dt className="w-40 mb-2"><strong className="mr-2">{key}:</strong></dt>
              <dd><span>{JSON.stringify(value)}</span></dd>
            </div>
          ))}
        </dl>
      </article>
    </React.Fragment>
  );
}
