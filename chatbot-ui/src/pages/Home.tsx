import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';

interface HomeProps {
  setApiKey: (key: string) => void;
}

const Home: React.FC<HomeProps> = ({ setApiKey }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (key.trim()) {
      setApiKey(key);
      toast.success('API key set successfully!');
      navigate('/chat'); // Redirect to chat page
    } else {
      setError('Please enter a valid API key.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
    setError(null); // Clear error when user starts typing
  };

  return (
    <div className="home-container">
      <div className="logo-container">
        <img src="/logo.png" alt="Spectre AI Logo" className="logo" />
      </div>
      <h1 className="title">Spectre AI</h1>
      <h2 className="subtitle">Enter Your Google Gemini API Key</h2>
      <input
        type="password"
        onChange={handleChange}
        value={key}
        className="input"
        placeholder="API Key"
      />
      {error && <div className="error">{error}</div>}
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
      <ToastContainer />
    </div>
  );
};

export default Home;