import { GoogleGenerativeAI } from '@google/generative-ai';
import React, { useEffect, useRef, useState } from 'react';
import './Chat.css';

interface ChatProps {
  apiKey: string;
}

const Chat: React.FC<ChatProps> = ({ apiKey }) => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<
    { role: string; content: string }[]
  >([{ role: 'ai', content: 'What can I help with?' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Add the user's message to the conversation
    setConversation((prev) => [...prev, { role: 'user', content: message }]);
    setMessage('');
    setLoading(true);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      // Send only the latest message to the API
      const result = await model.generateContent(message);

      // Add the AI's response to the conversation
      setConversation((prev) => [
        ...prev,
        { role: 'ai', content: result.response.text() },
      ]);
    } catch (error) {
      console.error('Error communicating with the API:', error);
      setError('Failed to get a response from the AI. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  return (
    <div className="chat-container">
      <div
        ref={chatContainerRef}
        className="chat-box"
        aria-live="polite"
      >
        {conversation.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.role}`}>
            <div className="message-content">
              <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
            </div>
          </div>
        ))}
        {loading && <div className="loading-indicator">AI is typing...</div>}
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="chat-input"
          placeholder="Type your message..."
          disabled={loading}
          aria-label="Type your message"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="send-button"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default Chat;