import React, { useState, useEffect } from 'react';
import MarkerForm from './MarkerForm';
import SensorInput from './SensorInput';
import './Dashboard.css';

function Dashboard({ svgContent }) {
  const [markers, setMarkers] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);

  // Handle click on SVG to place a marker
  const handleSvgClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSelectedPosition({ x, y });
  };

  // Add new marker
  const addMarker = (marker) => {
    setMarkers((prev) => [...prev, marker]);
    setSelectedPosition(null);
  };

  // Update marker status using sensor data
const updateSensorStatuses = (sensorArray) => {
  setMarkers((prevMarkers) =>
    prevMarkers.map((marker) => {
      const index = parseInt(marker.sensor, 10);
      const state = sensorArray[index];
      const newStatus = state === 1 ? 'fire' : 'normal';
      return { ...marker, status: newStatus };
    })
  );
};


  // Update fill color of SVG zones
  useEffect(() => {
    markers.forEach((marker) => {
      const zoneEl = document.getElementById(`zone-${marker.sensor}`);
      if (zoneEl) {
        zoneEl.style.fill = marker.status === 'fire' ? 'red' : 'green';
      }
    });
  }, [markers]);

  return (
    <div className="dashboard">
      {svgContent ? (
        <div className="svg-container" onClick={handleSvgClick}>
          <div
            className="inline-svg"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
          {markers.map((marker, index) => (
            <div
              key={index}
              className={`marker ${marker.status}`}
              style={{ left: marker.x, top: marker.y }}
              title={`Sensor: ${marker.sensor}, Floor: ${marker.floor}, Room: ${marker.room}, Status: ${marker.status}`}
            ></div>
          ))}
        </div>
      ) : (
        <p style={{ marginTop: '2rem' }}>
          🛈 Please upload an SVG file from the top-right corner.
        </p>
      )}

      {selectedPosition && (
        <MarkerForm position={selectedPosition} onSubmit={addMarker} />
      )}

      <SensorInput onSensorData={updateSensorStatuses} />
    </div>
  );
}

export default Dashboard;
