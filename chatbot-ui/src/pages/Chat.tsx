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
      // Update the fetch URL to use the proxy '/api/v1/chat' endpoint
      const response = await fetch('/api/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: message }],
          model: 'gemini-pro',
        }),
      });      

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      // Append the AI's response to the conversation
      const botReply = data.reply || data.choices?.[0]?.message?.content || 'No response received';
      setConversation((prev) => [...prev, { role: 'bot', content: botReply }]);
    } catch (error) {
      console.error('Error communicating with Google Gemini API:', error);
      setConversation((prev) => [
        ...prev,
        { role: 'bot', content: 'Oops! Something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <div style={{ marginBottom: '1rem', maxHeight: '400px', overflowY: 'auto' }}>
        {conversation.map((msg, index) => (
          <div key={index} className={msg.role === 'user' ? 'user-msg' : 'bot-msg'}>
            <strong>{msg.role === 'user' ? 'You: ' : 'Bot: '}</strong>
            {msg.content}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="Ask me anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
          style={{ marginRight: '10px', padding: '5px', width: '300px' }}
        />
        <button onClick={sendMessage} disabled={loading} style={{ padding: '5px 10px' }}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default Chat;
