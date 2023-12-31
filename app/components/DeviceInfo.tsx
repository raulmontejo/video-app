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

export default function DeviceInfo({ deviceId }: Props) {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [supportedConstraints, setSupportedConstraints] = useState<MediaTrackSupportedConstraints | null>(null);
  const [deviceCapabilities, setDeviceCapabilities] = useState<MediaTrackCapabilities | null>(null);

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
        // Get available constraints for the device
        const constraints = navigator.mediaDevices.getSupportedConstraints();
        setSupportedConstraints(constraints);
        // Get capabilities of the device
        const capabilities = videoTrack.getCapabilities();
        setDeviceCapabilities(capabilities);
      })
      .catch(error => {
        console.error('Error getting media stream:', error);
      });
  }, [deviceId]);

  if (!deviceInfo || !supportedConstraints || !deviceCapabilities) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <dl className="p-4 rounded bg-slate-200 text-slate-800 sm:text-xl">
        <div className="sm:flex py-1">
          <dt className="w-80"><strong>Label:</strong></dt>
          <dd>{deviceInfo.label}</dd>
        </div>
        <div className="sm:flex py-1">
          <dt className="w-80"><strong>ID:</strong></dt>
          <dd>{deviceInfo.id}</dd>
        </div>
      </dl>
      <article className="my-4 p-4 rounded bg-slate-200 text-slate-800">
        <h2 className="my-4 text-2xl font-bold">MediaTrackSettings</h2>
        <hr className="border border-slate-800 my-4" />
        <dl className="sm:text-xl">
          {Object.entries(deviceInfo.settings).map(([key, value]) => (
            <div key={key} className="sm:flex py-1 font-mono">
              <dt className="w-80 mb-2"><strong className="mr-2">{key}:</strong></dt>
              <dd className="break-all">{JSON.stringify(value)}</dd>
            </div>
          ))}
        </dl>
      </article>
      <article className="my-4 p-4 rounded bg-slate-200 text-slate-800">
        <h2 className="my-4 text-2xl font-bold">Device Capabilities</h2>
        <hr className="border border-slate-800 my-4" />
        <dl className="sm:text-xl">
          {Object.entries(deviceCapabilities).map(([key, value]) => (
            <div key={key} className="sm:flex py-1 font-mono">
              <dt className="w-80 mb-2"><strong className="mr-2">{key}:</strong></dt>
              <dd className="break-all">{JSON.stringify(value)}</dd>
            </div>
          ))}
        </dl>
      </article>
      <article className="my-4 p-4 rounded bg-slate-200 text-slate-800">
        <h2 className="my-4 text-2xl font-bold">Browser Supported Constraints</h2>
        <hr className="border border-slate-800 my-4" />
        <ul className="sm:columns-2 sm:text-xl">
          {Object.keys(supportedConstraints).map((key) => (
            <li key={key} className="sm:flex py-1">
              <span className="font-mono">{key}</span>
            </li>
          ))}
        </ul>
      </article>
    </React.Fragment>
  );
}

