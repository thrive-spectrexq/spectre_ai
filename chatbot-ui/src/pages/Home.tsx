import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface HomeProps {
  setApiKey: (key: string) => void;
}

const Home: React.FC<HomeProps> = ({ setApiKey }) => {
  const [key, setKey] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (key.trim()) {
      setApiKey(key);
      navigate('/chat'); // Redirect to chat page
    } else {
      alert('Please enter a valid API key.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem', color: '#333' }}>Spectre AI</h1>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem', color: '#555' }}>Enter Your Google Gemini API Key</h2>
      <input
        type="password"
        onChange={handleChange}
        value={key}
        style={{ padding: '10px', fontSize: '1rem', marginBottom: '1rem', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <button
        onClick={handleSubmit}
        style={{ padding: '10px 20px', fontSize: '1rem', borderRadius: '5px', border: 'none', backgroundColor: '#007BFF', color: '#fff', cursor: 'pointer' }}
      >
        Submit
      </button>
      <ToastContainer />
    </div>
  );
};

export default Home;