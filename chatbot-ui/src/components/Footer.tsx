import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ padding: '1rem', backgroundColor: '#333', color: '#fff', textAlign: 'center', width: '100%' }}>
      <div style={{ marginBottom: '0.5rem' }}>
        <a href="/privacy-policy" style={{ color: '#fff', textDecoration: 'none', margin: '0 0.5rem' }}>
          Privacy Policy
        </a>
        <a href="/terms-of-service" style={{ color: '#fff', textDecoration: 'none', margin: '0 0.5rem' }}>
          Terms of Service
        </a>
      </div>
      <p>&copy; {currentYear} Spectre AI. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;