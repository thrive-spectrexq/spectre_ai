import { useState } from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Chat from './pages/Chat';
import Home from './pages/Home';

function App() {
  const [googleGeminiKey, setGoogleGeminiKey] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        {googleGeminiKey ? (
          <Chat apiKey={googleGeminiKey} />
        ) : (
          <Home setApiKey={setGoogleGeminiKey} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;