import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Chat from './pages/Chat';
import Home from './pages/Home';

function App() {
  const [googleGeminiKey, setGoogleGeminiKey] = useState('');

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar googleGeminiKey={googleGeminiKey} />
        <div style={{ flex: 1, paddingBottom: '2rem' }}>
          <Routes>
            <Route path="/" element={<Home setApiKey={setGoogleGeminiKey} />} />
            <Route path="/chat" element={<Chat apiKey={googleGeminiKey} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;