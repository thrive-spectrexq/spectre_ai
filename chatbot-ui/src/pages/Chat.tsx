import React, { useState } from 'react';

interface ChatProps {
  apiKey: string;
}

const Chat: React.FC<ChatProps> = ({ apiKey }) => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<
    { role: string; content: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Add the user's message to the conversation
    setConversation((prev) => [...prev, { role: 'user', content: message }]);
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: message }],
          model: 'gemini-pro',
          apiKey: apiKey,
        }),
      });

      const data = await response.json();

      // Add the AI's response to the conversation
      setConversation((prev) => [
        ...prev,
        { role: 'ai', content: data.choices[0].message.content },
      ]);
    } catch (error) {
      console.error('Error communicating with the API:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '20px' }}>
        {conversation.map((msg, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ padding: '10px', fontSize: '1rem', width: '80%', marginRight: '10px' }}
      />
      <button
        onClick={sendMessage}
        disabled={loading}
        style={{ padding: '10px 20px', fontSize: '1rem', borderRadius: '5px', border: 'none', backgroundColor: '#007BFF', color: '#fff', cursor: 'pointer' }}
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
};

export default Chat;