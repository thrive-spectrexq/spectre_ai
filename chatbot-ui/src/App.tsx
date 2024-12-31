import { useState } from 'react';
import Chat from './pages/Chat';
import Home from './pages/Home';

function App() {
  const [googleGeminiKey, setGoogleGeminiKey] = useState('');

  return (
    <div>
      {googleGeminiKey ? (
        <Chat apiKey={googleGeminiKey} />
      ) : (
        <Home setApiKey={setGoogleGeminiKey} />
      )}
    </div>
  );
}

export default App;
