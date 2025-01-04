import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{ padding: '1rem', backgroundColor: '#333', color: '#fff', textAlign: 'center', position: 'fixed', width: '100%', bottom: 0 }}>
      <div style={{ marginBottom: '0.5rem' }}>
        <a href="/privacy-policy" style={{ color: '#fff', textDecoration: 'none', margin: '0 0.5rem' }}>
          Privacy Policy
        </a>
        <a href="/terms-of-service" style={{ color: '#fff', textDecoration: 'none', margin: '0 0.5rem' }}>
          Terms of Service
        </a>
      </div>
      <p>&copy; 2025 Spectre AI. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;