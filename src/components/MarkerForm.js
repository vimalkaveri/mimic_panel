import React, { useState } from 'react';

function MarkerForm({ position, onSubmit }) {
  const [floor, setFloor] = useState('');
  const [room, setRoom] = useState('');
  const [sensor, setSensor] = useState('');
  const [status, setStatus] = useState('normal');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sensor === '') return alert('Sensor Index (0-7) is required');
    onSubmit({
      floor,
      room,
      sensor,
      status,
      x: position.x,
      y: position.y,
    });
    setFloor('');
    setRoom('');
    setSensor('');
    setStatus('normal');
  };

  return (
    <form className="marker-form" onSubmit={handleSubmit}>
      <h3>Add Sensor Marker</h3>
      <label>Floor:
        <input value={floor} onChange={(e) => setFloor(e.target.value)} />
      </label>
      <label>Room:
        <input value={room} onChange={(e) => setRoom(e.target.value)} />
      </label>
      <label>Sensor Index (0–7):
        <input
          type="number"
          min="0"
          max="7"
          value={sensor}
          onChange={(e) => setSensor(e.target.value)}
          required
        />
      </label>
      {/* 
      <label>Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="normal">Normal</option>
          <option value="fire">Fire</option>
        </select>
      </label>
      */}
      <button type="submit">Place Marker</button>
    </form>
  );
}

export default MarkerForm;
