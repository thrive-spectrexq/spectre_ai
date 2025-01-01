import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  googleGeminiKey: string;
}

const Navbar: React.FC<NavbarProps> = ({ googleGeminiKey }) => {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#007BFF', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 style={{ margin: 0 }}>Spectre AI</h1>
      <div>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', marginRight: '1rem' }}>Home</Link>
        {googleGeminiKey && (
          <Link to="/chat" style={{ color: '#fff', textDecoration: 'none' }}>Chat</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;