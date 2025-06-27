import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import './styles.css';

function App() {
  const [svgContent, setSvgContent] = useState(null);

  const handleSvgUpload = (svgText) => {
    setSvgContent(svgText);
  };

  return (
    <div className="app">
      <Header onSvgUpload={handleSvgUpload} />
      <main>
        <Dashboard svgContent={svgContent} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
