import { GoogleGenerativeAI } from '@google/generative-ai';
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
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const result = await model.generateContent(message);

      // Add the AI's response to the conversation
      setConversation((prev) => [
        ...prev,
        { role: 'ai', content: result.response.text() },
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