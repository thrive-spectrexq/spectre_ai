import React, { useState } from 'react';

interface HomeProps {
  setApiKey: (key: string) => void;
}

const Home: React.FC<HomeProps> = ({ setApiKey }) => {
  const [key, setKey] = useState('');

  const handleSubmit = () => {
    if (key.trim()) {
      setApiKey(key);
    } else {
      alert('Please enter a valid API key.');
    }
  };

  return (
    <div>
      <h1>Enter Your Google Gemini API Key</h1>
      <input
        type="password"
        placeholder="Google Gemini API Key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Home;
