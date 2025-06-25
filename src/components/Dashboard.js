import React, { useState, useEffect } from 'react';
import MarkerForm from './MarkerForm';
import SensorInput from './SensorInput';
import './Dashboard.css'; // Make sure this file exists

function Dashboard() {
  const [markers, setMarkers] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [svgContent, setSvgContent] = useState(null);

  const handleSvgClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSelectedPosition({ x, y });
  };

  const addMarker = (marker) => {
    setMarkers([...markers, marker]);
    setSelectedPosition(null);
  };

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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.includes('svg')) {
      alert('Please upload a valid SVG file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setSvgContent(event.target.result);
    };
    reader.readAsText(file);
  };

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
      <h3>Upload SVG Panel</h3>
      <input type="file" accept=".svg" onChange={handleFileUpload} />

      {svgContent && (
        <div className="svg-container" onClick={handleSvgClick}>
          <div
            className="inline-svg"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
          {markers.map((m, i) => (
            <div
              key={i}
              className={`marker ${m.status}`}
              style={{ left: m.x, top: m.y }}
              title={`Sensor Index: ${m.sensor}, Floor: ${m.floor}, Room: ${m.room}, Status: ${m.status}`}
            ></div>
          ))}
        </div>
      )}

      {selectedPosition && (
        <MarkerForm position={selectedPosition} onSubmit={addMarker} />
      )}
      <SensorInput onSensorData={updateSensorStatuses} />
    </div>
  );
}

export default Dashboard;
