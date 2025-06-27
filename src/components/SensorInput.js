import React, { useEffect, useState } from 'react';

function SensorInput({ onSensorData }) {
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const res = await fetch('http://192.168.1.77:5000/messages');
        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('No messages found');
        }

        const latest = data[0];
        let parsedMessage;
        try {
          parsedMessage = JSON.parse(latest.message);
        } catch (err) {
          throw new Error('Invalid JSON in message: ' + err.message);
        }

        const sensorArray = parsedMessage?.DT?.D;

        if (!Array.isArray(sensorArray) || sensorArray.length !== 8) {
          throw new Error('DT.D must be an array of 8 values');
        }

        onSensorData(sensorArray);
        setLastUpdated(new Date().toLocaleTimeString());
        setError('');
      } catch (err) {
        console.error(err);
        setError('Fetch error: ' + err.message);
      }
    };

    const interval = setInterval(fetchSensorData, 5000);
    return () => clearInterval(interval);
  }, [onSensorData]);

  const handleManualFetch = async () => {
    try {
      //const res = await fetch('http://192.168.1.77:5000/messages');
      const res = await fetch('http://192.168.72.145:5000/messages');
      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No messages found');
      }

      const latest = data[0];
      let parsedMessage;
      try {
        parsedMessage = JSON.parse(latest.message);
      } catch (err) {
        throw new Error('Invalid JSON in message: ' + err.message);
      }

      const sensorArray = parsedMessage?.DT?.D;

      if (!Array.isArray(sensorArray) || sensorArray.length !== 8) {
        throw new Error('DT.D must be an array of 8 values');
      }

      onSensorData(sensorArray);
      setLastUpdated(new Date().toLocaleTimeString());
      setError('');
    } catch (err) {
      console.error(err);
      setError('Fetch error: ' + err.message);
    }
  };

  return (
    <div className="sensor-input-form">
      <h3>Sensor Status (from DB/API)</h3>
      <button onClick={handleManualFetch}>Fetch Latest</button>
      {lastUpdated && <p>✅ Last updated: {lastUpdated}</p>}
      {error && <p style={{ color: 'red' }}>⚠️ {error}</p>}
    </div>
  );
}

export default SensorInput;