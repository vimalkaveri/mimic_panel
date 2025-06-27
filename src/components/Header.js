import React from 'react';

function Header({ onSvgUpload }) {
  const handleSvgUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isSVG = file.name.toLowerCase().endsWith('.svg');
    if (!isSVG) {
      alert('⚠️ Please upload a valid SVG file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const svgContent = event.target.result;
      if (onSvgUpload) {
        onSvgUpload(svgContent); // Send SVG content to parent (App or Dashboard)
      }
    };
    reader.readAsText(file);
  };

  return (
    <header className="header">
      <h1 className="header-title">🔥 Fire Alarm Mimic Panel</h1>

      <div className="svg-upload">
        <label htmlFor="svgInput" className="upload-label">
          📄 Upload SVG
        </label>
        <input
          id="svgInput"
          type="file"
          accept=".svg"
          onChange={handleSvgUpload}
        />
      </div>
    </header>
  );
}

export default Header;
