import React, { useState } from 'react';
import '../App.css'; // Make sure to create an appropriate CSS file for styling
import { useNavigate } from 'react-router-dom';

function App() {
  const [language, setLanguage] = useState('English');
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        {/* Language Selector */}
        <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ position: 'absolute', top: 20, right: 20, padding: 20, }}>
          <option value="English">English</option>
          <option value="Korean">Korean</option>
          <option value="Vietnamese">Vietnamese</option>
        </select>

        {/* Icon Placeholder */}
        <div style={{ marginTop: '20vh' }}>
          <div style={{
            width: 100,
            height: 100,
            backgroundColor: '#ddd', // Placeholder for the icon
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            marginLeft: '60px'
          }}>
            Icon
          </div>

          {/* Welcome Text and Start Button */}
          <div style={{ marginTop: 20 }}>
            <button onClick={() => navigate('/filter')} style={{ backgroundColor: 'pink', color: 'white', padding: '30px 50px', border: 'none', borderRadius: 5, fontSize: 30, }}>
              Let's Start
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
