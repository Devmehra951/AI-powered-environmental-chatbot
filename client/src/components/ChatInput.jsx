import { useState } from 'react';

const ChatInput = ({ onSend, loading, topic, setTopic }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() || loading) return;
    onSend(message.trim());
    setMessage('');
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <select value={topic} onChange={(e) => setTopic(e.target.value)}>
        {['All', 'Climate', 'Wildlife', 'Pollution', 'Sustainability', 'General'].map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Ask something about environment..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" disabled={loading}>{loading ? 'Thinking...' : 'Send'}</button>
    </form>
  );
};

export default ChatInput;
