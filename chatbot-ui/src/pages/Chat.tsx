import { GoogleGenerativeAI } from '@google/generative-ai';
import React, { useState } from 'react';

interface ChatProps {
  apiKey: string;
}

const Chat: React.FC<ChatProps> = ({ apiKey }) => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<
    { role: string; content: string }[]
  >([{ role: 'ai', content: 'What can I help with?' }]);
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
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', backgroundColor: '#f9f9f9' }}>
        {conversation.map((msg, index) => (
          <div key={index} style={{ marginBottom: '10px', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <div style={{ display: 'inline-block', padding: '10px', borderRadius: '5px', backgroundColor: msg.role === 'user' ? '#007BFF' : '#e0e0e0', color: msg.role === 'user' ? '#fff' : '#000' }}>
              <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
            </div>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ padding: '10px', fontSize: '1rem', width: '80%', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
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